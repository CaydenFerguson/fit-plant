'use client'
import NormalPageLayout from '@/components/normalPageLayout'
import PanelGeneric from '@/components/panels/panelGeneric'
import React, { useEffect, useState } from 'react'
import {
  LogoutButton,
  SettingsContainer,
  SettingsRow,
  SettingsWrapper,
} from './styles'
import { getUserData, setDataFirebase } from '@/helpers/firebase'
import { db, auth } from '@/config/firebase'
import theme from '../theme'
import { signOut } from 'firebase/auth'
import AccountHero from '@/components/accountHero'

export default function settings() {
  const [userPlants, setUserPlants] = useState<any>(null)
  const [favouritePlant, setFavouritePlant] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  async function getUsersData() {
    const user = await getUserData(db, auth, 'users')
    const plantData = await getUserData(db, auth, 'userPlants')
    console.log('Heres the plant data:', plantData)
    setUserPlants(plantData)
    setUser(user)
    console.log('Heres the users data:', user)
    setFavouritePlant(plantData?.plants[0])
  }

  async function updateFavouritePlant(favouritePlant: number) {
    let updatedFavUser = user
    updatedFavUser.favouritePlant = favouritePlant
    updatedFavUser.version += 1
    setDataFirebase('users', auth, db, updatedFavUser)
    getUsersData()
  }

  async function updateTheme(theme: string) {
    let updatedTheme = user
    updatedTheme.preferredTheme = theme
    updatedTheme.version += 1
    setDataFirebase('users', auth, db, updatedTheme)
    getUsersData()
  }
  useEffect(() => {
    console.log('Fetching user details')
    getUsersData()
  }, [])

  async function logout() {
    try {
      console.log('logout')
      await signOut(auth)
      if (!auth.currentUser?.email) {
        // setLoggedIn(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <NormalPageLayout>
      <SettingsWrapper>
        <PanelGeneric>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h1>Settings</h1>
          </div>
          {userPlants && (
            <SettingsContainer>
              {/* --------- Theme ---------- */}
              <SettingsRow>
                <h2>Theme:</h2>
                <select
                  style={{ width: 'auto' }}
                  onChange={(e) => {
                    updateTheme(e.target.value)
                    console.log('Changed Theme')
                  }}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </SettingsRow>

              {/* ------- Favourite Plant -------- */}
              <SettingsRow>
                <h2>Favourite Plant:</h2>
                <select
                  value={user?.favouritePlant}
                  style={{ width: 'auto' }}
                  onChange={(e) => {
                    updateFavouritePlant(Number(e.target.value))
                    setFavouritePlant(userPlants?.plants[e.target.value])
                  }}
                >
                  {userPlants?.plants?.map((plant: any, index: number) => (
                    <option key={index} value={index}>
                      {plant.name}
                    </option>
                  ))}
                </select>
              </SettingsRow>

              {/* ------- Units --------- */}
              <SettingsRow>
                <h2>Units:</h2>
                <select
                  style={{ width: 'auto' }}
                  onChange={(e) => {
                    console.log('Changed Units')
                  }}
                >
                  <option value="metric">Metric</option>
                  <option value="imperial">Imperial</option>
                </select>
              </SettingsRow>

              {/* ------- Log Out --------- */}
              <SettingsRow>
                <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
              </SettingsRow>
            </SettingsContainer>
          )}
        </PanelGeneric>
        <PanelGeneric>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h1>Account Details</h1>
            </div>
            <AccountHero user={user} />
            <p style={{ textWrap: 'wrap' }}>
              <b>UID:</b> {auth.currentUser?.uid}
            </p>
          </div>
        </PanelGeneric>
      </SettingsWrapper>
    </NormalPageLayout>
  )
}
