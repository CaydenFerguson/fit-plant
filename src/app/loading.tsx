'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@emotion/react'
export default function Loading() {
  const size = '100px'
  const theme = useTheme()
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        animate={{
          rotate: 360, // Full rotation
        }}
        transition={{
          repeat: Infinity, // Loop the animation
          duration: 1, // 1 second per rotation
          ease: 'linear', // Smooth, consistent speed
        }}
        style={{
          width: size,
          height: size,
          border: '5px solid white', // Outer border
          borderTop: `5px solid ${theme.colours.buttonBlue}`, // Top border for the spinner effect
          borderRadius: '50%',
          margin: 'auto',
        }}
      />
    </div>
  )
}
