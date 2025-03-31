'use client'

import theme from '@/app/theme'
import styled from '@emotion/styled'

export const Container = styled.div(({ invisible = false, theme }: any) => {
  return {
    cursor: 'pointer',
    flexBasis: '250px',
    maxWidth: '30vh',
    flexGrow: 1,
    height: '30vh',
    borderRadius: '20px',
    backgroundColor: invisible ? 'transparent' : theme.colours.navAndPanels,
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.25)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    padding: '20px',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    },

    '@media (min-width: 1200px)': {
      flexBasis: 'calc(250px-20px)',
    },
    '@media (min-width: 1080px)': {
      flexBasis: 'calc(200px-20px)',
    },
    '@media (min-width: 700px)': {
      flexBasis: 'calc(150px-20px)',
    },
  }
})

export const VitalsContainer = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '1rem',
  }
})

export const Button = styled.div(({ theme }) => {
  return {
    color: theme.colours.text,
    backgroundColor: theme.colours.buttonBlue,
    borderRadius: '20px',
    padding: '10px',
    maxWidth: '200px',
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    fontSize: '20px',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      backgroundColor: theme.colours.hoverNav,
    },
  }
})

export const EmojiItem = styled.div(({ theme, padding = '5px' }: any) => {
  return {
    fontSize: '20px',
    borderRadius: '20px',
    // backgroundColor: theme.colours.navAndPanelsDark,
    border: '2px solid white',
    padding: padding,
    boxShadow: '3px 3px 5px 0px rgba(0, 0, 0, 0.25)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colours.offWhite,
      scale: '1.2',
      color: 'black',
    },
  }
})
