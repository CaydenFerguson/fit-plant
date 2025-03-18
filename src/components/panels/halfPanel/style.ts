'use client'

import theme from '@/app/theme'
import styled from '@emotion/styled'

export const Container = styled.div(({ invisible = false }: any) => {
  return {
    flexBasis: '500px',
    flexGrow: 2,
    height: '30vh',
    borderRadius: '20px',
    backgroundColor: invisible ? 'transparent' : theme.colours.foregroundDark,
    boxShadow: invisible ? '' : '3px 3px 5px 0px rgba(0,0,0,0.25)',
    padding: '20px',

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
