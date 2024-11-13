'use client'

import styled from '@emotion/styled'

export const Container = styled.div(({ proportion, minWidth }: any) => {
  return {
    // border: '2px solid red',
    flexBasis: `${minWidth}`,
    flexGrow: proportion,
    height: '25vh',
    borderRadius: '20px',
    backgroundColor: '#29282A',
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.25)',
  }
})
