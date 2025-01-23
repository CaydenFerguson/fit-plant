'use client'

import React, { useState } from 'react'
import { Container, SettingsButton } from './style'
import LineGraph from '@/components/lineGraph'

export default function HalfPanelGraph({
  invisible = false,
  children,
  plants,
  plantNum = 0,
}: any) {
  const [activeReading, setActiveReading] = useState(0)
  const types = ['moisture', 'e', 'npk', 'pH', 'temperature']

  function cycleActiveReading() {
    setActiveReading((activeReading + 1) % 4)
  }

  return (
    <Container invisible={invisible}>
      <SettingsButton onClick={() => cycleActiveReading()}>⚙️</SettingsButton>
      {plants && (
        <LineGraph
          // TEMPORARY (just using first plant)
          xValues={plants[0][types[activeReading]].readings.time}
          yValues={plants[0][types[activeReading]].readings.reading}
          xLabel={'TIME'}
          yLabel={types[activeReading].toUpperCase()}
          title={plants[0][types[activeReading]].title}
        />
      )}
      {children}
    </Container>
  )
}
