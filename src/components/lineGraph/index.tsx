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
  yValues: any
  xLabel: string
  yLabel: string
  title: string
}) {
  console.log('yvalues:', yValues)
  const gridTop = '20%'
  const titleTop = `calc(${gridTop})` // 10px above the graph
  const eChartsRef = React.useRef(null as any)

  useEffect(() => {
    const resizeChart = () => {
      if (eChartsRef.current) {
        eChartsRef.current.getEchartsInstance().resize()
      }
    }

    // Attach ResizeObserver to the container
    const observer = new ResizeObserver(() => {
      resizeChart() // Resize dynamically
    })

    const container = document.getElementById('chart-container') // Your chart wrapper
    if (container) observer.observe(container)

    return () => observer.disconnect()
  }, [])

  // Updates chart options on xValues or yValues change
  useEffect(() => {
    const options = {
      title: {
        text: title + ' over the past 100 mins',
        left: 'center',
        top: '5%',
      },
      autoResize: true,
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
      series: yValues.map((plant: any, index: number) => ({
        name: plant.name,
        data: plant.readings,
        type: 'line',
        smooth: false,
        animationEasing: 'linear', // Smooth linear transition
        animationDurationUpdate: 1000, // Duration for updates
      })),

      // [
      //   {
      //     data: yValues,
      //     type: 'line',
      //     smooth: false,
      //     animationEasing: 'linear', // Smooth linear transition
      //     animationDurationUpdate: 1000, // Duration for updates
      //   },
      // ],
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
    <div id="chart-container" style={{ height: '100%' }}>
      <ReactEcharts
        option={getOption()}
        opts={{ renderer: 'canvas' }}
        style={{ width: '100%', height: '100%' }}
        ref={eChartsRef}
      />
    </div>
  )

  //   // Add a resize listener to update the chart size on window resize
  //   const handleResize = () => {
  //     chartInstance.resize()
  //   }
}

export default LineChart
