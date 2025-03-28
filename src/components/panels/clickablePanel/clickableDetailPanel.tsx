'use client'

import React from 'react'
import { Overlay, Panel, CloseButton } from './clickableDetailPanel.style'
import { PlantTip } from '@/app/tips/page'

interface ClickableDetailPanelProps {
  data: PlantTip
  onClose: () => void
}

export default function ClickableDetailPanel({
  //plant tip popup
  data,
  onClose,
}: ClickableDetailPanelProps) {
  return (
    <Overlay onClick={onClose}>
      <Panel onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {/*
         */}
        <img
          src={data.image}
          alt={`Plant Tip ${data.id}`}
          style={{
            width: '100%',
            maxWidth: '300px',
            height: 'auto',
            display: 'block',
            margin: '0 auto 20px',
            borderRadius: '10px',
            objectFit: 'contain',
          }}
        />

        {/* Increases text size */}
        <h2
          style={{
            fontSize: '2rem',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          Plant Tip
        </h2>
        <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>{data.tip}</p>
      </Panel>
    </Overlay>
  )
}
