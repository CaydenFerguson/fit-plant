import React from 'react'
import { Container } from './style'

export default function QuarterPanel({ proportion, children }: any) {
  return <Container proportion={proportion}>{children}</Container>
}
