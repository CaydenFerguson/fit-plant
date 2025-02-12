import React from 'react'
import styled from '@emotion/styled'

// A simple styled card for plant details
const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  width: 300px;
`

const PlantName = styled.h3`
  margin: 0 0 0.5rem 0;
`

const VitalText = styled.p`
  margin: 0.25rem 0;
  font-size: 1rem;
`

interface PlantDetailsCardProps {
  plant: any
}

export default function PlantDetailsCard({ plant }: PlantDetailsCardProps) {
  return (
    <Card>
      <PlantName>{plant.name}</PlantName>
      {plant.vitals && (
        <>
          <VitalText>Moisture: {plant.vitals.moisture.current}</VitalText>
          <VitalText>Temperature: {plant.vitals.temperature.current}</VitalText>
          {/* Add more details as needed */}
        </>
      )}
    </Card>
  )
}
