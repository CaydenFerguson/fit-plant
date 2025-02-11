'use client'

import styled from '@emotion/styled'
import theme from '@/app/theme'

export const Container = styled.div(({ invisible = false }: any) => {
  return {
    // border: '2px solid red',
    flexBasis: '500px',
    flexGrow: 2,
    // flexGrow: proportion,
    height: '60vh',
    borderRadius: '20px',
    backgroundColor: invisible ? 'transparent' : '#29282A',
    boxShadow: invisible ? '' : '3px 3px 5px 0px rgba(0,0,0,0.25)',
    padding: '-20px',
    position: 'relative',
    // margin: '-20px',
    // border: '2px solid red',

    '@media (min-width: 1200px)': {
      flexBasis: 'calc(500px-20px)',
    },
    '@media (min-width: 1080px)': {
      flexBasis: 'calc(500px-20px)',
    },
    '@media (min-width: 700px)': {
      flexBasis: 'calc(250px-20px)',
    },
  }
})

export const SettingsButton = styled.button(() => {
  return {
    backgroundColor: theme.colours.transparent,
    position: 'absolute',
    top: '5px',
    left: '5px',
    borderColor: 'transparent',
    zIndex: '50',
    cursor: 'pointer',
    opacity: '0.5',
    '&:hover': {
      opacity: '1',
    },
  }
})
