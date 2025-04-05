'use client'

import { useTheme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import {
  ControlPanel,
  DashboardRow,
  DeleteAllNotifButton,
  NotificationPaneContainer,
  NotificationsContainer,
  VitalsContainer,
} from './style'
import QuarterPanel from '@/components/panels/quarterPanel'
import HalfPanel from '@/components/panels/halfPanel'
import Notif from '@/components/notification'

import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/config/firebase'
import { Auth } from 'firebase/auth'
import LoadingSpinner from '@/components/loadingSpinner'
import { getUserData, setDataFirebase } from '@/helpers/firebase'
import HalfPanelGraph from '@/components/panels/halfPanelGraph'
import HighThirdPanel from '@/components/panels/highQuarterPanel'
import HeroPanel from '@/components/panels/heroPanel'
import NotificationPanel from '@/components/panels/notificationPanel'
import { useGlobalContext } from '../context/GlobalContext'
import { UserProfilePic } from '@/components/NavHero/style'
import PopUpPane from '@/components/popUpPane'
import ExpandedNotification from '@/components/expandedNotification'
import { Divider, EmojiItem, EmojiSelectContainer } from '../settings/styles'

// This is the homepage component,
export default function Homepage() {
  const [notifs, setNotifs] = useState<any>(null)
  const [userPlants, setUserPlants] = useState<any>(null)
  const [favouritePlant, setFavouritePlant] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const { isMobile } = useGlobalContext()
  const [expandedNotif, setExpandedNotif] = useState<null | number>(null)
  const [showExpandedNotif, setShowExpandedNotif] = useState<boolean>(false)
  const [showProfilePicChange, setShowProfilePicChange] = useState(false)

  const theme = useTheme()

  useEffect(() => {
    console.log('Fetching user details')
    getUsersData()
  }, [])

  useEffect(() => {
    console.log('plant update detected!')
  }, [userPlants])

  // UNCOMMENT THE BELOW FOR LIVE UPDATES!!!! :)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Fetching')
      getUsersData()
    }, 5000)
    return () => clearInterval(interval) // Cleanup on unmount
  }, [user])

  async function getUsersData() {
    const user = await getUserData(db, auth, 'users')
    const plantData = await getUserData(db, auth, 'userPlants')
    setNotifs(user?.notifications)
    setUserPlants(plantData)
    setUser(user)
    console.log('User Object:', user)
    console.log('Plant Object', plantData)
  }

  // Fetches user data
  async function getNotifications(auth: Auth) {
    const userId = auth?.currentUser?.uid

    const docRef = doc(db, 'users', String(userId))
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setNotifs(docSnap.data().notifications)
    } else {
      console.log('No such document!')
    }
  }

  async function deleteNotif(index: number, all = false) {
    const userId = auth?.currentUser?.uid
    const docRef = doc(db, 'users', String(userId))
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      if (all === true) {
        data.notifications.splice(index, 1000)
      } else {
        data.notifications.splice(index, 1)
      }
      setNotifs(data.notifications)
      await setDataFirebase('users', auth, db, data)
    } else {
      console.log('No such document!')
    }
  }

  function getLocalIsoString() {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
  }

  // Returns just the date
  function justDate(iso: string) {
    let date = iso.split('T')[0] + 'T00:00:00'
    return date
  }

  // Checks if same day
  function isSameDate(iso1: string, iso2: string) {
    const date1 = iso1.split('T')[0]
    const date2 = iso2.split('T')[0]
    return date1 === date2
  }

  // Proof of concept for moisture
  async function setNewData(plantData: any) {
    let newPlantData = { ...plantData }

    // For each plant
    newPlantData.plants.forEach((plant: any, index: number) => {
      // FOr each plants vitals
      for (let key in plant.vitals) {
        let readings = plant.vitals[key].readings

        //Check if readings is empty, if so create the first reading and add date
        if (!plant.dates.includes(justDate(getLocalIsoString()))) {
          console.log('[x] Date didnt exist - adding')
          // Adding the date
          plant.dates.push(justDate(getLocalIsoString()))

          // Adding the corresponding data
          plant.vitals[key].readings.push({
            data: [
              {
                value: [getLocalIsoString(), Math.random()],
              },
            ],
          })
        } else {
          console.log('[x] found date - adding data')
          const index = plant.dates.indexOf(justDate(getLocalIsoString()))
          // Checking if there is an entry in this vital for this date
          if (plant.vitals[key].readings.length - 1 < index) {
            plant.vitals[key].readings.push({
              data: [
                {
                  value: [getLocalIsoString(), Math.random()],
                },
              ],
            })
          }
          // Otherwise add the data to the given date
          else {
            plant.vitals[key].readings[index].data.push({
              value: [getLocalIsoString(), Math.random()],
            })
          }
        }

        newPlantData.plants[index] = plant
      }

      console.log('[x] new dates', newPlantData.plants[1].dates)
    })
    console.log('[x] new data', newPlantData.plants[1].vitals)
    newPlantData.version = newPlantData.version + 1

    // update firestore
    await setDataFirebase('userPlants', auth, db, newPlantData)
    await getUsersData()
  }
  async function getNewData(plantData: any) {
    let newPlantData = { ...plantData }
    await getUsersData()
  }

  function getEmoji(title: string) {
    if (title === 'Moisture') {
      return '💧'
    } else if (title === 'Temperature') {
      return '🌡️'
    } else if (title === 'pH Level') {
      return '🧪'
    } else if (title === 'NPK') {
      return '🧑‍🌾'
    } else if (title === 'Electrical Conductivity') {
      return '⚡'
    } else {
      return ''
    }
  }

  function getProfileEmoji() {
    const people = [
      '🧒',
      '👦',
      '🧑',
      '👨',
      '👩‍🦱',
      '🧑‍🦱',
      '👨‍🦱',
      '👩‍🦰',
      '🧑‍🦰',
      '👨‍🦰',
      '👱‍♀️',
      '👱',
      '👱‍♂️',
      '👩‍🦳',
      '🧑‍🦳',
      '👨‍🦳',
      '👩‍🦲',
      '🧑‍🦲',
      '👨‍🦲',
      '🧔‍♀️',
      '🧔',
      '🧔‍♂️',
      '👵',
      '🧓',
      '👴',
      '👳‍♀️',
      '👳',
      '👳‍♂️',
      '🧕',
    ]
    return people[Math.floor(Math.random() * people.length)]
  }

  function setProfilePic(emoji: string) {
    let updatedUser = user
    updatedUser.profileEmoji = emoji
    updatedUser.version += 1
    setDataFirebase('users', auth, db, updatedUser)
    getUsersData()
  }
  const profileEmojis = [
    '🧒',
    '👦',
    '🧑',
    '👨',
    '👩‍🦱',
    '🧑‍🦱',
    '👨‍🦱',
    '👩‍🦰',
    '🧑‍🦰',
    '👨‍🦰',
    '👱‍♀️',
    '👱',
    '👱‍♂️',
    '👩‍🦳',
    '🧑‍🦳',
    '👨‍🦳',
    '👩‍🦲',
    '🧑‍🦲',
    '👨‍🦲',
    '🧔‍♀️',
    '🧔',
    '🧔‍♂️',
    '👵',
    '🧓',
    '👴',
    '👳‍♀️',
    '👳',
    '👳‍♂️',
    '🧕',
  ]

  return (
    <NormalPageLayout id="test">
      {showProfilePicChange ? (
        <PopUpPane
          setShowPopup={setShowProfilePicChange}
          showPop={showProfilePicChange}
          paneTitle="Upload Image"
          opacity={0.7}
          maxWidth={'60%'}
          maxHeight={'80%'}
        >
          <div>
            <EmojiSelectContainer>
              {profileEmojis.map((emoji) => {
                return (
                  <EmojiItem onClick={() => setProfilePic(emoji)}>
                    {emoji}
                  </EmojiItem>
                )
              })}
            </EmojiSelectContainer>
          </div>
        </PopUpPane>
      ) : null}
      <DashboardRow>
        {/* ControlPanels are rows to display panels, must add to one or less */}
        <ControlPanel>
          {/* Hero */}
          <HeroPanel>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              {user === null ? (
                <LoadingSpinner />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    justifyContent: 'center',
                  }}
                >
                  <UserProfilePic onClick={() => setShowProfilePicChange(true)}>
                    {user?.profileEmoji ? user.profileEmoji : '👤'}
                  </UserProfilePic>
                  {isMobile ? (
                    <h2 style={{ textAlign: 'center' }}>
                      Welcome back, {user?.firstName} 👋
                    </h2>
                  ) : (
                    <h1 style={{ textAlign: 'center' }}>
                      Welcome back, {user?.firstName} 👋
                    </h1>
                  )}
                  <p
                    style={{
                      fontSize: `${isMobile ? '17px' : '18px'}`,
                      color: theme.colours.textLight,
                    }}
                  >
                    Here's a quick overview of your plants
                  </p>
                </div>
              )}
            </div>
          </HeroPanel>
          {/* Notifications */}
          <NotificationPanel>
            {showExpandedNotif ? (
              <PopUpPane
                setShowPopup={setShowExpandedNotif}
                showPopup={showExpandedNotif}
                paneTitle={
                  expandedNotif !== null ? notifs[expandedNotif]?.name : ''
                }
              >
                <ExpandedNotification
                  expandedNotif={expandedNotif}
                  notifs={notifs}
                />
              </PopUpPane>
            ) : null}
            <NotificationPaneContainer>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2>Notifications</h2>
                <DeleteAllNotifButton onClick={() => deleteNotif(0, true)}>
                  Clear All
                </DeleteAllNotifButton>
              </div>
              <NotificationsContainer>
                {notifs != null ? (
                  notifs.map((notif: any, index: number) => (
                    <Notif
                      isMobile={isMobile}
                      key={index}
                      notif={notif}
                      index={index}
                      even={index % 2 === 0}
                      deleteNotif={deleteNotif}
                      onClick={() => {
                        setExpandedNotif(index)
                        setShowExpandedNotif(true)
                      }}
                    />
                  ))
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <LoadingSpinner margin={0} padding={'10'} />
                  </div>
                )}

                {notifs?.length === 0 && (
                  <div
                    style={{
                      display: 'flex',
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <p style={{ fontSize: '18px' }}>
                      No new notifications, yay! 😁
                    </p>
                  </div>
                )}
              </NotificationsContainer>
            </NotificationPaneContainer>
          </NotificationPanel>
        </ControlPanel>

        {
          <ControlPanel>
            {false && (
              <HighThirdPanel>
                {favouritePlant && (
                  <VitalsContainer>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '20px',
                        padding: '10px 5px',
                        borderRadius: '15px',
                      }}
                    >
                      <h1
                        style={{
                          color: theme.colours.textLight,
                          fontWeight: 'bold',
                        }}
                      >
                        {favouritePlant?.name}
                      </h1>
                    </div>
                    {/* Vitals */}
                    {favouritePlant && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-evenly',
                          height: '100%',
                        }}
                      >
                        {Object.values(favouritePlant?.vitals)?.map(
                          (vital: any, index: number) => (
                            <div
                              key={index}
                              style={{
                                margin: '15px',
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <div
                                style={{
                                  height: '50px',
                                  width: '50px',
                                  fontSize: '30px',
                                }}
                              >
                                {getEmoji(vital.title)}
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                  }}
                                >
                                  <h2 key={index}>{vital.title}:</h2>
                                  <p
                                    style={{
                                      fontSize: '20px',
                                      paddingLeft: '15px',
                                    }}
                                  >
                                    Good
                                  </p>
                                </div>
                                <p
                                  style={{
                                    fontSize: '20px',
                                  }}
                                >
                                  {vital.readings.reading.at(-1) +
                                    ' ' +
                                    vital.unit}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </VitalsContainer>
                )}
              </HighThirdPanel>
            )}
            {userPlants && (
              <HalfPanelGraph
                plantNum={user?.favouritePlant}
                plants={userPlants.plants}
              />
            )}
          </ControlPanel>
        }
      </DashboardRow>
    </NormalPageLayout>
  )
}
