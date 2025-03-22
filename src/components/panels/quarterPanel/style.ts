'use client'

import theme from '@/app/theme'
import styled from '@emotion/styled'

export const Container = styled.div(({ invisible = false, theme }: any) => {
  return {
    flexBasis: '250px',
    flexGrow: 1,
    height: '30vh',
    borderRadius: '20px',
    backgroundColor: invisible ? 'transparent' : theme.colours.navAndPanels,
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.25)',
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
