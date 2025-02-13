import React from 'react'
import { LinkItem, NavBar, NavContainer } from './style'
import { usePathname } from 'next/navigation'

export default function NavigationMobile({
  isLoggedIn,
  setLoggedIn,
  setShowNav,
  showNav,
}: any) {
  const pathname = usePathname()
  return (
    <NavContainer>
      <NavBar>
        <LinkItem isActive={pathname === '/'}>O</LinkItem>
        <LinkItem isActive={pathname === '/plantpage'}>MP</LinkItem>
        <LinkItem isActive={pathname === '/upload'}>U</LinkItem>
        <LinkItem isActive={pathname === '/tips'}>TPS</LinkItem>
        <LinkItem isActive={pathname === '/about'}>AB</LinkItem>
        <LinkItem isActive={pathname === '/settings'}>SET</LinkItem>
      </NavBar>
    </NavContainer>
  )
}
