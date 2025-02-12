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
      <SettingsButton onClick={() => cycleActiveReading()}>
        ⚙️ {plants[plantNum].name}
      </SettingsButton>
      {plants && (
        <LineGraph
          // TEMPORARY (just using first plant)
          xValues={plants[plantNum].vitals[types[activeReading]].readings.time}
          yValues={
            plants[plantNum].vitals[types[activeReading]].readings.reading
          }
          xLabel={'TIME'}
          yLabel={types[activeReading].toUpperCase()}
          title={plants[plantNum].vitals[types[activeReading]].title}
        />
      )}
      {children}
    </Container>
  )
}
