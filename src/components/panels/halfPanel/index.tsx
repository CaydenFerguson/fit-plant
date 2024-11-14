import React from 'react'
import { Container } from './style'

export default function HalfPanel({ invisible = false, children }: any) {
  return <Container invisible={invisible}>{children}</Container>
}
