import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import NavigationDesktop from '../components/desktopNav'
import TopBar from '@/components/topBar'

export const metadata: Metadata = {
  title: 'Fit Plants',
  description: 'Monitor your plants!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div
          id="test"
          style={{
            display: 'flex',
            flexDirection: 'row',
            // width: '100vw',
            height: 'auto',
            overflow: 'visible',
          }}
        >
          <NavigationDesktop />
          <div style={{ flex: 1 }}>
            {/* <TopBar /> */}
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
