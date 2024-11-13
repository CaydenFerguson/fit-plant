import React from 'react'

interface TestProps {
  name: string
  value: number
  percentage: number
}

export default function Test({ name, value, percentage }: TestProps) {
  return (
    <div>
      <p>{name}</p>
      <p>{value}</p>
      <p>{percentage}</p>
    </div>
  )
}
