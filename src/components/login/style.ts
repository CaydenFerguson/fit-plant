'use client'

import { device } from '@/app/theme'
import styled from '@emotion/styled'

export const LoginBackground = styled.div(({ theme }) => {
  return {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.colours.backgroundDark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export const LoginPanel = styled.div(({ theme }) => {
  return {
    padding: '20px',
    backgroundColor: theme.colours.foregroundDark,
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.25)',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '50px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: 'calc(100vw - 40px)',

    [device.sm]: {
      width: '500px',
    },
  }
})

export const Title = styled.h2(({ theme }) => ({
  fontSize: '50px',
  color: theme.colours.textLight,
  marginBottom: '15px',
  marginTop: '40px',
}))

export const Label = styled.label(({ theme }) => ({
  width: '70%',
  textAlign: 'left',
  fontSize: '18px',
  color: theme.colours.textLight,
  fontWeight: 'bold',
}))

export const Input = styled.input(() => ({
  width: '70%',
  height: '7%',
  padding: '10px',
  borderRadius: '10px',
  border: 'none',
  fontSize: '16px',
  marginBottom: '3px',
}))

export const Msg = styled.p(() => {
  return {
    color: 'red',
    fontSize: '14px',
  }
})

export const Button = styled.button(({ isLoading, theme }: any) => ({
  width: '100%',
  padding: '10px',
  borderRadius: '20px',
  backgroundColor: isLoading
    ? theme.colours.buttonDisabledBlue
    : theme.colours.buttonBlue,
  border: 'none',
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '20px',
  color: theme.colours.textLight,
  [device.xs]: {
    width: '138px',
  },
}))

export const DividerLine = styled.div(({ theme }) => ({
  width: '70%',
  height: '2px',
  backgroundColor: theme.colours.textLight,
  margin: '15px',
}))

export const FooterText = styled.p(({ theme }) => ({
  fontSize: '20px',
  color: theme.colours.textLight,
  a: {
    color: theme.colours.linkBlue,
  },
}))
