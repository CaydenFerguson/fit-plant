'use client'

import theme from '@/app/theme'
import styled from '@emotion/styled'

export const SettingsContainer = styled.div(() => {
  return {
    gap: '15px',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
})
export const SettingsRow = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: '15px',
  }
})
