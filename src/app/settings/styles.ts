'use client'

import styled from '@emotion/styled'

export const LogoutButton = styled.h2(({ theme }) => {
  return {
    color: theme.colours.text,
    backgroundColor: theme.colours.buttonBlue,
    borderRadius: '20px',
    padding: '10px',
    maxWidth: '200px',
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      backgroundColor: theme.colours.hoverNav,
    },
  }
})
export const SettingsContainer = styled.div(() => {
  return {
    gap: '15px',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
})
export const SettingsRow = styled.div(({ isCentered = false }: any) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: '15px',
    justifyContent: isCentered ? 'center' : 'flex-start',
  }
})

export const AccountContainer = styled.div(() => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    flexDirection: 'column',
  }
})

export const SettingsWrapper = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    '@media (max-width: 1300px)': {
      flexDirection: 'column',
    },
  }
})
