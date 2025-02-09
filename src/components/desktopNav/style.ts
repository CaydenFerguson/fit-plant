'use client'

import theme from '@/app/theme'
import styled from '@emotion/styled'

export const NavContainer = styled.div({
  // width: '300px',
  height: 'calc(100vh - 0px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.colours.greyDark,
  position: 'sticky',
  top: '0px',
  borderRadius: '0px 20px 20px 0',
  boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.25)',
})
export const NavBar = styled.ul({
  listStyleType: 'none',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  gap: '5px',
  margin: '15px',
})

export const LinkItem = styled.li(({ isActive }: any) => {
  return {
    padding: '15px 20px',
    fontSize: '20px',
    backgroundColor: isActive
      ? theme.colours.activeNav
      : theme.colours.transparent,

    '&:hover': {
      backgroundColor: !isActive ? theme.colours.hoverNav : '',
      cursor: 'pointer',
    },
    borderRadius: '15px',
  }
})
