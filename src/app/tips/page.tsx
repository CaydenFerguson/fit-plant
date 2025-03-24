'use client'

import React, { useState } from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import { TipsControlPanel } from './style'
import ClickableTile from '@/components/panels/clickablePanel/clickableTile'
import DetailPanel from '@/components/panels/clickablePanel/clickableDetailPanel'
// import DetailPanel from '@/components/panels/quarterPanel/detailPanel'
import PopUpPane from '@/components/popUpPane'
import { useTheme } from '@emotion/react'

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
      image: '/icons/sunshine-plant.jpg',
      tip: '🌞 Let There Be Light! Most plants need at least 6-8 hours of sunlight a day. Place them near windows or in well-lit areas.',
    },
    {
      id: 2,
      image: '/icons/watering-plant.jpg',
      tip: '💧 Water Wisely! Only water when the top inch of soil is dry to avoid overwatering.',
    },
    {
      id: 3,
      image: '/icons/fertilizer-plant.jpg',
      tip: '🌿 Feed the Green! Fertilize every 2-4 weeks during the growing season to boost growth.',
    },
    {
      id: 4,
      image: '/icons/pruning-plant.jpg',
      tip: '✂️ Prune with Purpose! Trim dead leaves and stems to keep plants healthy and full.',
    },
    {
      id: 5,
      image: '/icons/right-pot-plant.jpg',
      tip: '🪴 Right Pot, Right Roots! Use pots with drainage and repot when roots get crowded.',
    },
    {
      id: 6,
      image: '/icons/pest-plant.jpg',
      tip: '🕵️‍♂️ Watch for Pests! Check under leaves and treat with neem oil if needed.',
    },
    {
      id: 7,
      image: '/icons/temperature-plant.jpg',
      tip: '🌡️ Mind the Temps! Keep plants away from heaters, ACs, and cold drafts.',
    },
    {
      id: 8,
      image: '/icons/calendar-plant.jpg',
      tip: '📅 Mark Your Calendar! Track watering, fertilizing, and repotting dates to stay consistent.',
    },
  ]

  // State for the active (clicked) tip.
  const [activeTip, setActiveTip] = useState<PlantTip | null>(null)
  const theme = useTheme()
  return (
    <NormalPageLayout>
      <TipsControlPanel>
        {plantTips.map((tip) => (
          <ClickableTile key={tip.id} onClick={() => setActiveTip(tip)}>
            <div
              style={{
                height: '100%', // container to center image and text vertically
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '400px',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={tip.image}
                  alt={`Plant Tip ${tip.id}`}
                  style={{
                    marginTop: '20px',
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    objectFit: 'contain',
                  }}
                />
              </div>

              <p //The tip label text
                style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: theme.colours.text,
                }}
              >
                Plant Tip {tip.id}
              </p>
            </div>
          </ClickableTile>
        ))}
      </TipsControlPanel>
      {activeTip && (
        <PopUpPane
          setShowPopup={setActiveTip}
          showPopup={activeTip}
          opacity={0.9}
        >
          <DetailPanel data={activeTip} onClose={() => setActiveTip(null)} />
        </PopUpPane>
      )}
    </NormalPageLayout>
  )
}
