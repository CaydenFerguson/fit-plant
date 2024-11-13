import React from 'react'
import { PageSetup } from './style'

// This component ensures a standardized layout for all our pages
// This way we are not recreating the standard page layout every time
// When to use?
// Use when creating a new page, wrap the entire page in it!
export default function NormalPageLayout({ children }: any) {
  return <PageSetup>{children}</PageSetup>
}
