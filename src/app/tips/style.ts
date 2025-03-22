'use client'

import styled from '@emotion/styled'
import { device } from '@/app/theme'

export const TipsControlPanel = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;

  ${device.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${device.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${device.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`
