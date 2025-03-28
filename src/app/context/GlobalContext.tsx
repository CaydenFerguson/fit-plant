// app/context/GlobalContext.tsx
'use client' // Required for context in Next.js

import { createContext, useContext, useEffect, useState } from 'react'

const GlobalContext = createContext<any>(null)

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState<any>(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 750)
    window.addEventListener('resize', handleResize)
    setIsMobile(window.innerWidth < 750)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <GlobalContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}
