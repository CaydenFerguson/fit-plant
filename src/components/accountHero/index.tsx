import React from 'react'
import { AccountHeroContainer, HeroButton } from './style'

export default function AccountHero({ user }: any) {
  return (
    <AccountHeroContainer>
      {/* // This is a temporary fix for the user image */}
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'white',
          borderRadius: '50%',
        }}
      />
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5px',
            fontWeight: '700',
          }}
        >
          <p>{user?.firstName}</p>
          <p>{user?.lastName}</p>
        </div>
        <p>{user?.email}</p>
      </div>
      <HeroButton>Change Picture</HeroButton>
    </AccountHeroContainer>
  )
}
