'use client'

import React from 'react'
import { LinkItem, NavBar, NavContainer } from './style'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavigationDesktop() {
  const pathname = usePathname()
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '15px',
            marginLeft: '20px',
          }}
        >
          <div
            style={{
              borderRadius: '50%',
              backgroundColor: 'white',
              width: '50px',
              height: '50px',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>Username</div>
            <div>Expert</div>
          </div>
        </div>
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
      </NavBar>
    </NavContainer>
  )
}
