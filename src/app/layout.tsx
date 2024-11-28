'use client'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import NavigationDesktop from '../components/desktopNav'
import TopBar from '@/components/topBar'
import { auth } from '../config/firebase'
import LoginPane from '@/components/login'
import { useEffect, useState } from 'react'
import { getFirestore } from 'firebase/firestore'
const db = getFirestore()

// export const metadata: Metadata = {
//   title: 'Fit Plants',
//   description: 'Monitor your plants!',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let notLogin = false
  const [loggedIn, setLoggedIn] = useState(false)

  // Figure out a way to auto check if a user is signed in
  // useEffect(() => {
  //   // fetchUser();
  //   const currentUser = auth?.currentUser?.email
  //   if (currentUser != undefined) {
  //     setLoggedIn(true)
  //   } else {
  //     setLoggedIn(false)
  //   }
  // }, [])

  // Eventually clean this up by moving it all into homepage
  return (
    <html lang="en">
      <body>
        {loggedIn ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: 'auto',
              overflow: 'visible',
            }}
          >
            <NavigationDesktop
              isLoggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
            <div style={{ flex: 1 }}>
              {/* <TopBar /> */}
              {children}
            </div>
          </div>
        ) : (
          <LoginPane
            database={db}
            isLoggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        )}
      </body>
    </html>
  )
}
