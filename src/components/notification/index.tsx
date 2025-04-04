import React from 'react'
import { Details, MainContainer, PlantPic } from './style'

export default function Notif({ notif, even, isMobile, onClick }: any) {
  if (!isMobile) {
    const date = new Date(notif.time)
    const readableDate = date.toLocaleString('en-US', {
      weekday: 'long', // e.g., "Wednesday"
      // year: 'numeric',
      month: 'long', // e.g., "April"
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    return (
      <MainContainer isEven={even} onClick={onClick}>
        <PlantPic colour={notif.colour}>🔔</PlantPic>
        {/* Notification Details */}
        <Details>
          <div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <h3 style={{ color: '#44C7AF' }}>{notif.name}</h3>
              <p>{readableDate}</p>
            </div>
            <p>{notif.message}</p>
          </div>
          <div>{notif.details}</div>
        </Details>
      </MainContainer>
    )
  } else {
    const date = new Date(notif.time)
    const readableDate = date.toLocaleString('en-US', {
      weekday: 'long', // e.g., "Wednesday"
      year: 'numeric',
      month: 'long', // e.g., "April"
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    return (
      <MainContainer isEven={even} onClick={onClick}>
        <PlantPic />
        {/* Notification Details */}
        <Details>
          <div>
            <h3 style={{ color: '#44C7AF' }}>{notif.name}</h3>
            <p>{readableDate}</p>
            <p>{notif.message}</p>
          </div>
          <div>{notif.details}</div>
        </Details>
      </MainContainer>
    )
  }
}
