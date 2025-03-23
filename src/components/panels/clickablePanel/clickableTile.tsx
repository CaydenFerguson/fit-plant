import React from 'react'
import styled from '@emotion/styled'

const TileWrapper = styled.div({
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  // minWidth: '200px',
  borderRadius: '10px', // Rounded corners
  // overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  },
})

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
