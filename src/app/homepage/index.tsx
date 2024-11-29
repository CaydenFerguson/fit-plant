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
import getUserData from '@/helpers/firebase'
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
    setNotifs(user?.notifications)
    setUserPlants(plantData?.plants)
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
          <QuarterPanel>1</QuarterPanel>
          <QuarterPanel>2</QuarterPanel>
          <HalfPanel>3</HalfPanel>
        </ControlPanel>

        <ControlPanel>
          <QuarterPanel>4</QuarterPanel>
          <QuarterPanel>5</QuarterPanel>
          <HalfPanelGraph plants={userPlants} />
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
