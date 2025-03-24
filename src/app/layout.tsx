'use client'

import './globals.css'
import NavigationDesktop from '../components/desktopNav'
import LoginPane from '@/components/login'
import { use, useEffect, useRef, useState } from 'react'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LoadingSpinner from '@/components/loadingSpinner'
import { GlobalProvider, useGlobalContext } from './context/GlobalContext'
import NavigationMobile from '@/components/mobileNav'
import { ThemeProvider, useTheme } from '@emotion/react'
import theme from './theme'
import { getUserData } from '@/helpers/firebase'
const db = getFirestore()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [validatingLogin, setValidatingLogin] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userTheme, setUserTheme] = useState('dark')
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
    getUsersData()
    // Cleanup the listener on component unmount
    return () => {
      unsubscribe()
    }
  }, [])

  const theme2 = {
    colors: {
      primary: 'hotpink',
    },
  }

  async function getUsersData() {
    const user = await getUserData(db, auth, 'users')
    if (user) {
      if (user.preferredTheme != 'dark') {
        setUserTheme('light')
      } else {
        setUserTheme('dark')
      }
    }
  }

  return (
    <html lang="en">
      <GlobalProvider>
        <ThemeProvider
          // theme={theme.dark}
          theme={userTheme === 'dark' ? theme.dark : theme.light}
        >
          {!validatingLogin != null ? (
            <LayoutContent
              loggedIn={loggedIn}
              userTheme={userTheme}
              setUserTheme={setUserTheme}
            >
              {children}
            </LayoutContent>
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
        </ThemeProvider>
      </GlobalProvider>
    </html>
  )
}

function LayoutContent({
  children,
  loggedIn,
  setLoggedIn,
  setUserTheme,
  userTheme,
}: any) {
  const [showNav, setShowNav] = useState(true)
  const { isMobile } = useGlobalContext()
  const theme = useTheme()
  // Eventually clean this up by moving it all into homepage
  return (
    <body id="layout" style={{ backgroundColor: theme.colours.background }}>
      {loggedIn ? (
        <div
          style={{
            height: '100%',
            overflow: 'auto',
            overflowX: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: 'auto',
              overflowX: 'hidden',
              // border: '2px solid red',
            }}
          >
            {!isMobile && (
              <NavigationDesktop
                isLoggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setShowNav={setShowNav}
                showNav={showNav}
                userTheme={userTheme}
                setUserTheme={setUserTheme}
              />
            )}
            <div
              style={{
                flexGrow: 1,
                // border: '5px solid green',
                minWidth: 0,
              }}
            >
              {/* <TopBar /> */}
              {children}
            </div>
          </div>

          {isMobile && (
            <div style={{ position: 'fixed', bottom: '0px', width: '100%' }}>
              <NavigationMobile
                isLoggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setShowNav={setShowNav}
                showNav={showNav}
              />
            </div>
          )}
        </div>
      ) : (
        <LoginPane
          database={db}
          isLoggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
      )}
    </body>
  )
}
