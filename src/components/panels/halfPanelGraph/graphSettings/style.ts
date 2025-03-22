'use client'

import styled from '@emotion/styled'

export const ReadingList = styled.ul(() => {
  return {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
})

export const SettingItem = styled.li(({ theme, isActive = false }: any) => {
  return {
    padding: '5px 20px',
    border: '1px solid white',
    borderRadius: '30px',
    minWidth: '80px',
    textAlign: 'center',
    fontWeight: isActive ? '700' : '',
    backgroundColor: isActive ? theme.colours.activeNav : '',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: isActive
        ? theme.colours.activeNav
        : theme.colours.notificationDark,
    },
  }
})

export const SettingWrapper = styled.div(({ isMobile }: any) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: isMobile ? '10px' : '30px',
    marginRight: 'auto',
  }
})

export const SettingsHeading = styled.h3(() => {
  return {
    // paddingBottom: '20px',
  }
})

export const DateList = styled.ul(() => {
  return {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
})

export const CloseButton = styled.button(() => {
  return {
    position: 'absolute',
    top: '0px',
    right: '0px',
    // padding:
    scale: '1.25',
    padding: '10px 5px',
    // width: '20px',
    // height: '20px',
    borderRadius: '50%',
    opacity: 0.75,
    margin: '5px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    '&:hover': {
      opacity: 1,
    },
  }
})
