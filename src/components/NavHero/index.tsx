import React from 'react'
import { HeroContainer, UserDetails, UserProfilePic } from './style'

export default function NavHero() {
  return (
    <HeroContainer>
      <UserProfilePic />
      <UserDetails>
        <div>Username</div>
        <div>Expert</div>
      </UserDetails>
    </HeroContainer>
  )
}
