'use client'
import NormalPageLayout from '@/components/normalPageLayout'
import PanelGeneric from '@/components/panels/panelGeneric'
import React, { useEffect, useState } from 'react'
import { SettingsContainer, SettingsRow } from './styles'
import { getUserData, setDataFirebase } from '@/helpers/firebase'
import { db, auth } from '@/config/firebase'

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
    setDataFirebase('users', auth, db, updatedFavUser)
    getUsersData()
  }
  useEffect(() => {
    console.log('Fetching user details')
    getUsersData()
  }, [])

  return (
    <NormalPageLayout>
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
          </SettingsContainer>
        )}
      </PanelGeneric>
    </NormalPageLayout>
  )
}
