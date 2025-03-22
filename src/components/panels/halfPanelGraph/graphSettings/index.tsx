import { useTheme } from '@emotion/react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import {
  DateList,
  SettingItem,
  ReadingList,
  SettingsHeading,
  SettingWrapper,
  CloseButton,
} from './style'
import { useGlobalContext } from '@/app/context/GlobalContext'

export default function GraphSettingsPanel({
  setShowSettings,
  showSettings,
  activeReading,
  setActiveReading,
  activeDates,
  setActiveDates,
  plantData,
}: any) {
  const theme = useTheme()
  const [showPanel, setShowPanel] = useState<any>(null)
  const [opened, setOpened] = useState(false)
  const typesCapitalized = ['Moisture', 'E', 'NPK', 'pH', 'Temperature']
  const { isMobile } = useGlobalContext()
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('This runs after 2 seconds!')
      setShowPanel(true)
    }, 200)

    // Clean up if component unmounts before timeout finishes
    return () => clearTimeout(timeout)
  }, [])

  function checkOpen() {
    if (opened === false) {
      setOpened(true)
    } else {
      setShowSettings(false)
    }
  }

  // Adds or Removes an active date index from the array
  function addOrRemoveActiveDate(index: number | null, activeDates: [any]) {
    if (index === null) {
      console.log('null')
      setActiveDates(null)
    } else if (activeDates === null || !activeDates.includes(index)) {
      console.log('index')
      setActiveDates([...(activeDates || []), index].sort())
    } else {
      const updatedArray = activeDates.filter((i) => i !== index)
      setActiveDates(updatedArray.length ? updatedArray : null)
    }
  }
  return (
    <div
      onClick={() => setShowPanel(false)}
      style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 100,
      }}
    >
      <AnimatePresence initial={false}>
        {showPanel ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onAnimationComplete={() => checkOpen()}
            onClick={(e) => e.stopPropagation()}
            key="box"
            style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              justifyContent: 'start',
              alignItems: 'center',
              width: isMobile ? '95%' : '80%',
              height: 'auto',
              maxHeight: '60%',
              position: 'relative',
              backgroundColor: theme.colours.navAndPanels,
              borderRadius: '20px',
              boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.25)',
              overflowY: 'scroll',
              zIndex: 1001,
            }}
          >
            <h2
              style={{
                marginBottom: '20px',
                paddingBottom: '10px',
                paddingLeft: isMobile ? '0px' : '15px',
                paddingRight: isMobile ? '0px' : '15px',
                // borderBottom: '1px solid white',
              }}
            >
              Overview Settings
            </h2>
            <CloseButton onClick={() => setShowPanel(false)}>❌</CloseButton>
            {/* Choose Active Reading */}
            <SettingWrapper isMobile={isMobile}>
              <SettingsHeading>Reading Type:</SettingsHeading>
              <ReadingList>
                {typesCapitalized.map((type, index) => (
                  <SettingItem
                    isActive={activeReading === index}
                    key={index}
                    onClick={() => setActiveReading(index)}
                  >
                    {type}
                  </SettingItem>
                ))}
              </ReadingList>
            </SettingWrapper>

            {/* Choose Graphing Date */}
            <SettingWrapper isMobile={isMobile}>
              <SettingsHeading>Date:</SettingsHeading>
              <DateList>
                <SettingItem
                  isActive={activeDates === null}
                  onClick={() => addOrRemoveActiveDate(null, activeDates)}
                >
                  All
                </SettingItem>

                <SettingItem
                  isActive={activeDates ? activeDates.includes(0) : false}
                  onClick={() => addOrRemoveActiveDate(0, activeDates)}
                >
                  Choose Date
                </SettingItem>
                <SettingItem
                  isActive={activeDates ? activeDates.includes(1) : false}
                  onClick={() => addOrRemoveActiveDate(1, activeDates)}
                >
                  Choose Date
                </SettingItem>
                <SettingItem
                  isActive={activeDates ? activeDates.includes(2) : false}
                  onClick={() => addOrRemoveActiveDate(2, activeDates)}
                >
                  Choose Date
                </SettingItem>
              </DateList>
            </SettingWrapper>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
