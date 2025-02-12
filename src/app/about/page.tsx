import React from 'react'
import NormalPageLayout from '../../components/normalPageLayout'

export default function About() {
  return (
    <NormalPageLayout>
      Fit Plant is a plant monitoring system consisting of senssor(s) connected
      to a central hub with online connectivity. It leverages NextJS for a
      responsive and modern front-end for desktop, and utilizes PWA + capacitor
      to more seamlessly work with mobile, all while having firebase for a
      proven and reliable backend.
    </NormalPageLayout>
  )
}
