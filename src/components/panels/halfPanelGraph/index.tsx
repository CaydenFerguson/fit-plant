'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Container, Container2, SettingsButton } from './style'
import LineGraph from '@/components/lineGraph'
import { useGlobalContext } from '@/app/context/GlobalContext'
import GraphSettingsPanel from './graphSettings'
import { AnimatePresence, motion } from 'motion/react'
import LiveTimeChart from '@/components/lineGraph'

export default function HalfPanelGraph({
  invisible = false,
  children,
  plants,
  plantNum = 0,
  showDropShadow = true,
  optionsText = '',
  optionsLocation = 'left',
}: any) {
  const types = ['moisture', 'e', 'npk', 'pH', 'temperature']
  const typesCapitalized = ['Moisture', 'E', 'NPK', 'pH', 'Temperature']

  const { isMobile } = useGlobalContext()
  const [activeReading, setActiveReading] = useState(0)
  const [activeDates, setActiveDates] = useState<null | number[]>([
    plants[0]?.dates.at(-1) || null,
  ])
  const [useLocalData, setUseLocalData] = useState(false)
  const [numDates, setNumDates] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [data, setData] = useState<
    { name: string; value: (number | Date)[] }[]
  >([])
  const [shownData, setShownData] = useState(
    plants.map((plant: any) => ({
      data: plant.vitals[types[0]]?.readings[0]?.data,
      name: plant.name,
    }))
  )

  // Sets the default active date to the max date of all the plants
  useEffect(() => {
    let maxPlantDateLength = 0
    if (plants) {
      plants.forEach((plant: any) => {
        if (plant?.dates && plant?.dates.length > 0) {
          if (plant.dates.length > maxPlantDateLength) {
            maxPlantDateLength = plant.dates.length
          }
        }
      })
    }
    setActiveDates([maxPlantDateLength - 1])
  }, [])

  const maxPoints = 48 // Max number of points to keep
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const newPoint = {
        name: now.toLocaleTimeString(),
        value: [now, Math.random() * 100],
      }

      setData((prev) => {
        const updated = [...prev, newPoint]
        return updated.length > maxPoints ? updated.slice(-maxPoints) : updated
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // This useEffect assembles the right data based on the users settings.
  useEffect(() => {
    // Making sure the user has selected an active reading and that the date is not null
    if (activeReading >= 0 && activeDates != null) {
      setShownData(
        plants.map((plant: any) => {
          // This will hold the accumulated data (from all preffered dates) per plant
          let data: any[] = []
          activeDates?.forEach((dateIndex: any) => {
            console.log(
              'length verify',
              plant.vitals[types[activeReading]]?.readings.length,
              dateIndex
            )
            if (
              plant.vitals[types[activeReading]]?.readings.length - 1 >=
              dateIndex
            ) {
              data = plant.vitals[types[activeReading]]?.readings[dateIndex]
                ?.data
                ? [
                    ...data,
                    ...plant.vitals[types[activeReading]]?.readings[dateIndex]
                      .data,
                  ]
                : [...data]
            }
          })

          const assembledData = {
            data: data,
            name: plant.name,
          }

          console.log('All Data:', assembledData)
          return assembledData
        })
      )
    }
  }, [activeReading, activeDates, plants])

  const slicedData = useMemo(() => {
    return shownData.map((plant: any) => ({
      name: plant.name,
      type: 'line',
      showSymbol: false,
      smooth: false, // MAKES DATA SMOOTH vs STRAIGHT
      animationEasing: 'linear',
      animationDurationUpdate: 500,
      data: plant?.data
        ? plant.data.slice(-48).map((point: any) => ({
            name: point.value?.[0],
            value: point.value,
          }))
        : [],
    }))
  }, [shownData])

  return (
    <>
      <Container2 showDropShadow={showDropShadow} isMobile={isMobile}>
        <SettingsButton
          location={optionsLocation}
          onClick={() => setShowSettings(!showSettings)}
        >
          ⚙️ {optionsText}
        </SettingsButton>
        <AnimatePresence>
          {showSettings ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ zIndex: 1000 }}
            >
              <GraphSettingsPanel
                activeReading={activeReading}
                setActiveReading={setActiveReading}
                activeDates={activeDates}
                dates={plants}
                setActiveDates={setActiveDates}
                setShowSettings={setShowSettings}
                showSettings={showSettings}
                plantData={plants}
                useLocalData={useLocalData}
                setUseLocalData={setUseLocalData}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        {plants && (
          <LiveTimeChart
            useLocalData={useLocalData}
            data={useLocalData ? data : slicedData}
            title={plants[plantNum].vitals[types[activeReading]].title}
            yTitle={types?.[activeReading]?.toUpperCase() || 'Reading'}
          />
        )}
      </Container2>
    </>
  )
}
