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

import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/config/firebase'
import { Auth } from 'firebase/auth'
import LoadingSpinner from '@/components/loadingSpinner'

// This is the homepage component,
export default function Homepage() {
  const [notifs, setNotifs] = useState<any>(null)

  // This will work for now, but the issue is we have no way of knowing
  // if this data is accurate past the second its fetched
  // need a version id or something we can compare to the server every so often to verify its up-to-date
  useEffect(() => {
    console.log('Fetching user details')
    getNotifications(auth)
  }, [])

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

  // const plantData = {
  //   moisture: {
  //     unit: 'ppm',
  //     version: 0,
  //     readings: [
  //       { time: 0, reading: 0.43 },
  //       { time: 5, reading: 0.21 },
  //       { time: 10, reading: 0.37 },
  //       { time: 15, reading: 0.29 },
  //       { time: 20, reading: 0.11 },
  //       { time: 25, reading: 0.29 },
  //       { time: 30, reading: 0.1 },
  //       { time: 35, reading: 0.26 },
  //       { time: 40, reading: 0.08 },
  //       { time: 45, reading: 0.14 },
  //       { time: 50, reading: 0.17 },
  //       { time: 55, reading: 0.22 },
  //       { time: 60, reading: 0.39 },
  //       { time: 65, reading: 0.34 },
  //       { time: 70, reading: 0.37 },
  //       { time: 75, reading: 0.19 },
  //       { time: 80, reading: 0.36 },
  //       { time: 85, reading: 0.26 },
  //       { time: 90, reading: 0.15 },
  //       { time: 95, reading: 0.27 },
  //     ],
  //   },
  //   temperature: {
  //     unit: 'C',
  //     version: 0,
  //     readings: [
  //       { time: 0, reading: 27.37 },
  //       { time: 5, reading: 20.21 },
  //       { time: 10, reading: 20.79 },
  //       { time: 15, reading: 28.75 },
  //       { time: 20, reading: 23.19 },
  //       { time: 25, reading: 29.94 },
  //       { time: 30, reading: 29.79 },
  //       { time: 35, reading: 22.26 },
  //       { time: 40, reading: 25.53 },
  //       { time: 45, reading: 21.93 },
  //       { time: 50, reading: 22.5 },
  //       { time: 55, reading: 27.5 },
  //       { time: 60, reading: 29.58 },
  //       { time: 65, reading: 25.18 },
  //       { time: 70, reading: 27.97 },
  //       { time: 75, reading: 26.98 },
  //       { time: 80, reading: 28.68 },
  //       { time: 85, reading: 27.53 },
  //       { time: 90, reading: 22.31 },
  //       { time: 95, reading: 21.75 },
  //     ],
  //   },
  //   pH: {
  //     unit: '',
  //     version: 0,
  //     readings: [
  //       { time: 0, reading: 7.29 },
  //       { time: 5, reading: 7.34 },
  //       { time: 10, reading: 6.13 },
  //       { time: 15, reading: 6.38 },
  //       { time: 20, reading: 7.0 },
  //       { time: 25, reading: 7.02 },
  //       { time: 30, reading: 5.75 },
  //       { time: 35, reading: 6.23 },
  //       { time: 40, reading: 7.17 },
  //       { time: 45, reading: 5.79 },
  //       { time: 50, reading: 5.5 },
  //       { time: 55, reading: 5.63 },
  //       { time: 60, reading: 6.6 },
  //       { time: 65, reading: 6.64 },
  //       { time: 70, reading: 6.78 },
  //       { time: 75, reading: 6.21 },
  //       { time: 80, reading: 7.5 },
  //       { time: 85, reading: 5.74 },
  //       { time: 90, reading: 5.8 },
  //       { time: 95, reading: 6.43 },
  //     ],
  //   },
  //   e: {
  //     unit: 'ec',
  //     version: 0,
  //     readings: [
  //       { time: 0, reading: 0.86 },
  //       { time: 5, reading: 0.61 },
  //       { time: 10, reading: 0.57 },
  //       { time: 15, reading: 0.61 },
  //       { time: 20, reading: 0.69 },
  //       { time: 25, reading: 0.83 },
  //       { time: 30, reading: 0.66 },
  //       { time: 35, reading: 0.62 },
  //       { time: 40, reading: 0.95 },
  //       { time: 45, reading: 0.61 },
  //       { time: 50, reading: 0.84 },
  //       { time: 55, reading: 0.61 },
  //       { time: 60, reading: 0.31 },
  //       { time: 65, reading: 0.86 },
  //       { time: 70, reading: 0.97 },
  //       { time: 75, reading: 0.7 },
  //       { time: 80, reading: 0.8 },
  //       { time: 85, reading: 0.82 },
  //       { time: 90, reading: 0.46 },
  //       { time: 95, reading: 0.64 },
  //     ],
  //   },
  //   npk: {
  //     unit: '',
  //     version: 0,
  //     readings: [
  //       { time: 0, reading: 27.86 },
  //       { time: 5, reading: 29.01 },
  //       { time: 10, reading: 39.31 },
  //       { time: 15, reading: 15.88 },
  //       { time: 20, reading: 38.23 },
  //       { time: 25, reading: 37.17 },
  //       { time: 30, reading: 26.92 },
  //       { time: 35, reading: 13.71 },
  //       { time: 40, reading: 12.02 },
  //       { time: 45, reading: 32.83 },
  //       { time: 50, reading: 33.5 },
  //       { time: 55, reading: 14.44 },
  //       { time: 60, reading: 15.69 },
  //       { time: 65, reading: 11.44 },
  //       { time: 70, reading: 29.64 },
  //       { time: 75, reading: 35.0 },
  //       { time: 80, reading: 17.47 },
  //       { time: 85, reading: 16.77 },
  //       { time: 90, reading: 14.84 },
  //       { time: 95, reading: 27.44 },
  //     ],
  //   },
  // };

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
                    <Notif notif={notif} even={index % 2 === 0} />
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
          <HalfPanel>6</HalfPanel>
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
