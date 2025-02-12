'use client'

import React from 'react'
import styled from '@emotion/styled'

const VitalWrapper = styled.div`
  background-color: #444;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  color: #fff;
`

const VitalTitle = styled.h3`
  margin: 0 0 8px 0;
`

const VitalInfo = styled.p`
  margin: 4px 0;
`

type VitalProps = {
  vital: {
    unit: string
    readings: {
      time: number[]
      reading: number[]
    }
    version: number
    title: string
  }
}

const VitalDetail: React.FC<VitalProps> = ({ vital }) => {
  const { unit, readings, version, title } = vital

  // Get the most recent reading from the arrays
  const numReadings = readings.reading.length
  const mostRecentTime = readings.time[numReadings - 1]
  const mostRecentReading = readings.reading[numReadings - 1]

  return (
    <VitalWrapper>
      <VitalTitle>{title}</VitalTitle>
      <VitalInfo>
        <strong>Version:</strong> {version}
      </VitalInfo>
      <VitalInfo>
        <strong>Most Recent Time:</strong> {mostRecentTime}
      </VitalInfo>
      <VitalInfo>
        <strong>Most Recent Reading:</strong> {mostRecentReading} {unit}
      </VitalInfo>
    </VitalWrapper>
  )
}

export default VitalDetail
