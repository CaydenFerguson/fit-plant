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
    width: '40%',
    height: '50%',
    padding: '20px',
    backgroundColor: '#E9E6E6',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }
})

export const Title = styled.h2(() => ({
  fontSize: '80px',
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
  fontSize: '25px',
  color: '#2E2C2F',
  a: {
    color: '#66C3FF',
  },
}))
