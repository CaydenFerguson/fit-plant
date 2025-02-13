import React from 'react'
import { Container } from './style'

export default function NotificationPanel({
  invisible = false,
  children,
}: any) {
  return <Container invisible={invisible}>{children}</Container>
}
