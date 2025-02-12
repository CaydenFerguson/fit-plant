'use client'

import React, { useState } from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import { TipsControlPanel } from './style'
import ClickableTile from '@/components/panels/clickablePanel/clickableTile'
import DetailPanel from '@/components/panels/clickablePanel/clickableDetailPanel'

// Define a TypeScript interface for a plant tip.
export interface PlantTip {
  id: number
  image: string
  tip: string
}

export default function PlantTipsPage() {
  // Fixed array of plant tips.
  const plantTips: PlantTip[] = [
    {
      id: 1,
      image: '/icons/tips.jpg',
      tip: 'Water your plants in the morning for best results.',
    },
    {
      id: 2,
      image: '/icons/tips.jpg',
      tip: 'Ensure your plants receive at least 6 hours of sunlight daily.',
    },
    {
      id: 3,
      image: '/icons/tips.jpg',
      tip: 'Fertilize your plants every 2-3 weeks during the growing season.',
    },
    {
      id: 4,
      image: '/icons/tips.jpg',
      tip: 'Prune your plants regularly to encourage healthy growth.',
    },
    {
      id: 5,
      image: '/icons/tips.jpg',
      tip: 'Water your plants in the morning for best results.',
    },
    {
      id: 6,
      image: '/icons/tips.jpg',
      tip: 'Ensure your plants receive at least 6 hours of sunlight daily.',
    },
    {
      id: 7,
      image: '/icons/tips.jpg',
      tip: 'Fertilize your plants every 2-3 weeks during the growing season.',
    },
    {
      id: 8,
      image: '/icons/tips.jpg',
      tip: 'Prune your plants regularly to encourage healthy growth.',
    },
  ]

  // State for the active (clicked) tip.
  const [activeTip, setActiveTip] = useState<PlantTip | null>(null)

  return (
    <NormalPageLayout>
      <TipsControlPanel>
        {plantTips.map((tip) => (
          <ClickableTile key={tip.id} onClick={() => setActiveTip(tip)}>
            <img
              src={tip.image}
              alt={`Plant Tip ${tip.id}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'inherit',
              }}
            />
          </ClickableTile>
        ))}
      </TipsControlPanel>

      {activeTip && (
        <DetailPanel data={activeTip} onClose={() => setActiveTip(null)} />
      )}
    </NormalPageLayout>
  )
}
