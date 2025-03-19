'use client'

import styled from '@emotion/styled'
import theme, { device } from '../theme'

export const Title = styled.h1(() => {
  return {
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid white',
    width: '100%',
    textAlign: 'center',
  }
})
export const CodeOutputBox = styled.input({
  backgroundColor: '#29282A',
  color: '#ffffff',
  padding: '10px',
  borderRadius: '10px',
  border: 'none',
  width: '100%',
  maxWidth: '400px',
  fontSize: '1rem',
  textAlign: 'center',
  margin: '0 auto',
  marginBottom: '20px',
  [device.sm]: {
    fontSize: '1.5rem',
  },
})

export const CopyButton = styled.button(() => {
  return {
    backgroundColor: theme.colours.activeNav,
    color: '#ffffff',
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    width: '100%',
    maxWidth: '400px',
    fontSize: '1.5rem',
    textAlign: 'center',
    margin: '0 auto',
    cursor: 'pointer',
    // border: '1px solid white',
    '&:hover': {
      backgroundColor: theme.colours.hoverNav,
    },
  }
})

export const Container = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '1vh',
    padding: '20px',
    width: '100%',
    [device.sm]: {
      padding: '100px',
    },
  }
})
