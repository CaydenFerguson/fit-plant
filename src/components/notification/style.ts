'use client'

import styled from '@emotion/styled'

export const MainContainer = styled.div(({ isEven, theme }: any) => {
  return {
    height: 'auto',
    padding: '5px 20px 5px 5px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    cursor: 'pointer',
    backgroundColor: isEven
      ? theme.colours.notificationDark
      : theme.colours.notificationLight,
    transition: 'scale 0.2s ease, box-shadow 0.5s ease',

    '&:hover': {
      scale: '0.985',
      // zIndex: '1000',
    },
  }
})

export const PlantPic = styled.div(
  ({ colour = 'white' }: { colour?: string }) => {
    return {
      borderRadius: '50%',
      width: '35px',
      height: '35px',
      border: `2px solid ${colour}`,
      // borderWidth: '2px',
      // borderStyle: 'solid',
      // backgroundColor: 'red',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: '0',
    }
  }
)

export const Details = styled.div(() => {
  return {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export const CloseButton = styled.div(() => {
  return {
    padding: '5px',
    scale: '1.2',
    opacity: '0.3',
    '&:hover': {
      scale: '1.3',
      cursor: 'pointer',
      opacity: '1',
      transition: 'scale 0.1s ease',
    },
  }
})
