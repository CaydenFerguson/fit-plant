'use client'

import React, { useState } from 'react'
import { Container, Container2, SettingsButton } from './style'
import LineGraph from '@/components/lineGraph'

export default function HalfPanelGraph({
  invisible = false,
  children,
  plants,
  plantNum = 0,
}: any) {
  console.log('Look:', plants)
  const [activeReading, setActiveReading] = useState(0)
  const types = ['moisture', 'e', 'npk', 'pH', 'temperature']
  const typesCapitalized = ['Moisture', 'E', 'NPK', 'pH', 'Temperature']

  function cycleActiveReading() {
    setActiveReading((activeReading + 1) % 4)
  }

  return (
    <Container2 invisible={invisible}>
      <SettingsButton onClick={() => cycleActiveReading()}>
        ⚙️ {typesCapitalized[activeReading]}
      </SettingsButton>
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
