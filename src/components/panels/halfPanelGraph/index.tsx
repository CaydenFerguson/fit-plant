'use client'

import React, { useState } from 'react'
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
  const { isMobile } = useGlobalContext()
  const [activeReading, setActiveReading] = useState(0)
  const [activeDate, setActiveDate] = useState(-1)
  const [showSettings, setShowSettings] = useState(false)
  const types = ['moisture', 'e', 'npk', 'pH', 'temperature']
  const typesCapitalized = ['Moisture', 'E', 'NPK', 'pH', 'Temperature']

  function cycleActiveReading() {
    setActiveReading((activeReading + 1) % 4)
  }

  function toggleSettings() {
    setShowSettings(!showSettings)
  }

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
              activeDate={activeDate}
              setActiveDate={setActiveDate}
              setShowSettings={setShowSettings}
              showSettings={showSettings}
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
          yValues={
            plants.map((plant: any) => ({
              readings: plant.vitals[types[activeReading]]?.readings?.reading,
              name: plant.name,
            }))
            // plants[plantNum].vitals[types[activeReading]].readings.reading
          }
          xLabel={'TIME'}
          yLabel={types[activeReading].toUpperCase()}
          title={plants[plantNum].vitals[types[activeReading]].title}
        />
      )}
      {children}
    </Container2>
  )
}
