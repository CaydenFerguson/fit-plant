'use client'

import styled from '@emotion/styled'

export const NavBar = styled.ul({
  listStyleType: 'none',
  padding: '10px',
  display: 'flex',
  justifyContent: 'left',
})

export const LinkItem = styled.li({
  padding: '0 10px',
  margin: '0px 10px',
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
})
