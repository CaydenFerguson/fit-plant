'use client'

import styled from '@emotion/styled'
import theme from '@/app/theme'

export const Container = styled.div(({ invisible = false }: any) => {
  return {
    // flexBasis: '500px',
    // flexGrow: 2,
    // height: '60vh',
    // minHeight: '300px',
    // borderRadius: '20px',
    // backgroundColor: invisible ? 'transparent' : '#29282A',
    // boxShadow: invisible ? '' : '3px 3px 5px 0px rgba(0,0,0,0.25)',
    // padding: '-20px',
    // position: 'relative',
    // '@media (min-width: 1200px)': {
    //   flexBasis: 'calc(500px-20px)',
    // },
    // '@media (min-width: 1080px)': {
    //   flexBasis: 'calc(500px-20px)',
    // },
    // '@media (min-width: 700px)': {
    //   flexBasis: 'calc(250px-20px)',
    // },
  }
})
export const Container2 = styled.div(({ invisible = false }: any) => {
  return {
    // flexBasis: '500px',
    width: '100%',
    height: '60vh',
    // minHeight: '300px',
    borderRadius: '20px',
    backgroundColor: invisible ? 'transparent' : '#29282A',
    boxShadow: invisible ? '' : '3px 3px 5px 0px rgba(0,0,0,0.25)',
    // padding: '10px',
    position: 'relative',
  }
})

export const SettingsButton = styled.button(() => {
  return {
    backgroundColor: theme.colours.transparent,
    position: 'absolute',
    top: '5px',
    left: '5px',
    borderColor: 'transparent',
    zIndex: '5',
    cursor: 'pointer',
    color: theme.colours.offWhite,
    opacity: '0.5',
    '&:hover': {
      opacity: '1',
    },
  }
})
