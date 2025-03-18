'use client'

import styled from '@emotion/styled'
// const { isMobile } = useGlobalContext()

export const Container = styled.div(({ invisible = false }: any) => {
  return {
    flexBasis: '250px',
    flexGrow: 1,
    height: '60vh',
    borderRadius: '20px',
    backgroundColor: invisible ? 'transparent' : '#29282A',
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.25)',
    padding: '20px',

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
