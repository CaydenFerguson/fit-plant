'use client'

import styled from '@emotion/styled'

export const HeroContainer = styled.div(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
    marginLeft: '20px',
  }
})

export const UserProfilePic = styled.div(() => {
  return {
    borderRadius: '50%',
    backgroundColor: 'white',
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '4rem',
  }
})

export const UserDetails = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
  }
})
