'use client'

import styled from '@emotion/styled'

export const LogoutButton = styled.h2(({ theme }) => {
  return {
    color: 'red',
    backgroundColor: theme.colours.backgroundDark,
    borderRadius: '15px',
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
export const SettingsRow = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: '15px',
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
