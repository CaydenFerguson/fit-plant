'use client'

import styled from '@emotion/styled'

export const AccountHeroContainer = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '15px',
    backgroundColor: '#3E3B3F',
    margin: '10px 0px',
    gap: '20px',
    width: '100%',
    maxWidth: '550px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
})

export const HeroButton = styled.button(({ theme }) => {
  console.log('theme', theme)
  if (theme) {
    return {
      //   backgroundColor: theme?.colours.activeNav,
      //   color: '#ffffff',
      //   padding: '7px',
      //   borderRadius: '10px',
      //   border: 'none',
      //   marginLeft: 'auto',
      //   marginRight: 'auto',
      //   cursor: 'pointer',
      //   textWrap: 'nowrap',
      //   '&:hover': {
      //     backgroundColor: theme.colours.hoverNav,
      //   },
    }
  }
})
