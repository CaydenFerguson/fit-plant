import { useTheme } from '@emotion/react'
import { motion } from 'framer-motion'

export default function LoadingSpinner({
  size = 20,
  margin = 'auto',
  padding = '0px',
}: any) {
  const theme = useTheme()
  return (
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
        padding: padding,
        width: size,
        height: size,
        border: '5px solid white', // Outer border
        borderTop: `5px solid ${theme.colours.buttonBlue}`, // Top border for the spinner effect
        borderRadius: '50%',
        margin: margin,
      }}
    />
  )
}
