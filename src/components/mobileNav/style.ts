'use client'

import styled from '@emotion/styled'

export const NavContainer = styled.div(({ theme }) => {
  return {
    width: '100%',
    backgroundColor: theme.colours.greyDark,
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.25)',
    zIndex: 100,
    borderTop: '3px solid rgba(255,255,255,0.2)',
    // borderRadius: '15px 15px 0 0',
  }
})

export const NavBar = styled.ul(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    // gap: '20px',
    listStyleType: 'none',
  }
})

export const LinkItem = styled.li(({ isActive, theme }: any) => {
  return {
    textAlign: 'center',
    fontSize: '18px',
    // padding: '15px 10px',
    cursor: 'pointer',
    width: '100%',
    // borderLeft: '2px solid rgba(255,255,255,0.3)',
    // borderRight: '2px solid rgba(255,255,255,0.3)',
    backgroundColor: isActive
      ? theme.colours.activeNav
      : theme.colours.transparent,
    '&:hover': {
      backgroundColor: !isActive ? theme.colours.hoverNav : '',
      cursor: 'pointer',
    },
  }
})
