'use client'

import React from 'react'
import styled from '@emotion/styled'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { useTheme } from '@emotion/react'
import HalfPanelGraph from '../halfPanelGraph'
import { setDataFirebase } from '@/helpers/firebase'

const DetailPanelWrapper = styled.div`
  position: fixed;
  top: 5%; /* Start a bit closer to the top */
  left: 25%; /* Left edge at 5% of the viewport */
  right: 25%;
  bottom: 5%;
  background-color: #333;
  color: #fff;
  padding: 20px;
  border: 2px solid #fff;
  z-index: 1000;
  border-radius: 8px;
  overflow-y: auto;
`

const ButtonClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background: #555;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #777;
  }
`

const VitalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`

const VitalCard = styled.div`
  background-color: #444;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #555;
`

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
    <DetailPanelWrapper>
      <ButtonClose onClick={onClose}>X</ButtonClose>

      <h2>{data.name}</h2>
      {data.colour && <p>Colour: {data.colour}</p>}

      {data.vitals && (
        // <>
        //   <h3>Vitals &amp; Graphs</h3>
        //   <VitalsContainer>
        //     {Object.entries(data.vitals).map(([key, vitalValue]) => {
        //       const chartData = flattenVitalReadings(vitalValue)
        //       const latest = chartData.length
        //         ? chartData[chartData.length - 1]
        //         : null

        //       return (
        //         <VitalCard key={key}>
        //           <h4>{vitalValue.title}</h4>
        //           <p>
        //             {latest
        //               ? `Latest: ${latest.value} ${vitalValue.unit}
        //                 (at ${new Date(latest.time).toLocaleString()})`
        //               : 'No data'}
        //           </p>
        //           {chartData.length > 0 ? (
        //             // Increase chart width/height here
        //             <LineChart width={700} height={250} data={chartData}>
        //               <CartesianGrid strokeDasharray="3 3" />
        //               <XAxis dataKey="time" />
        //               <YAxis />
        //               <Tooltip />
        //               <Legend />
        //               <Line
        //                 type="monotone"
        //                 dataKey="value"
        //                 stroke="#8884d8"
        //                 dot={false}
        //               />
        //             </LineChart>
        //           ) : (
        //             <p>No graph data available.</p>
        //           )}
        //         </VitalCard>
        //       )
        //     })}
        //   </VitalsContainer>
        // </>
        <>
          <HalfPanelGraph plants={[data]} />
          <VitalsContainer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px',
                padding: '10px 5px',
                borderRadius: '15px',
              }}
            >
              <h1
                style={{
                  color: theme.colours.textLight,
                  fontWeight: 'bold',
                }}
              >
                {data.name}
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
                          {vital.readings[-1].data[0].number + ' ' + vital.unit}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </VitalsContainer>
        </>
      )}
    </DetailPanelWrapper>
  )
}
