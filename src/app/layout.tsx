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
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LoadingSpinner from '@/components/loadingSpinner'
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
  const [validatingLogin, setValidatingLogin] = useState(true)

  const auth = getAuth()

  useEffect(() => {
    console.log('Setting up onAuthStateChanged listener')
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user.email)
        setValidatingLogin(false)
        setLoggedIn(true)
      } else {
        console.log('No user is signed in.')
        setValidatingLogin(false)
        setLoggedIn(false)
      }
    })

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe()
    }
  }, [])

  // Eventually clean this up by moving it all into homepage
  return (
    <html lang="en">
      {!validatingLogin ? (
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
      ) : (
        <body>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              height: '100%',
            }}
          >
            <LoadingSpinner size={100} />
          </div>
        </body>
      )}
    </html>
  )
}
