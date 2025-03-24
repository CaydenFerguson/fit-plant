import React from 'react'
import { TileWrapper } from './styles'

interface ClickableTileProps {
  onClick: () => void
  children: React.ReactNode
}

export default function ClickableTile({
  onClick,
  children,
}: ClickableTileProps) {
  return <TileWrapper onClick={onClick}>{children}</TileWrapper>
}
