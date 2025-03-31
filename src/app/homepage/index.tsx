'use client'

import { useTheme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import {
  ControlPanel,
  DashboardRow,
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

// This is the homepage component,
export default function Homepage() {
  const [notifs, setNotifs] = useState<any>(null)
  const [userPlants, setUserPlants] = useState<any>(null)
  const [favouritePlant, setFavouritePlant] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const { isMobile } = useGlobalContext()

  const theme = useTheme()

  // This will work for now, but the issue is we have no way of knowing
  // if this data is accurate past the second its fetched
  // need a version id or something we can compare to the server every so often to verify its up-to-date
  useEffect(() => {
    console.log('Fetching user details')
    getUsersData()
  }, [])

  useEffect(() => {
    setFavouritePlant(userPlants?.plants[0])
  }, [userPlants])

  useEffect(() => {
    setFavouritePlant(userPlants?.plants[user?.favouritePlant])
  }, [user])

  useEffect(() => {
    console.log('Fav Plant:', favouritePlant)
  }, [favouritePlant])

  //
  // UNCOMMENT THE BELOW FOR LIVE UPDATES!!!! :)
  //

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setNewData(userPlants)
  //     console.log('Fetching')
  //   }, 5000)
  //   return () => clearInterval(interval) // Cleanup on unmount
  // }, [user])

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

        // //Choosing random values to mulitply the last result
        // const incDec = Math.random() <= 0.5 ? -1 : 1
        // const readingModifier = incDec * (Math.random() + 1)

        // // Check if there was a last result
        // // console.log(key, obj[key]);
        // console.log('check', plant.vitals[key].readings)
        // console.log('check', plant.vitals[key].readings.at(-1))
        // plant.vitals[key].readings.at(-1).data.push({
        //   value: [
        //     getLocalIsoString(),
        //     plant.vitals[key].readings.at(-1).data.length !== 0
        //       ? plant.vitals[key].readings.at(-1).data.at(-1).value[1] *
        //         readingModifier
        //       : readingModifier,
        //   ],
        // })
      }

      console.log('[x] new dates', newPlantData.plants[1].dates)

      //   // get user data
      //   const currentReadings = plant.vitals.moisture.readings.reading

      //   // delete the oldest datapoint and append a new datapoint
      //   let newReadings = currentReadings
      //   newReadings.shift()
      //   const missingOrNot = newReadings.push(
      //     Math.random() > 0.1 ? Number((Math.random() * 0.5).toFixed(2)) : null
      //   )

      //   newPlantData.plants[index].vitals.moisture.readings.reading = newReadings
    })
    console.log('[x] new data', newPlantData.plants[1].vitals)
    newPlantData.version = newPlantData.version + 1

    // update firestore
    await setDataFirebase('userPlants', auth, db, newPlantData)
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

  return (
    <NormalPageLayout id="test">
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                  justifyContent: 'center',
                }}
              >
                <UserProfilePic>
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
            </div>
          </HeroPanel>
          {/* Notifications */}
          <NotificationPanel>
            <NotificationPaneContainer>
              <h2>Notifications</h2>
              <NotificationsContainer>
                {notifs != null ? (
                  notifs.map((notif: any, index: number) => (
                    <Notif
                      isMobile={isMobile}
                      key={index}
                      notif={notif}
                      even={index % 2 === 0}
                    />
                  ))
                ) : (
                  <LoadingSpinner />
                )}
              </NotificationsContainer>
              {/* <button onClick={() => getNotifications(auth)}>GetNotifs</button> */}
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
                plants={userPlants?.plants}
              />
            )}
          </ControlPanel>
        }

        {
          <ControlPanel>
            {/* <QuarterPanel> */}
            <div>
              <button onClick={() => setNewData(userPlants)}>
                New Reading
              </button>
              <button onClick={() => getUsersData()}>Refresh</button>
            </div>
            {/* </QuarterPanel> */}
            {false && (
              <QuarterPanel>
                <div>
                  {/* Favourite Plant Select */}
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h3 style={{ textWrap: 'nowrap', paddingRight: '15px' }}>
                      Favourite Plant:
                    </h3>
                    <select
                      style={{ width: 'auto' }}
                      onChange={(e) => {
                        setFavouritePlant(userPlants?.plants[e.target.value])
                      }}
                    >
                      {userPlants?.plants?.map((plant: any, index: number) => (
                        <option key={index} value={index}>
                          {plant.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </QuarterPanel>
            )}
          </ControlPanel>
        }
        {false && (
          <ControlPanel>
            <QuarterPanel>
              <div>
                <button onClick={() => setNewData(userPlants)}>
                  New Reading
                </button>
                <button onClick={() => getUsersData()}>Refresh</button>
              </div>
            </QuarterPanel>
            <QuarterPanel>
              {/* Favourite Plant Select */}
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h3 style={{ textWrap: 'nowrap', paddingRight: '15px' }}>
                  Favourite Plant:
                </h3>
                <select
                  style={{ width: 'auto' }}
                  onChange={(e) => {
                    setFavouritePlant(userPlants?.plants[e.target.value])
                  }}
                >
                  {userPlants?.plants?.map((plant: any, index: number) => (
                    <option key={index} value={index}>
                      {plant.name}
                    </option>
                  ))}
                </select>
              </div>
            </QuarterPanel>
          </ControlPanel>
        )}
      </DashboardRow>
    </NormalPageLayout>
  )
}
