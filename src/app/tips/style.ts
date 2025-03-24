'use client'

import styled from '@emotion/styled'
import { device } from '@/app/theme'

export const TipsControlPanel = styled.div(() => {
  return {
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // gap: '20px',
    // width: `100%`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    gap: '20px',
    width: '100%',
    // border: '5px solid white',

    // display: `grid`,
    // gridTemplateColumns: `1fr`,
    // gap: '20px',
    // padding: '20px',
    // [device.sm]: {
    //   gridTemplateColumns: `repeat(2, 1fr)`,
    // },
    // [device.md]: {
    //   gridTemplateColumns: `repeat(3, 1fr)`,
    // },
    // [device.lg]: {
    //   gridTemplateColumns: `repeat(4, 1fr)`,
    // },
  }
})
