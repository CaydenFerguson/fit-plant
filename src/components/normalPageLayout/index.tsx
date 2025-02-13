'use client'

import React from 'react'
import { PageSetup } from './style'
import { useGlobalContext } from '@/app/context/GlobalContext'

// This component ensures a standardized layout for all our pages
// This way we are not recreating the standard page layout every time
// When to use?
// Use when creating a new page, wrap the entire page in it!
export default function NormalPageLayout({ children }: any) {
  const { isMobile } = useGlobalContext()
  return (
    <PageSetup>
      <div
        style={{ padding: '20px', paddingBottom: isMobile ? '100px' : '40px' }}
      >
        {children}
      </div>
    </PageSetup>
  )
}
