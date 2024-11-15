'use client'

import theme, { device } from '@/app/theme'
import styled from '@emotion/styled'

export const LoginBackground = styled.div(() => {
  return {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.colours.backgroundLight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export const LoginPanel = styled.div(() => {
  return {
    padding: '20px',
    backgroundColor: theme.colours.foregroundLight,
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

export const Title = styled.h2(() => ({
  fontSize: '50px',
  color: theme.colours.textDark,
  marginBottom: '15px',
  marginTop: '40px',
}))

export const Label = styled.label(() => ({
  width: '70%',
  textAlign: 'left',
  fontSize: '18px',
  color: theme.colours.textDark,
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

export const Button = styled.button(() => ({
  width: '100%',
  padding: '10px',
  borderRadius: '20px',
  backgroundColor: theme.colours.buttonBlue,
  border: 'none',
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '20px',
  color: theme.colours.textDark,
  [device.xs]: {
    width: '138px',
  },
}))

export const DividerLine = styled.div(() => ({
  width: '70%',
  height: '2px',
  backgroundColor: theme.colours.textDark,
  margin: '15px',
}))

export const FooterText = styled.p(() => ({
  fontSize: '20px',
  color: theme.colours.textDark,
  a: {
    color: theme.colours.linkBlue,
  },
}))
