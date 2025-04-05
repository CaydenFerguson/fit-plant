'use client'
import NormalPageLayout from '@/components/normalPageLayout'
import PanelGeneric from '@/components/panels/panelGeneric'
import React, { useEffect, useState } from 'react'
import {
  Divider,
  EmojiItem,
  EmojiSelectContainer,
  LogoutButton,
  SettingsContainer,
  SettingSelector,
  SettingsRow,
  SettingsWrapper,
} from './styles'
import { getUserData, setDataFirebase } from '@/helpers/firebase'
import { db, auth } from '@/config/firebase'
import { signOut } from 'firebase/auth'
import AccountHero from '@/components/accountHero'
import PopUpPane from '@/components/popUpPane'
import { AnimatePresence, motion } from 'motion/react'
import UploadPanel from '@/components/UploadPanel'
import { useTheme } from '@emotion/react'

export default function settings() {
  const [userPlants, setUserPlants] = useState<any>(null)
  const [favouritePlant, setFavouritePlant] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [showUpload, setShowUpload] = useState(false)
  const theme = useTheme()

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

  function setProfilePic(emoji: string) {
    let updatedUser = user
    updatedUser.profileEmoji = emoji
    updatedUser.version += 1
    setDataFirebase('users', auth, db, updatedUser)
    getUsersData()
  }

  const profileEmojis = [
    '🧒',
    '👦',
    '🧑',
    '👨',
    '👩‍🦱',
    '🧑‍🦱',
    '👨‍🦱',
    '👩‍🦰',
    '🧑‍🦰',
    '👨‍🦰',
    '👱‍♀️',
    '👱',
    '👱‍♂️',
    '👩‍🦳',
    '🧑‍🦳',
    '👨‍🦳',
    '👩‍🦲',
    '🧑‍🦲',
    '👨‍🦲',
    '🧔‍♀️',
    '🧔',
    '🧔‍♂️',
    '👵',
    '🧓',
    '👴',
    '👳‍♀️',
    '👳',
    '👳‍♂️',
    '🧕',
  ]
  function getProfileEmoji() {
    const people = [
      '🧒',
      '👦',
      '🧑',
      '👨',
      '👩‍🦱',
      '🧑‍🦱',
      '👨‍🦱',
      '👩‍🦰',
      '🧑‍🦰',
      '👨‍🦰',
      '👱‍♀️',
      '👱',
      '👱‍♂️',
      '👩‍🦳',
      '🧑‍🦳',
      '👨‍🦳',
      '👩‍🦲',
      '🧑‍🦲',
      '👨‍🦲',
      '🧔‍♀️',
      '🧔',
      '🧔‍♂️',
      '👵',
      '🧓',
      '👴',
      '👳‍♀️',
      '👳',
      '👳‍♂️',
      '🧕',
    ]
    return people[Math.floor(Math.random() * people.length)]
  }

  return (
    <NormalPageLayout>
      <AnimatePresence>
        {showUpload ? (
          <PopUpPane
            setShowPopup={setShowUpload}
            showPop={showUpload}
            paneTitle="Upload Image"
            opacity={0.7}
            maxWidth={'60%'}
            maxHeight={'80%'}
          >
            <div>
              <EmojiSelectContainer>
                {profileEmojis.map((emoji) => {
                  return (
                    <EmojiItem onClick={() => setProfilePic(emoji)}>
                      {emoji}
                    </EmojiItem>
                  )
                })}
              </EmojiSelectContainer>
              <Divider>or</Divider>
              <UploadPanel />
            </div>
          </PopUpPane>
        ) : null}
      </AnimatePresence>
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
                <SettingSelector
                  style={{ width: 'auto' }}
                  onChange={(e) => {
                    updateTheme(e.target.value)
                    console.log('Changed Theme')
                  }}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </SettingSelector>
              </SettingsRow>

              {/* ------- Favourite Plant -------- */}
              <SettingsRow>
                <h2>Favourite Plant:</h2>
                <SettingSelector
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
                </SettingSelector>
              </SettingsRow>

              {/* ------- Units --------- */}
              <SettingsRow>
                <h2>Units:</h2>
                <SettingSelector
                  style={{ width: 'auto' }}
                  onChange={(e) => {
                    console.log('Changed Units')
                  }}
                >
                  <option value="metric">Metric</option>
                  <option value="imperial">Imperial</option>
                </SettingSelector>
              </SettingsRow>

              {/* ------- Log Out --------- */}
              <SettingsRow isCentered={true}>
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
            <AccountHero
              showUpload={showUpload}
              setShowUpload={setShowUpload}
              user={user}
            />
            <p style={{ textWrap: 'wrap' }}>
              <b>UID:</b> {auth.currentUser?.uid}
            </p>
          </div>
        </PanelGeneric>
      </SettingsWrapper>
    </NormalPageLayout>
  )
}
