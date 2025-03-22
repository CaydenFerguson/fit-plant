'use client'

import React, { useEffect, useState } from 'react'
import { Container, Container2, SettingsButton } from './style'
import LineGraph from '@/components/lineGraph'
import { useGlobalContext } from '@/app/context/GlobalContext'
import GraphSettingsPanel from './graphSettings'
import { AnimatePresence, motion } from 'motion/react'

export default function HalfPanelGraph({
  invisible = false,
  children,
  plants,
  plantNum = 0,
}: any) {
  console.log('Look:', plants)

  const types = ['moisture', 'e', 'npk', 'pH', 'temperature']
  const typesCapitalized = ['Moisture', 'E', 'NPK', 'pH', 'Temperature']

  const { isMobile } = useGlobalContext()
  const [activeReading, setActiveReading] = useState(0)
  const [activeDates, setActiveDates] = useState<null | number[]>(null)
  const [numDates, setNumDates] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [shownData, setShownData] = useState(
    plants.map((plant: any) => ({
      data: plant.vitals[types[0]]?.readings[0]?.data,
      name: plant.name,
    }))
  )

  useEffect(() => {
    console.log('Date Indices:', activeDates)
  }, [activeDates])
  useEffect(() => {
    console.log('Active Reading:', activeReading)
  }, [activeReading])

  // This useEffect assembles the right data based on the users settings.
  useEffect(() => {
    // Making sure the user has selected an active reading and that the date is not null
    if (activeReading >= 0 && activeDates != null) {
      console.log('run', activeReading, activeDates)
      setShownData(
        plants.map((plant: any) => {
          // This will hold the accumulated data (from all preffered dates) per plant
          let data: any[] = []
          activeDates.forEach((dateIndex: any) => {
            console.log(
              'length verify',
              plant.vitals[types[activeReading]]?.readings.length,
              dateIndex
            )
            if (
              plant.vitals[types[activeReading]]?.readings.length - 1 >=
              dateIndex
            ) {
              console.log(
                'check me:',
                plant.vitals[types[activeReading]]?.readings[dateIndex].data
              )
              data = [
                ...data,
                ...plant.vitals[types[activeReading]]?.readings[dateIndex].data,
              ]
            }
          })

          const assembledData = {
            data: data,
            name: plant.name,
          }

          console.log('All Data:', assembledData)
          return assembledData
        })
      )
    }
  }, [activeReading, activeDates])

  function cycleActiveReading() {
    setActiveReading((activeReading + 1) % 4)
  }

  function toggleSettings() {
    setShowSettings(!showSettings)
  }

  if (shownData) {
    return (
      <Container2 invisible={invisible} isMobile={isMobile}>
        <SettingsButton onClick={() => toggleSettings()}>⚙️</SettingsButton>
        {/* <SettingsButton onClick={() => cycleActiveReading()}>
        ⚙️ {typesCapitalized[activeReading]}
      </SettingsButton> */}
        <AnimatePresence>
          {showSettings ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ zIndex: 1000 }}
            >
              <GraphSettingsPanel
                activeReading={activeReading}
                setActiveReading={setActiveReading}
                activeDates={activeDates}
                dates={plants}
                setActiveDates={setActiveDates}
                setShowSettings={setShowSettings}
                showSettings={showSettings}
                plantData={plants}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {plants && (
          <LineGraph
            xValues={
              plants[plantNum].vitals[types[activeReading]]?.readings?.time
            }
            // xValues={plants.map(
            //   (plant: any) => plant.vitals[types[activeReading]].readings.time
            // )}
            yValues={shownData}
            xLabel={'TIME'}
            yLabel={types[activeReading].toUpperCase()}
            title={plants[plantNum].vitals[types[activeReading]].title}
          />
        )}
        {children}
      </Container2>
    )
  }
}
