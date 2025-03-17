'use client'

import React from 'react'
import { LinkItem, NavBar, NavContainer } from './style'
import { usePathname } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import Link from 'next/link'
import NavHero from '../NavHero'
import { motion } from 'motion/react'
import theme from '@/app/theme'

export default function NavigationDesktop({
  isLoggedIn,
  setLoggedIn,
  setShowNav,
  showNav,
}: any) {
  const pathname = usePathname()

  async function logout() {
    try {
      console.log('logout')
      await signOut(auth)
      if (!auth.currentUser?.email) {
        setLoggedIn(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        marginTop: '20px',
        // backgroundColor: theme.colours.greyDark
      }}
    >
      <div
        onClick={() => setShowNav(!showNav)}
        style={{
          color: 'white',
          fontSize: '50px',
          position: 'absolute',
          right: showNav ? '5px' : '-8px',
          top: '0px',
          zIndex: 100,
          cursor: 'pointer',
          height: '100vh',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: showNav
              ? theme.colours.transparent
              : theme.colours.greyDark,
            borderRadius: showNav ? '' : '0px 20px 20px 0',
            boxShadow: showNav ? '' : '3px 3px 5px 0px rgba(0,0,0,0.25)',
          }}
        >
          {showNav ? '\u{1F890}' : '\u{1F892}'}
        </div>
      </div>
      <motion.div
        animate={{
          width: showNav ? '300px' : '20px',
          opacity: showNav ? 1 : 0,
        }}
        transition={{
          width: {
            // duration: 2,
            // type: showNav ? 'spring' : '',
            type: 'spring',
            stiffness: '200',
            damping: showNav ? '12' : '20',
          },
          opacity: { duration: showNav ? 0.5 : 0, delay: showNav ? 0.2 : 0.5 },
        }}
      >
        {
          <NavContainer>
            {showNav && (
              <>
                <div
                  style={{
                    margin: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <h1>Fit Plants</h1>
                  <h6 style={{ paddingTop: '20px', paddingLeft: '5px' }}>
                    Alpha 0.0.1
                  </h6>
                </div>
                <NavBar>
                  {/* Hero */}
                  {/* <NavHero /> */}
                  <Link prefetch={true} href={'/'}>
                    <LinkItem isActive={pathname === '/'}>Overview</LinkItem>
                  </Link>
                  <Link prefetch={true} href={'/plantpage'}>
                    <LinkItem isActive={pathname === '/plantpage'}>
                      My Plants
                    </LinkItem>
                  </Link>
                  <Link prefetch={true} href={'/upload'}>
                    <LinkItem isActive={pathname === '/upload'}>
                      Upload
                    </LinkItem>
                  </Link>
                  <Link prefetch={true} href={'/tips'}>
                    <LinkItem isActive={pathname === '/tips'}>Tips</LinkItem>
                  </Link>
                  <Link prefetch={true} href={'/about'}>
                    <LinkItem isActive={pathname === '/about'}>About</LinkItem>
                  </Link>
                  <Link prefetch={true} href={'/settings'}>
                    <LinkItem isActive={pathname === '/settings'}>
                      Settings
                    </LinkItem>
                  </Link>
                  <LinkItem prefetch={true} onClick={() => logout()}>
                    Log out
                  </LinkItem>
                </NavBar>
              </>
            )}
          </NavContainer>
        }
      </motion.div>
    </div>
  )
}
