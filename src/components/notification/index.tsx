import React from 'react'
import { Details, MainContainer, PlantPic } from './style'

export default function Notif({ notif, even, isMobile }: any) {
  if (!isMobile) {
    return (
      <MainContainer isEven={even}>
        <PlantPic />
        {/* Notification Details */}
        <Details>
          <div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <h3 style={{ color: '#44C7AF' }}>{notif.name}</h3>
              <p>{notif.time}</p>
            </div>
            <p>{notif.message}</p>
          </div>
          <div>{notif.details}</div>
        </Details>
      </MainContainer>
    )
  } else {
    return (
      <MainContainer isEven={even}>
        <PlantPic />
        {/* Notification Details */}
        <Details>
          <div>
            <h3 style={{ color: '#44C7AF' }}>{notif.name}</h3>
            <p>{notif.time}</p>
            <p>{notif.message}</p>
          </div>
          <div>{notif.details}</div>
        </Details>
      </MainContainer>
    )
  }
}
