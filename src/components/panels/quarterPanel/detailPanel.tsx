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

const DetailPanelWrapper = styled.div`
  position: fixed;
  top: 5%;
  left: 25%;
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
  return (
    <DetailPanelWrapper>
      <ButtonClose onClick={onClose}>X</ButtonClose>

      <h2>{data.name}</h2>
      {data.colour && <p>Colour: {data.colour}</p>}

      {data.vitals && (
        <>
          <h3>Vitals &amp; Graphs</h3>
          <VitalsContainer>
            {Object.entries(data.vitals).map(([key, vitalValue]) => {
              const chartData = flattenVitalReadings(vitalValue)
              const latest = chartData.length
                ? chartData[chartData.length - 1]
                : null

              return (
                <VitalCard key={key}>
                  <h4>{vitalValue.title}</h4>
                  <p>
                    {latest
                      ? `Latest: ${latest.value} ${vitalValue.unit} 
                        (at ${new Date(latest.time).toLocaleString()})`
                      : 'No data'}
                  </p>
                  {chartData.length > 0 ? (
                    // Increase chart width/height here
                    <LineChart width={700} height={250} data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        dot={true}
                      />
                    </LineChart>
                  ) : (
                    <p>No graph data available.</p>
                  )}
                </VitalCard>
              )
            })}
          </VitalsContainer>
        </>
      )}
    </DetailPanelWrapper>
  )
}
