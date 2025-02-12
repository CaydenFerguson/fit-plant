import React from 'react'
import QuarterPanel from '@/components/panels/quarterPanel'

interface ClickableQuarterPanelProps {
  onClick: () => void
  children?: React.ReactNode
}

export default function ClickableQuarterPanel({
  onClick,
  children,
}: ClickableQuarterPanelProps) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', display: 'contents' }}>
      <QuarterPanel>{children}</QuarterPanel>
    </div>
  )
}
