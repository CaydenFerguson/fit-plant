'use client'

import React, { useState, useEffect } from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import { ControlPanel } from './style'
import ClickableQuarterPanel from '@/components/panels/quarterPanel/ClickableQuarterPanel'
import DetailPanel from '@/components/panels/quarterPanel/detailPanel'
import { getUserData, setDataFirebase } from '@/helpers/firebase'
import { db, auth } from '@/config/firebase'
import HalfPanelGraph from '@/components/panels/halfPanelGraph'
import PopUpPane from '@/components/popUpPane'

export default function PlantPage() {
  const [userPlants, setUserPlants] = useState<any>()
  const [activePlant, setActivePlant] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [activeIndex, setActiveIndex] = useState(-1)

  // Fetch plants from Firebase
  async function fetchPlants() {
    try {
      const plantData = await getUserData(db, auth, 'userPlants')
      if (plantData && plantData?.plants) {
        setUserPlants(plantData)
      } else {
        console.log('No plants found for this user.')
      }
    } catch (error) {
      console.error('Error fetching plant data:', error)
    } finally {
      setLoading(false)
    }
  }

  function getRandomPlantEmoji() {
    const emojis = [
      '🌵',
      '🌱',
      '🌿',
      '☘️',
      '🍀',
      '🎍',
      '🪴',
      '🎋',
      '🍃',
      '🍂',
      '🍁',
      '🍄',
      '🍄‍🟫',
      '🌾',
      '💐',
      '🌷',
      '🪷',
      '🌹',
      '🥀',
      '🌺',
      '🌸',
      '🪻',
      '🌼',
      '🌻',
    ]
    return emojis[Math.floor(Math.random() * emojis.length)]
  }
  useEffect(() => {
    console.log('Fetching plant details')
    fetchPlants()
  }, [])

  function setNewPlantEmoji(plantIndex: number, emoji: string) {
    console.log('tring to set', plantIndex, emoji)
    let updatedUserPlants = userPlants
    updatedUserPlants.plants[plantIndex].image = emoji
    setDataFirebase('userPlants', auth, db, updatedUserPlants)
  }

  function handlePlantClick(plant: any) {
    setActivePlant(plant)
  }
  console.log('check user plants:', userPlants)
  return (
    <NormalPageLayout>
      {/* First ControlPanel: Plant Tiles */}
      <ControlPanel>
        {!loading && (
          <>
            {userPlants.plants.map((plant: any, index: number) => (
              <ClickableQuarterPanel
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  handlePlantClick(plant)
                }}
              >
                <div
                  style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '20px',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      border: '4px solid white',
                      borderRadius: '50%',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '3rem',
                    }}
                  >
                    {plant?.image ? plant.image : '🌱'}
                  </div>
                  <h2>{plant.name || 'Plant'}</h2>
                </div>
              </ClickableQuarterPanel>
            ))}
          </>
        )}
      </ControlPanel>

      {activePlant && (
        <PopUpPane
          paneTitle={activePlant.name}
          setShowPopup={setActivePlant}
          showPopUp={activePlant}
          opacity={1}
          maxWidth="95%"
          width="95%"
          maxHeight="95%"
          height="95%"
          maxMobileWidth="100%"
        >
          <DetailPanel
            data={activePlant}
            onClose={() => setActivePlant(null)}
            setNewPlantEmoji={setNewPlantEmoji}
            index={activeIndex}
          />
        </PopUpPane>
      )}
    </NormalPageLayout>
  )
}
