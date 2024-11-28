import React from 'react'
import { HeroContainer, UserDetails, UserProfilePic } from './style'
import { auth } from '../../config/firebase'

export default function NavHero() {
  console.log(auth?.currentUser?.email)
  const username = auth?.currentUser?.email || 'username'
  return (
    <HeroContainer>
      <UserProfilePic />
      <UserDetails>
        <div>{username}</div>
        <div>Expert</div>
      </UserDetails>
    </HeroContainer>
  )
}
