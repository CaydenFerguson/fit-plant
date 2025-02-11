import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'

function LineChart({
  xValues,
  yValues,
  xLabel,
  yLabel,
  title,
}: {
  xValues: string[]
  yValues: number[]
  xLabel: string
  yLabel: string
  title: string
}) {
  const gridTop = '20%'
  const titleTop = `calc(${gridTop})` // 10px above the graph
  const eChartsRef = React.useRef(null as any)

  // MAYBE: FIX THE Y AXIS SO IT DOESNT MORPH
  // Updates chart options on xValues or yValues change
  useEffect(() => {
    const options = {
      title: {
        text: title + ' over the past 100 mins',
        left: 'center',
        top: '5%',
      },
      grid: {
        top: gridTop, // Position the graph area
        bottom: '20%',
        left: '10%',
        right: '5%',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        name: xLabel,
        data: xValues,
        nameLocation: 'middle',
        nameGap: 25,
      },
      yAxis: {
        type: 'value',
        name: yLabel,
        nameLocation: 'middle',
        nameGap: 30,
      },
      dataZoom: [
        {
          type: 'slider',
          start: 50, // Start position of the zoomed area
          end: 100, // End position of the zoomed area
        },
      ],
      series: [
        {
          data: yValues,
          type: 'line',
          smooth: false,
          animationEasing: 'linear', // Smooth linear transition
          animationDurationUpdate: 1000, // Duration for updates
        },
      ],
    }
    // Set the chart option
    if (eChartsRef && eChartsRef.current)
      eChartsRef.current?.getEchartsInstance().setOption(options)
  }, [xValues, yValues])

  function getOption() {
    const options = {
      title: {
        text: title + ' over the past 100 mins',
        left: 'center',
        top: '5%',
      },
      grid: {
        top: gridTop, // Position the graph area
        bottom: '20%',
        left: '10%',
        right: '5%',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        name: xLabel,
        data: xValues,
        nameLocation: 'middle',
        nameGap: 25,
      },
      yAxis: {
        type: 'value',
        name: yLabel,
        nameLocation: 'middle',
        nameGap: 30,
      },
      series: [
        {
          data: yValues,
          type: 'line',
          smooth: true,
        },
      ],
    }
    return {
      options: options,
    }
  }
  return (
    <ReactEcharts
      option={getOption()}
      style={{ width: '100%', height: '100%' }}
      ref={eChartsRef}
    />
  )

  // const chartRef = useRef<HTMLDivElement>(null) // Reference to the chart container
  // const chartInstanceRef = useRef<echarts.EChartsType | null>(null) // Properly typed ref for ECharts instance

  // useEffect(() => {
  //   if (!chartRef.current) return // Ensure the chart container exists

  //   // Initialize the ECharts instance
  //   const chartInstance = echarts.init(chartRef.current)
  //   chartInstanceRef.current = chartInstance // Store the instance in the ref

  //   const gridTop = '20%'
  //   const titleTop = `calc(${gridTop})` // 10px above the graph

  //   // Set the chart options
  //   const options = {
  //     title: {
  //       text: title + ' over the past 100 mins',
  //       left: 'center',
  //       top: '5%',
  //     },
  //     grid: {
  //       top: gridTop, // Position the graph area
  //       bottom: '20%',
  //       left: '10%',
  //       right: '5%',
  //     },
  //     tooltip: {
  //       trigger: 'axis',
  //     },
  //     xAxis: {
  //       type: 'category',
  //       name: xLabel,
  //       data: xValues,
  //       nameLocation: 'middle',
  //       nameGap: 25,
  //     },
  //     yAxis: {
  //       type: 'value',
  //       name: yLabel,
  //       nameLocation: 'middle',
  //       nameGap: 30,
  //     },
  //     series: [
  //       {
  //         data: yValues,
  //         type: 'line',
  //         smooth: true,
  //       },
  //     ],
  //   }

  //   chartInstance.setOption(options)

  //   // Add a resize listener to update the chart size on window resize
  //   const handleResize = () => {
  //     chartInstance.resize()
  //   }

  //   window.addEventListener('resize', handleResize)

  //   // Cleanup function to remove the listener and dispose of the chart instance
  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //     chartInstance.dispose()
  //     chartInstanceRef.current = null // Clear the reference on cleanup
  //   }
  // }, [xValues, yValues]) // Recreate chart when xValues or yValues change

  // return (
  //   <div
  //     ref={chartRef}
  //     style={{ width: '100%', height: '100%' }} // Ensure width and height are set
  //   ></div>
  // )
}

export default LineChart
