'use client'

import styled from '@emotion/styled'

export const LoginBackground = styled.div(() => {
  return {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#29282A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export const LoginPanel = styled.div(() => {
  return {
    padding: '20px',
    backgroundColor: '#E9E6E6',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',

    width: '100px',
    '@media (min-width: 250px)': {
      width: '100px',
    },
    '@media (min-width: 500px)': {
      width: '150px',
    },
    '@media (min-width: 700px)': {
      width: '200px',
    },
    '@media (min-width: 1080px)': {
      width: '350px',
    },
    '@media (min-width: 1440px)': {
      width: '500px',
    },
  }
})

export const Title = styled.h2(() => ({
  fontSize: '50px',
  color: '#2E2C2F',
  marginBottom: '15px',
  marginTop: '40px',
}))

export const Label = styled.label(() => ({
  width: '70%',
  textAlign: 'left',
  fontSize: '18px',
  color: '#2E2C2F',
  fontWeight: 'bold',
}))

export const Input = styled.input(() => ({
  width: '70%',
  height: '7%',
  padding: '10px',
  borderRadius: '10px',
  border: '1px solid #E9E6E6',
  fontSize: '16px',
  marginBottom: '3px',
}))

export const Button = styled.button(() => ({
  width: '30%',
  padding: '10px',
  borderRadius: '20px',
  backgroundColor: '#44C7AF',
  border: '1px solid #E9E6E6',
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '20px',
}))

export const DividerLine = styled.div(() => ({
  width: '70%',
  height: '2px',
  backgroundColor: '#2E2C2F',
  margin: '15px',
}))

export const FooterText = styled.p(() => ({
  fontSize: '20px',
  color: '#2E2C2F',
  a: {
    color: '#66C3FF',
  },
}))
