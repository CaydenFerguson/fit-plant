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
  const [dates, setDates] = useState<string[] | null>(null)

  useEffect(() => {
    let datesArray: any = []
    plantData.forEach((plant: any) => {
      plant.dates.forEach((date: any) => {
        datesArray.push(date)
      })
    })
    if (datesArray.length > 0) {
      const unique = [...new Set(datesArray)] as string[]
      setDates(unique)
      console.log('dates U:', unique)
    } else {
      setDates(datesArray)
      console.log('dates:', datesArray)
    }
  }, [plantData])

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('This runs after 2 seconds!')
      setShowPanel(true)
    }, 200)

    // Clean up if component unmounts before timeout finishes
    return () => clearTimeout(timeout)
  }, [])

  function formatDateToLongForm(isoString: string | number | Date) {
    const date = new Date(isoString)
    const day = date.getDate()
    const ordinal =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
          ? 'nd'
          : day % 10 === 3 && day !== 13
            ? 'rd'
            : 'th'

    const monthOptions = { month: 'long' as const, year: 'numeric' as const }
    const formatted = date.toLocaleDateString('en-US', monthOptions)

    return `${formatted.split(' ')[0]} ${day}${ordinal}, ${formatted.split(' ')[1]}`
  }

  function checkOpen() {
    if (opened === false) {
      setOpened(true)
    } else {
      setShowSettings(false)
    }
  }

  // Adds or Removes an active date index from the array
  function addOrRemoveActiveDate(index: number, activeDates: [any]) {
    if (index === -1) {
      console.log('null')
      setActiveDates([...Array(dates?.length).keys()])
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
              maxWidth: isMobile ? '95%' : '80%',
              height: 'auto',
              maxHeight: '60%',
              position: 'relative',
              backgroundColor: theme.colours.navAndPanelsTrans,
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
                  isActive={activeDates?.length === dates?.length}
                  onClick={() => addOrRemoveActiveDate(-1, activeDates)}
                >
                  All
                </SettingItem>
                {dates?.map((date: any, index: number) => (
                  <SettingItem
                    isActive={activeDates ? activeDates.includes(index) : false}
                    onClick={() => addOrRemoveActiveDate(index, activeDates)}
                  >
                    {formatDateToLongForm(date)}
                  </SettingItem>
                ))}

                {/* <SettingItem
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
                </SettingItem> */}
              </DateList>
            </SettingWrapper>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
