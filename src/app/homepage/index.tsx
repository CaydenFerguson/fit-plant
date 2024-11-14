import React from 'react'
import NormalPageLayout from '../../components/normalPageLayout'
import {
  ControlPanel,
  DashboardRow,
  NotificationPaneContainer,
  NotificationsContainer,
} from './style'
import QuarterPanel from '@/components/panels/quarterPanel'
import HalfPanel from '@/components/panels/halfPanel'
import Notif from '@/components/notification'

// This is the homepage component,
export default function Homepage() {
  const notifs = [
    {
      name: 'Tomatoes',
      message: 'Pest Detected',
      details: 'Aphids',
      time: '10 minutes ago',
      image: 'https://example.com/images/tomatoes.png',
      colour: '#44C7AF', // Keppel
    },
    {
      name: 'Daisy',
      message: 'Needs Water',
      details: '5ppm',
      time: '2 hours ago',
      image: 'https://example.com/images/daisy.png',
      colour: '#2A7C6D', // Pine Green
    },
    {
      name: 'Beans',
      message: 'Ready for Harvest',
      details: '7 days remaining',
      time: '5 hours ago',
      image: 'https://example.com/images/beans.png',
      colour: '#3EB59F', // Keppel
    },
    {
      name: 'Cactus',
      message: 'Too Much Sunlight',
      details: '12 hours',
      time: '1 day ago',
      image: 'https://example.com/images/cactus.png',
      colour: '#2E8878', // Viridian
    },
    {
      name: 'Sunflower',
      message: 'Low Nutrients',
      details: 'NPK 3-1-2',
      time: '3 days ago',
      image: 'https://example.com/images/sunflower.png',
      colour: '#339684', // Persian Green
    },
    {
      name: 'Basil',
      message: 'Fungal Infection Detected',
      details: 'Powdery mildew',
      time: '5 days ago',
      image: 'https://example.com/images/basil.png',
      colour: '#38A591', // Zomp
    },
    {
      name: 'Rosemary',
      message: 'Dry Soil',
      details: 'Moisture level: 15%',
      time: '1 week ago',
      image: 'https://example.com/images/rosemary.png',
      colour: '#2A7C6D', // Pine Green
    },
    {
      name: 'Lavender',
      message: 'Needs Repotting',
      details: 'Root-bound',
      time: '2 weeks ago',
      image: 'https://example.com/images/lavender.png',
      colour: '#2E8878', // Viridian
    },
  ]

  return (
    <NormalPageLayout>
      <DashboardRow>
        {/* ControlPanels are rows to display panels, must add to one or less */}
        <ControlPanel>
          {/* Notifications */}
          <HalfPanel>
            <NotificationPaneContainer>
              <h2>Notifications</h2>
              <NotificationsContainer>
                {notifs.map((notif, index) => (
                  <Notif notif={notif} even={index % 2 === 0} />
                ))}
              </NotificationsContainer>
            </NotificationPaneContainer>
          </HalfPanel>
          {/* Pie graphs */}
          <HalfPanel invisible={true}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <div
                style={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'white',
                }}
              />
              <div
                style={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'white',
                }}
              />
              <div
                style={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'white',
                }}
              />
            </div>
          </HalfPanel>
        </ControlPanel>

        <ControlPanel>
          <QuarterPanel>1</QuarterPanel>
          <QuarterPanel>2</QuarterPanel>
          <HalfPanel>3</HalfPanel>
        </ControlPanel>

        <ControlPanel>
          <QuarterPanel>4</QuarterPanel>
          <QuarterPanel>5</QuarterPanel>
          <HalfPanel>6</HalfPanel>
        </ControlPanel>

        <ControlPanel>
          <QuarterPanel />
          <QuarterPanel />
          <HalfPanel />
        </ControlPanel>
      </DashboardRow>
    </NormalPageLayout>
  )
}
