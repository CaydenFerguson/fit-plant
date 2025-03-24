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
  const [plants, setPlants] = useState<any[]>([])
  const [activePlant, setActivePlant] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch plants from Firebase
  async function fetchPlants() {
    try {
      const plantData = await getUserData(db, auth, 'userPlants')
      if (plantData && plantData.plants) {
        setPlants(plantData.plants)
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

  function handlePlantClick(plant: any) {
    setActivePlant(plant)
  }

  return (
    <NormalPageLayout id="tet">
      {/* First ControlPanel: Plant Tiles */}
      <ControlPanel>
        {!loading && (
          <>
            {plants.map((plant, index) => (
              <ClickableQuarterPanel
                key={index}
                onClick={() => handlePlantClick(plant)}
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
                    {getRandomPlantEmoji()}
                  </div>
                  <h2>{plant.name || 'Plant Name'}</h2>
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
          />
        </PopUpPane>
      )}
    </NormalPageLayout>
  )
}
