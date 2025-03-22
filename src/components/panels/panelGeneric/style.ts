'use client'

import styled from '@emotion/styled'

export const Container = styled.div(({ invisible = false, theme }: any) => {
  return {
    flexBasis: '500px',
    flexGrow: 2,
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    backgroundColor: invisible ? 'transparent' : theme.colours.navAndPanels,
    boxShadow: invisible ? '' : '3px 3px 5px 0px rgba(0,0,0,0.25)',
    padding: '20px',
  }
})
