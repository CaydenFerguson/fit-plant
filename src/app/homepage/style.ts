'use client'

import styled from '@emotion/styled'

export const ControlPanel = styled.div({
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
})

export const DashboardRow = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  }
})

export const NotificationPaneContainer = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
})

export const NotificationsContainer = styled.div(() => {
  return {
    width: '100%',
    borderRadius: '20px 0px 0px 20px',
    marginTop: '5px',
    overflowY: 'auto',
    paddingRight: '5px',
  }
})

export const VitalsContainer = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }
})
