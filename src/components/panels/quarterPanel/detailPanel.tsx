'use client'

import React from 'react'
import styled from '@emotion/styled'
import VitalDetail from './vitalDetail'

const DetailPanelWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 10%;
  right: 10%;
  background-color: #333;
  color: #fff;
  padding: 20px;
  border: 2px solid #fff;
  z-index: 1000;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: scroll;
`

const ButtonClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background: #555;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #777;
  }
`

const Image = styled.img`
  max-width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
`

type DetailPanelProps = {
  data: {
    name: string
    image?: string
    colour?: string
    vitals?: Record<string, any>
  }
  onClose: () => void
}

export default function DetailPanel({ data, onClose }: DetailPanelProps) {
  return (
    <DetailPanelWrapper>
      <ButtonClose onClick={onClose}>X</ButtonClose>
      <h2>{data.name}</h2>
      {data.colour && <p>Colour: {data.colour}</p>}
      {data.vitals && (
        <>
          <h3>Vitals:</h3>
          {Object.entries(data.vitals).map(([key, vitalValue]) => (
            // Pass the vital data
            <VitalDetail key={key} vital={vitalValue} />
          ))}
        </>
      )}
    </DetailPanelWrapper>
  )
}
