'use client'

import React, { useState } from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import { ControlPanel } from './style'
import ClickableQuarterPanel from '@/components/panels/quarterPanel/ClickableQuarterPanel'
import DetailPanel from '@/components/panels/quarterPanel/detailPanel'

export default function Plantpage() {
  // State to hold the list of tile labels.
  // Initially, we have a few "Plant Name" tiles.
  const [tiles, setTiles] = useState<string[]>([
    'Plant Name',
    'Plant Name',
    'Plant Name',
    'Plant Name',
    'Plant Name',
    'Plant Name',
    'Plant Name',
  ])

  // State for showing the detail panel for a tile.
  const [activeTile, setActiveTile] = useState<string | null>(null)

  // for when a tile (other than the plus tile) is clicked.
  const handleTileClick = (tile: string) => {
    setActiveTile(tile)
  }

  //Adds a new tile to the grid
  const addTile = () => {
    setTiles([...tiles, 'Plant Name'])
  }

  return (
    <NormalPageLayout>
      <ControlPanel>
        {/* Add existing plant tiles */}
        {tiles.map((tile, index) => (
          <ClickableQuarterPanel
            key={index}
            onClick={() => handleTileClick(tile)}
          >
            {tile}
          </ClickableQuarterPanel>
        ))}

        <ClickableQuarterPanel onClick={addTile}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: '2rem',
              color: '#fff',
            }}
          >
            +
          </div>
        </ClickableQuarterPanel>
      </ControlPanel>

      {activeTile && (
        <DetailPanel data={activeTile} onClose={() => setActiveTile(null)} />
      )}
    </NormalPageLayout>
  )
}
