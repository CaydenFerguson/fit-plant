import React from 'react'
import {
  LoginBackground,
  LoginPanel,
  Title,
  Input,
  Button,
  Label,
  FooterText,
  DividerLine,
} from './style'

export default function LoginPane({ isLoggedIn, setLoggedIn }: any) {
  return (
    <LoginBackground>
      <LoginPanel>
        <Title>Sign In</Title>
        <Label>Email</Label>
        <Input type="email" placeholder="Email" />
        <Label>Password</Label>
        <Input type="password" placeholder="Password" />
        <Button onClick={() => setLoggedIn(!isLoggedIn)}>Sign in</Button>
        <DividerLine />
        <FooterText>
          Need an Account? <a href="#">Sign up</a>
        </FooterText>
      </LoginPanel>
    </LoginBackground>
  )
}
