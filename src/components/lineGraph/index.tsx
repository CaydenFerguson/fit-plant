import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

function LineGraph({ xValues, yValues }: any) {
  const chartRef = useRef(null) // Reference to the chart container

  useEffect(() => {
    // Initialize the ECharts instance
    const chartInstance = echarts.init(chartRef.current)

    // Set the chart options
    const options = {
      title: {
        text: 'Custom Line Chart',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: xValues, // Use xValues for the x-axis
        name: 'X-Axis',
        nameLocation: 'middle',
        nameGap: 25,
      },
      yAxis: {
        type: 'value',
        name: 'Y-Axis',
        nameLocation: 'middle',
        nameGap: 35,
      },
      series: [
        {
          data: yValues, // Use yValues for the series data
          type: 'line',
          smooth: true, // Optional: smooth the line
          name: 'Data',
        },
      ],
    }

    // Set the options for the chart instance
    chartInstance.setOption(options)

    // Cleanup function to dispose of the chart instance when the component unmounts
    return () => {
      chartInstance.dispose()
    }
  }, [xValues, yValues]) // Update chart when xValues or yValues change

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '400px' }} // Set the chart dimensions
    ></div>
  )
}

export default LineGraph
