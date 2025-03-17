'use client'

import React, { useState, useEffect } from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import { ControlPanel } from './style'
import ClickableQuarterPanel from '@/components/panels/quarterPanel/ClickableQuarterPanel'
import DetailPanel from '@/components/panels/quarterPanel/detailPanel'
import { getUserData, setDataFirebase } from '@/helpers/firebase'
import { db, auth } from '@/config/firebase'

export default function PlantPage() {
  const [plants, setPlants] = useState<any[]>([])
  const [activePlant, setActivePlant] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Function to fetch the plants data from Firebase
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

  useEffect(() => {
    console.log('Fetching plant details')
    fetchPlants()
  }, [])

  function handlePlantClick(plant: any) {
    setActivePlant(plant)
  }

  // Add a new plant tile
  async function addPlant() {
    try {
      const plantData = await getUserData(db, auth, 'userPlants')
      if (plantData) {
        const newPlant = {
          name: 'New Plant',
          vitals: {},
          image: '',
        }
        const updatedPlants = [...(plantData.plants || []), newPlant]
        const newPlantData = {
          ...plantData,
          plants: updatedPlants,
          version: plantData.version ? plantData.version + 1 : 1,
        }
        // update firestore
        await setDataFirebase('userPlants', auth, db, newPlantData)
        setPlants(updatedPlants)
      } else {
        console.error('User plant data not found.')
      }
    } catch (error) {
      console.error('Error adding plant:', error)
    }
  }

  return (
    <NormalPageLayout id="tet">
      <ControlPanel>
        {!loading && (
          <>
            {plants.map((plant, index) => (
              <ClickableQuarterPanel
                key={index}
                onClick={() => handlePlantClick(plant)}
              >
                <div style={{ padding: '10px' }}>
                  <h3>{plant.name || 'Plant Name'}</h3>
                  <p>Colour: {plant.colour}</p>
                </div>
              </ClickableQuarterPanel>
            ))}
            <ClickableQuarterPanel onClick={addPlant}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: '2rem',
                  color: '#fff',
                }}
              >
                +
              </div>
            </ClickableQuarterPanel>
          </>
        )}
      </ControlPanel>

      {activePlant && (
        <DetailPanel data={activePlant} onClose={() => setActivePlant(null)} />
      )}
    </NormalPageLayout>
  )
}
