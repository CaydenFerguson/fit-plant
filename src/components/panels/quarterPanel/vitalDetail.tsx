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
    title: string
    unit: string
    version: number
    readings: Array<{
      data: Array<{
        value: [string, number]
      }>
    }>
  }
}

const VitalDetail: React.FC<VitalProps> = ({ vital }) => {
  const { title, unit, version, readings } = vital

  // Safely combine all reading data arrays from each readings element.
  const allData = (readings || []).reduce(
    (acc, r) => {
      return acc.concat(r.data || [])
    },
    [] as Array<{ value: [string, number] }>
  )

  // Get the latest reading using standard indexing.
  const latest = allData.length > 0 ? allData[allData.length - 1] : undefined

  const latestTime = latest?.value?.[0]
  const latestValue = latest?.value?.[1]

  return (
    <VitalWrapper>
      <VitalTitle>{title}</VitalTitle>
      <VitalInfo>
        <strong>Version:</strong> {version}
      </VitalInfo>
      <VitalInfo>
        <strong>Most Recent Time:</strong>{' '}
        {latestTime ? new Date(latestTime).toLocaleString() : 'N/A'}
      </VitalInfo>
      <VitalInfo>
        <strong>Most Recent Reading:</strong>{' '}
        {latestValue !== undefined ? `${latestValue} ${unit}` : 'N/A'}
      </VitalInfo>
    </VitalWrapper>
  )
}

export default VitalDetail
