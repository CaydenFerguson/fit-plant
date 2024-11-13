import React from 'react'
import { LoginBackground, LoginPanel } from './style'

export default function LoginPane({ isLoggedIn, setLoggedIn }: any) {
  return (
    <LoginBackground>
      <LoginPanel>
        Make this the login pane
        <button onClick={() => setLoggedIn(!isLoggedIn)}>Log in</button>
      </LoginPanel>
    </LoginBackground>
  )
}
