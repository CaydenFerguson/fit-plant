'use client'

import React from 'react'
import { LinkItem, NavBar, NavContainer } from './style'
import { usePathname } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import Link from 'next/link'
import NavHero from '../NavHero'

export default function NavigationDesktop({ isLoggedIn, setLoggedIn }: any) {
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
    <NavContainer>
      <div
        style={{ margin: '20px', display: 'flex', justifyContent: 'center' }}
      >
        <h1>Fit Plants</h1>
        <h6 style={{ paddingTop: '20px', paddingLeft: '5px' }}>Alpha 0.0.1</h6>
      </div>
      <NavBar>
        {/* Hero */}
        <NavHero />
        <Link href={'/'}>
          <LinkItem isActive={pathname === '/'}>Overview</LinkItem>
        </Link>
        <Link href={'/plantpage'}>
          <LinkItem isActive={pathname === '/plantpage'}>My Plants</LinkItem>
        </Link>
        <Link href={'/upload'}>
          <LinkItem isActive={pathname === '/upload'}>Upload</LinkItem>
        </Link>
        <Link href={'/tips'}>
          <LinkItem isActive={pathname === '/tips'}>Tips</LinkItem>
        </Link>
        <Link href={'/about'}>
          <LinkItem isActive={pathname === '/about'}>About</LinkItem>
        </Link>
        <Link href={'/settings'}>
          <LinkItem isActive={pathname === '/settings'}>Settings</LinkItem>
        </Link>
        <LinkItem onClick={() => logout()}>Log out</LinkItem>
      </NavBar>
    </NavContainer>
  )
}
