import theme from '@/app/theme'
import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 20 }: any) {
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
        width: size,
        height: size,
        border: '5px solid white', // Outer border
        borderTop: `5px solid ${theme.colours.buttonBlue}`, // Top border for the spinner effect
        borderRadius: '50%',
        margin: 'auto',
      }}
    />
  )
}
