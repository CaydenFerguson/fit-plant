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
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.5)',
    transition: 'scale 0.2s, opacity 0.2s',
    cursor: 'pointer',
    '&:hover': {
      scale: '1.1',
      opacity: '0.87',
    },
  }
})

export const UserDetails = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
  }
})
