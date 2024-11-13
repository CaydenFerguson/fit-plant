import type { NextConfig } from 'next'
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig: NextConfig = {
  output: 'export', // Required for static export with Capacitor
  distDir: 'out', // Use 'out' directory for export, matching Capacitor's expected web directory
  // Add other Next.js configurations here if needed
}

module.exports = withPWA(nextConfig)
