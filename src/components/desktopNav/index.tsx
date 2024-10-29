import React from 'react'
import { LinkItem, NavBar } from './style'
import Link from 'next/link'

export default function NavigationDesktop() {
  return (
    <NavBar>
      <Link href={'/'}>
        <LinkItem>Home</LinkItem>
      </Link>
      <Link href={'/plantpage'}>
      <LinkItem>Plant #1</LinkItem>
      </Link>
      <Link href={'/plantpage'}>
      <LinkItem>Plant #2</LinkItem>
      </Link>
      <Link href={'/about'}>
      <LinkItem>About</LinkItem>
      </Link>
    </NavBar>
  )
}
