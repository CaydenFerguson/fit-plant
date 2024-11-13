'use client'

import React from 'react'
import { LinkItem, NavBar, NavContainer } from './style'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavigationDesktop() {
  const pathname = usePathname()
  return (
    <NavContainer>
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
          <LinkItem isActive={pathname === '/'}>Home</LinkItem>
        </Link>
        <Link href={'/plantpage'}>
          <LinkItem isActive={pathname === '/plantpage'}>My Plants</LinkItem>
        </Link>
        <Link href={'/about'}>
          <LinkItem isActive={pathname === '/about'}>About</LinkItem>
        </Link>
      </NavBar>
    </NavContainer>
  )
}
