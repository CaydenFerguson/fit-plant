'use client'

import styled from '@emotion/styled'

export const Container = styled.div(({ proportion, minWidth }: any) => {
  return {
    border: '2px solid red',
    flexBasis: `${minWidth}`,
    flexGrow: proportion,
    height: '20vh',
  }
})
