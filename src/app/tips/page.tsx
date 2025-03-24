'use client'

import React, { useState } from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import { TipsControlPanel } from './style'
import ClickableTile from '@/components/panels/clickablePanel/clickableTile'
import DetailPanel from '@/components/panels/clickablePanel/clickableDetailPanel'
// import DetailPanel from '@/components/panels/quarterPanel/detailPanel'
import PopUpPane from '@/components/popUpPane'
import { useTheme } from '@emotion/react'
import { useGlobalContext } from '../context/GlobalContext'

// Define a TypeScript interface for a plant tip.
export interface PlantTip {
  id: number
  image: string
  tip: string
  emojiCombo: string
}

export default function PlantTipsPage() {
  // Fixed array of plant tips.
  const plantTips: PlantTip[] = [
    {
      id: 1,
      image: '/icons/sunshine-plant.jpg',
      tip: '🌞 Let There Be Light! Most plants need at least 6-8 hours of sunlight a day. Place them near windows or in well-lit areas.',
      emojiCombo: '🌞🪟',
    },
    {
      id: 2,
      image: '/icons/watering-plant.jpg',
      tip: '💧 Water Wisely! Only water when the top inch of soil is dry to avoid overwatering.',
      emojiCombo: '💧🌱',
    },
    {
      id: 3,
      image: '/icons/fertilizer-plant.jpg',
      tip: '🌿 Feed the Green! Fertilize every 2-4 weeks during the growing season to boost growth.',
      emojiCombo: '🧪🌿',
    },
    {
      id: 4,
      image: '/icons/pruning-plant.jpg',
      tip: '✂️ Prune with Purpose! Trim dead leaves and stems to keep plants healthy and full.',
      emojiCombo: '✂️🪴',
    },
    {
      id: 5,
      image: '/icons/right-pot-plant.jpg',
      tip: '🪴 Right Pot, Right Roots! Use pots with drainage and repot when roots get crowded.',
      emojiCombo: '🪴🌱',
    },
    {
      id: 6,
      image: '/icons/pest-plant.jpg',
      tip: '🕵️‍♂️ Watch for Pests! Check under leaves and treat with neem oil if needed.',
      emojiCombo: '🐛🔍',
    },
    {
      id: 7,
      image: '/icons/temperature-plant.jpg',
      tip: '🌡️ Mind the Temps! Keep plants away from heaters, ACs, and cold drafts.',
      emojiCombo: '🌡️🧊',
    },
    {
      id: 8,
      image: '/icons/calendar-plant.jpg',
      tip: '📅 Mark Your Calendar! Track watering, fertilizing, and repotting dates to stay consistent.',
      emojiCombo: '📅✅',
    },
  ]

  // State for the active (clicked) tip.
  const [activeTip, setActiveTip] = useState<PlantTip | null>(null)
  const theme = useTheme()
  const { isMobile } = useGlobalContext()
  return (
    <NormalPageLayout>
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '20px',
          width: '100%',
          border: '1px solid white',
        }}
      >
        <div
          style={{
            flexBasis: '200px',
            minWidth: '250px',
            flex: '1 1 200px',
            maxWidth: isMobile ? '100%' : '500px',
            // width: '200px',
            height: '100px',
            border: '1px solid red',
          }}
        >
          item2
        </div>
        <div
          style={{
            flexBasis: '200px',
            minWidth: '250px',
            flex: '1 1 200px',
            maxWidth: isMobile ? '100%' : '500px',
            // width: '200px',
            height: '100px',
            border: '1px solid red',
          }}
        >
          item1
        </div>
        <div
          style={{
            flexBasis: '200px',
            minWidth: '250px',
            flex: '1 1 200px',
            maxWidth: isMobile ? '100%' : '500px',
            // width: '200px',
            height: '100px',
            border: '1px solid red',
          }}
        >
          item3
        </div>
        <div
          style={{
            flexBasis: '200px',
            minWidth: '250px',
            flex: '1 1 200px',
            maxWidth: isMobile ? '100%' : '500px',
            // width: '200px',
            height: '100px',
            border: '1px solid red',
          }}
        >
          item4
        </div>
        <div
          style={{
            flexBasis: '200px',
            minWidth: '250px',
            flex: '1 1 200px',
            maxWidth: isMobile ? '100%' : '500px',
            // width: '200px',
            height: '100px',
            border: '1px solid red',
          }}
        >
          item5
        </div>
      </div> */}
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
                gap: '30px',
                padding: '20px',
              }}
            >
              <div
                style={{
                  width: '75%',
                  height: '75%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginBottom: '10px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={tip.image}
                  alt={`Plant Tip ${tip.id}`}
                  style={{
                    marginTop: '20px',
                    borderRadius: '20px',
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
          opacity={0.97}
        >
          <DetailPanel data={activeTip} onClose={() => setActiveTip(null)} />
        </PopUpPane>
      )}
    </NormalPageLayout>
  )
}
