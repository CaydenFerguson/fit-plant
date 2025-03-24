'use client'

import React from 'react'
import styled from '@emotion/styled'
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from 'recharts'
import { useTheme } from '@emotion/react'
import HalfPanelGraph from '../halfPanelGraph'
import { VitalsContainer } from './style'

type DetailPanelProps = {
  data: {
    name: string
    image?: string
    colour?: string
    vitals?: Record<string, any>
  }
  onClose: () => void
}

/** Flatten function to transform nested readings into an array of { time, value } */
function flattenVitalReadings(vital: any) {
  if (!vital || !vital.readings) return []
  return vital.readings.reduce((acc: any[], reading: any) => {
    const dataPoints = (reading.data || []).map((item: any) => ({
      time: new Date(item.value[0]).toLocaleTimeString(),
      value: item.value[1],
    }))
    return acc.concat(dataPoints)
  }, [])
}

export default function DetailPanel({ data, onClose }: DetailPanelProps) {
  console.log('check data', data)
  const theme = useTheme()
  function getEmoji(title: string) {
    if (title === 'Moisture') {
      return '💧'
    } else if (title === 'Temperature') {
      return '🌡️'
    } else if (title === 'pH Level') {
      return '🧪'
    } else if (title === 'NPK') {
      return '🧑‍🌾'
    } else if (title === 'Electrical Conductivity') {
      return '⚡'
    } else {
      return ''
    }
  }
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {data.vitals && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            gap: '40px',
          }}
        >
          <div style={{ flexBasis: '70%' }}>
            <HalfPanelGraph
              plants={[data]}
              showDropShadow={false}
              optionsLocation={'right'}
            />
          </div>
          <div style={{ flexBasis: '30%' }}>
            <VitalsContainer>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '10px',
                }}
              >
                <h1
                  style={{
                    color: theme.colours.textLight,
                    fontWeight: 'bold',
                  }}
                >
                  {'Current Status'}
                </h1>
              </div>
              {/* Vitals */}
              {data && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    height: '100%',
                  }}
                >
                  {Object.values(data?.vitals)?.map(
                    (vital: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          margin: '15px',
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <div
                          style={{
                            height: '50px',
                            width: '50px',
                            fontSize: '30px',
                          }}
                        >
                          {getEmoji(vital.title)}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            <h2 key={index}>{vital.title}:</h2>
                            <p
                              style={{
                                fontSize: '20px',
                                paddingLeft: '15px',
                              }}
                            >
                              Good
                            </p>
                          </div>
                          <p
                            style={{
                              fontSize: '20px',
                            }}
                          >
                            {vital.readings.at(-1).data.at(-1).value[1] +
                              ' ' +
                              vital.unit}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </VitalsContainer>
          </div>
        </div>
      )}
    </div>
  )
}
