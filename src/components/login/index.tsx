import React from 'react'

export default function LoginPane({ isLoggedIn, setLoggedIn }: any) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#2e2c2f',
      }}
    >
      <div
        style={{
          width: '20%',
          height: '50%',
          backgroundColor: '#29282A',
        }}
      >
        Make this the login pane
        <button onClick={() => setLoggedIn(!isLoggedIn)}>Log in</button>
      </div>
    </div>
  )
}
