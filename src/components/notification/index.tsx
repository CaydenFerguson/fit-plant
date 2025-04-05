import React, { useState } from 'react'
import { CloseButton, Details, MainContainer, PlantPic } from './style'
import LoadingSpinner from '../loadingSpinner'

export default function Notif({
  notif,
  even,
  isMobile,
  onClick,
  index,
  deleteNotif,
}: any) {
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

    const [showDelete, setShowDelete] = useState(false)
    const [loading, setLoading] = useState(false)
    return (
      <MainContainer
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
        isEven={even}
        onClick={onClick}
      >
        <PlantPic colour={notif.colour}>🔔</PlantPic>
        {/* Notification Details */}
        {loading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              gap: '5px',
            }}
          >
            <LoadingSpinner margin={0} />
            Deleting...
          </div>
        ) : (
          <Details>
            <div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <h3 style={{ color: '#44C7AF' }}>{notif.name}</h3>
                <p>{readableDate}</p>
              </div>
              <p>{notif.message}</p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {notif.details}

              {showDelete && (
                <CloseButton
                  style={
                    {
                      // backgroundColor: 'red',
                      // color: 'white',
                      // borderRadius: '5px',
                      // padding: '5px',
                    }
                  }
                  onClick={async (e) => {
                    e.stopPropagation()
                    setLoading(true)
                    await deleteNotif(index)
                    setLoading(false)
                  }}
                >
                  🗑️
                </CloseButton>
              )}
            </div>
            {/* <div style={{ display: 'flex', gap: '5px' }}> */}
            {/* </div> */}
          </Details>
        )}
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
