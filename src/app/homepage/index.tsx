'use client'

import React, { useEffect, useState } from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import {
  ControlPanel,
  DashboardRow,
  NotificationPaneContainer,
  NotificationsContainer,
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

// This is the homepage component,
export default function Homepage() {
  const [notifs, setNotifs] = useState<any>(null)
  const [userPlants, setUserPlants] = useState<any>(null)

  // This will work for now, but the issue is we have no way of knowing
  // if this data is accurate past the second its fetched
  // need a version id or something we can compare to the server every so often to verify its up-to-date
  useEffect(() => {
    console.log('Fetching user details')
    getUsersData()
  }, [])

  useEffect(() => {
    console.log(userPlants)
  }, [userPlants])

  async function getUsersData() {
    const user = await getUserData(db, auth, 'users')
    const plantData = await getUserData(db, auth, 'userPlants')
    console.log('Heres the plant data:', plantData)
    setNotifs(user?.notifications)
    setUserPlants(plantData)
  }

  // Fetches user data
  async function getNotifications(auth: Auth) {
    const userId = auth?.currentUser?.uid

    const docRef = doc(db, 'users', String(userId))
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setNotifs(docSnap.data().notifications)
      console.log('User Data:', docSnap.data())
    } else {
      console.log('No such document!')
    }
  }

  // Proof of concept for moisture
  async function setNewData(plantData: any) {
    console.log('data', plantData)
    let newPlantData = plantData

    // get user data
    const currentReadings = plantData.plants[0].moisture.readings.reading

    // delete the oldest datapoint and append a new datapoint
    let newReadings = currentReadings
    newReadings.shift()
    newReadings.push(Number((Math.random() * 0.5).toFixed(2)))

    newPlantData.plants[0].moisture.readings.reading = newReadings
    newPlantData.version = newPlantData.version + 1

    console.log(
      'new user data:',
      newPlantData.plants[0].moisture.readings.reading
    )
    console.log('What will be saved', newPlantData)
    // update firestore
    await setDataFirebase('userPlants', auth, db, newPlantData)
    await getUsersData()
  }
  return (
    <NormalPageLayout>
      <DashboardRow>
        {/* ControlPanels are rows to display panels, must add to one or less */}
        <ControlPanel>
          {/* Notifications */}
          <HalfPanel>
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
          </HalfPanel>
          {/* Pie graphs */}
          <HalfPanel invisible={true}>
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
          </HalfPanel>
        </ControlPanel>

        <ControlPanel>
          <QuarterPanel>
            1<button onClick={() => setNewData(userPlants)}>New Reading</button>
            <button onClick={() => getUsersData()}>Refresh</button>
          </QuarterPanel>
          <QuarterPanel>2</QuarterPanel>
          <HalfPanel>3</HalfPanel>
        </ControlPanel>

        <ControlPanel>
          <QuarterPanel>4</QuarterPanel>
          <QuarterPanel>5</QuarterPanel>
          <HalfPanelGraph plants={userPlants?.plants} />
        </ControlPanel>

        <ControlPanel>
          <QuarterPanel />
          <QuarterPanel />
          <HalfPanel />
        </ControlPanel>
      </DashboardRow>
    </NormalPageLayout>
  )
}
