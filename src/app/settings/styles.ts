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

export const EmojiSelectContainer = styled.div(() => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '20px',
  }
})

export const EmojiItem = styled.div(({ theme }) => {
  return {
    fontSize: '40px',
    borderRadius: '20px',
    border: '2px solid white',
    padding: '5px',
    boxShadow: '3px 3px 5px 0px rgba(0, 0, 0, 0.25)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colours.offWhite,
      scale: '1.1',
    },
  }
})

export const Divider = styled.div(() => {
  return {
    width: '120px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '10px',
    display: 'flex',
    marginTop: '40px',
    marginBottom: '40px',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderTop: '2px solid white',
    borderBottom: '2px solid white',
  }
})

export const SettingSelector = styled.select(() => {
  return {
    borderRadius: '10px',
  }
})
