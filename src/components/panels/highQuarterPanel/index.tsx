import React from 'react'
import { Container } from './style'

export default function HighQuarterPanel({ proportion, children }: any) {
  return <Container proportion={proportion}>{children}</Container>
}
