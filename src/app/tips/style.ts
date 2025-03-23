'use client'

import styled from '@emotion/styled'
import { device } from '@/app/theme'

export const TipsControlPanel = styled.div(() => {
  return {
    width: `100%`,
    display: `grid`,
    gridTemplateColumns: `1fr`,
    gap: '20px',
    padding: '20px',

    [device.sm]: {
      gridTemplateColumns: `repeat(2, 1fr)`,
    },

    [device.md]: {
      gridTemplateColumns: `repeat(3, 1fr)`,
    },

    [device.lg]: {
      gridTemplateColumns: `repeat(4, 1fr)`,
    },
  }
})
