'use client'

import theme from '@/app/theme'
import styled from '@emotion/styled'

export const Container = styled.div(({ invisible = false }: any) => {
  return {
    // border: '2px solid red',
    flexBasis: '500px',
    flexGrow: 2,
    // flexGrow: proportion,
    // height: '30vh',
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    backgroundColor: invisible ? 'transparent' : theme.colours.foregroundDark,
    boxShadow: invisible ? '' : '3px 3px 5px 0px rgba(0,0,0,0.25)',
    padding: '20px',
    // border: '2px solid red',

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
