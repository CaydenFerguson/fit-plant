import React from 'react'

export default function ExpandedNotification({ expandedNotif, notifs }: any) {
  const notif = notifs[expandedNotif]

  if (notif) {
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
      <div>
        {expandedNotif !== null ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h4>{notif.message}</h4>
            <p>{readableDate}</p>
            <div style={{ height: '20px' }} />
            <p>{notif.details}</p>

            <div style={{ height: '20px' }} />
            {notif?.extra_details && (
              <ul>
                {notif?.extra_details?.map((detail: string, index: number) => {
                  return <li key={index}>{detail}</li>
                })}
              </ul>
            )}
          </div>
        ) : (
          <>FAIL</>
        )}
      </div>
    )
  } else {
    return <></>
  }
}
