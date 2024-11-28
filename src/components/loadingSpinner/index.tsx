import theme from '@/app/theme'
import { motion } from 'framer-motion'

function LoadingSpinner() {
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
        width: 20,
        height: 20,
        border: '5px solid white', // Outer border
        borderTop: `5px solid ${theme.colours.buttonBlue}`, // Top border for the spinner effect
        borderRadius: '50%',
        margin: 'auto',
      }}
    />
  )
}

export default LoadingSpinner
