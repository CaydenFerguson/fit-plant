import { useGlobalContext } from '@/app/context/GlobalContext'
import React from 'react'
import NavigationDesktop from '../desktopNav'

export default function Navigation({
  isLoggedIn,
  setLoggedIn,
  setShowNav,
  showNav,
}: any) {
  const { isMobile } = useGlobalContext()

  return (
    <>
      {' '}
      {isMobile ? (
        <></>
      ) : (
        <NavigationDesktop
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          setShowNav={setShowNav}
          showNav={showNav}
        />
      )}{' '}
    </>
  )
}
