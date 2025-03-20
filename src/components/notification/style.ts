'use client'

import styled from '@emotion/styled'

export const MainContainer = styled.div(({ isEven, theme }: any) => {
  return {
    height: 'auto',
    padding: '5px 20px 5px 5px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: isEven
      ? theme.colours.notificationDark
      : theme.colours.notificationLight,
  }
})

export const PlantPic = styled.div(() => {
  return {
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    backgroundColor: 'white',
    flexShrink: '0',
  }
})

export const Details = styled.div(() => {
  return {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})
