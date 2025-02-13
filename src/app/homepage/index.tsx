'use client'

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
import theme from '../theme'
import HeroPanel from '@/components/panels/heroPanel'
import NotificationPanel from '@/components/panels/notificationPanel'

// This is the homepage component,
export default function Homepage() {
  const [notifs, setNotifs] = useState<any>(null)
  const [userPlants, setUserPlants] = useState<any>(null)
  const [favouritePlant, setFavouritePlant] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

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

  async function getUsersData() {
    const user = await getUserData(db, auth, 'users')
    const plantData = await getUserData(db, auth, 'userPlants')
    setNotifs(user?.notifications)
    setUserPlants(plantData)
    setUser(user)
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

  // Proof of concept for moisture
  async function setNewData(plantData: any) {
    let newPlantData = plantData

    // get user data
    const currentReadings = plantData.plants[0].vitals.moisture.readings.reading

    // delete the oldest datapoint and append a new datapoint
    let newReadings = currentReadings
    newReadings.shift()
    const missingOrNot = newReadings.push(
      Math.random() > 0.1 ? Number((Math.random() * 0.5).toFixed(2)) : '-'
    )

    newPlantData.plants[0].vitals.moisture.readings.reading = newReadings
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

  return (
    <NormalPageLayout>
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
              <h1>Welcome back, {user?.name}!</h1>
              <h2 style={{ color: theme.colours.textLight }}>
                Here's a quick overview of your plants
              </h2>
            </div>
          </HeroPanel>
          {/* Notifications */}
          <NotificationPanel>
            <NotificationPaneContainer>
              <h2>Notifications</h2>
              <NotificationsContainer>
                {notifs != null ? (
                  notifs.map((notif: any, index: number) => (
                    <Notif key={index} notif={notif} even={index % 2 === 0} />
                  ))
                ) : (
                  <LoadingSpinner />
                )}
              </NotificationsContainer>
              {/* <button onClick={() => getNotifications(auth)}>GetNotifs</button> */}
            </NotificationPaneContainer>
          </NotificationPanel>
          {/* Pie graphs */}
          {/* <HalfPanel invisible={true}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <div
                style={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'white',
                }}
              />
              <div
                style={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'white',
                }}
              />
              <div
                style={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'white',
                }}
              />
            </div>
          </HalfPanel> */}
        </ControlPanel>

        <ControlPanel>
          <HighThirdPanel>
            {favouritePlant && (
              <VitalsContainer>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '20px',
                    padding: '10px 5px',
                    // border: '2PX solid white',
                    // backgroundColor: theme.colours.notificationLight,
                    // backgroundColor: theme.colours.buttonBlue,
                    borderRadius: '15px',
                  }}
                >
                  <h1
                    style={{
                      // backgroundColor: theme.colours.buttonBlue,
                      // borderRadius: '15px',
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
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <div
                              style={{ display: 'flex', flexDirection: 'row' }}
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
                              {vital.readings.reading.at(-1) + ' ' + vital.unit}
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
          {userPlants && (
            <HalfPanelGraph
              plantNum={user?.favouritePlant}
              plants={userPlants?.plants}
            />
          )}
        </ControlPanel>

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
          <HalfPanel />
        </ControlPanel>
      </DashboardRow>
    </NormalPageLayout>
  )
}
