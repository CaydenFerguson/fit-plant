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
        <div>Username</div>
        {/* <div>{username}</div> */}
        <div>1 Plant</div>
      </UserDetails>
    </HeroContainer>
  )
}
