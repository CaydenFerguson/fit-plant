import React from 'react'
import { LinkItem, NavBar, NavContainer } from './style'
import { usePathname } from 'next/navigation'
import theme from '@/app/theme'
import Link from 'next/link'

export default function NavigationMobile({
  isLoggedIn,
  setLoggedIn,
  setShowNav,
  showNav,
}: any) {
  const pathname = usePathname()
  return (
    <NavContainer id="test">
      {/* <div
        style={{
          height: '30px',
          //   background: `linear-gradient(to top, rgb(46, 44, 47,1) 100%, rgb(46, 44, 47,0) 20%)`,
          background: `rgb(46, 44, 47,0.5)`,
        }}
      /> */}
      <NavBar>
        <Link style={{ width: '100%' }} href={'/'}>
          <LinkItem isActive={pathname === '/'}>O</LinkItem>
        </Link>
        <Link style={{ width: '100%' }} href={'/plantpage'}>
          <LinkItem isActive={pathname === '/plantpage'}>MP</LinkItem>
        </Link>
        <Link style={{ width: '100%' }} href={'/upload'}>
          <LinkItem isActive={pathname === '/upload'}>Up</LinkItem>
        </Link>
        <Link style={{ width: '100%' }} href={'/tips'}>
          <LinkItem isActive={pathname === '/tips'}>TPS</LinkItem>
        </Link>
        <Link style={{ width: '100%' }} href={'/about'}>
          <LinkItem isActive={pathname === '/about'}>AB</LinkItem>
        </Link>
        <Link style={{ width: '100%' }} href={'/settings'}>
          <LinkItem isActive={pathname === '/settings'}>SET</LinkItem>
        </Link>
      </NavBar>
    </NavContainer>
  )
}
