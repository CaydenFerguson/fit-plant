import React, { use, useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { useTheme } from '@emotion/react'
import { useGlobalContext } from '@/app/context/GlobalContext'

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
  var colorPalette = [
    // '#4992ff',
    // '#7cffb2',
    '#fddd60',
    '#ff6e76',
    '#58d9f9',
    '#05c091',
    '#ff8a45',
    '#8d48e3',
    '#dd79ff',
  ]

  const theme = useTheme()
  const { isMobile } = useGlobalContext()
  console.log('verify theme change:', useTheme().colours.graphing)

  echarts.registerTheme('customTheme', useTheme().colours.graphing) // Register theme globally

  console.log('yvalues:', yValues)
  const gridTop = '20%'
  const titleTop = `calc(${gridTop})` // 10px above the graph
  const eChartsRef = React.useRef(null as any)

  function getOrdinal(n: number) {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return s[(v - 20) % 10] || s[v] || s[0]
  }
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
  // useEffect(() => {
  //   const options = {
  //     //  Title Adjustments
  //     title: {
  //       text: title,
  //       left: 'center',
  //       top: '5%',
  //       textStyle: {
  //         color: theme.colours.graphing.graphLineColor,
  //         fontSize: 28,
  //         fontWeight: 'bold',
  //       },
  //     },
  //     autoResize: true,
  //     grid: {
  //       containLabel: true,
  //       // top: gridTop, // Position the graph area
  //       bottom: isMobile ? '17%' : '10%',
  //       // left: isMobile ? '10%' : '8%',
  //       // right: '5%',
  //     },
  //     //--------//
  //     // X AXIS //
  //     //--------//
  //     xAxis: {
  //       type: 'time',
  //       name: xLabel,
  //       // data: xValues,
  //       nameLocation: 'middle',

  //       nameGap: 30,

  //       // Axis Name Adjustments
  //       nameTextStyle: {
  //         fontSize: 15, // ← make it larger
  //         fontWeight: 'bold',
  //         color: theme.colours.graphing.graphLineColor, // optional: custom color
  //       },

  //       // Axis Value Adjustments
  //       axisLabel: {
  //         color: theme.colours.graphing.graphLineColor,
  //         interval: 1, // ← show every other label
  //         formatter: (value: string | number | Date) => {
  //           const date = new Date(value)
  //           const hour12 = (date.getHours() % 12 || 12).toString()
  //           const minutes = date.getMinutes().toString().padStart(2, '0')
  //           const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
  //           return `${hour12}:${minutes} ${ampm}`
  //         },
  //         // fontSize: 20,
  //         // fontWeight: 'bold',
  //       },

  //       // Axis Line Adjustments
  //       axisLine: {
  //         lineStyle: {
  //           color: theme.colours.graphing.graphLineColor, // color of the axis line
  //         },
  //       },

  //       // Axis Tick Adjustments
  //       axisTick: {
  //         length: 0, // ← Longer ticks
  //         lineStyle: {
  //           color: theme.colours.graphing.graphLineColor,
  //           width: 1, // ← Thicker tick lines
  //         },
  //       },
  //     },

  //     //--------//
  //     // Y AXIS //
  //     //--------//
  //     yAxis: {
  //       type: 'value',
  //       // name: yLabel,
  //       nameLocation: 'middle',
  //       nameGap: 30,

  //       // Axis Name Adjustments
  //       nameTextStyle: {
  //         fontSize: 15, // ← make it larger
  //         fontWeight: 'bold',
  //         color: theme.colours.graphing.graphLineColor, // optional: custom color
  //       },

  //       // Axis Value Adjustments
  //       axisLabel: {
  //         color: theme.colours.graphing.graphLineColor,
  //         // fontSize: 20,
  //         // fontWeight: 'bold',
  //       },
  //     },
  //     tooltip: {
  //       trigger: 'axis',
  //       formatter: (params: any[]) => {
  //         if (!params.length) return ''

  //         const date = new Date(params[0].value[0])
  //         const hours = date.getHours()
  //         const minutes = date.getMinutes().toString().padStart(2, '0')
  //         const ampm = hours >= 12 ? 'PM' : 'AM'
  //         const hour12 = hours % 12 || 12

  //         const monthNames = [
  //           'January',
  //           'February',
  //           'March',
  //           'April',
  //           'May',
  //           'June',
  //           'July',
  //           'August',
  //           'September',
  //           'October',
  //           'November',
  //           'December',
  //         ]

  //         const getOrdinal = (n: number) => {
  //           const s = ['th', 'st', 'nd', 'rd']
  //           const v = n % 100
  //           return s[(v - 20) % 10] || s[v] || s[0]
  //         }

  //         const timestamp = `${hour12}:${minutes} ${ampm} ${monthNames[date.getMonth()]} ${date.getDate()}${getOrdinal(date.getDate())}, ${date.getFullYear()}`

  //         // Build one line per series
  //         const seriesLines = params.map((p) => {
  //           return `${p.marker} <strong>${p.seriesName}:</strong> ${p.value[1]}`
  //         })

  //         return `<strong>${timestamp}</strong><br/>${seriesLines.join('<br/>')}`
  //       },
  //     },

  //     dataZoom: [
  //       {
  //         type: isMobile ? 'slider' : 'inside',
  //         start: 50,
  //         end: 100,
  //       },
  //     ],

  //     series: yValues.map((plant: any, index: number) => ({
  //       name: plant.name,
  //       data: plant.data,
  //       type: 'line',
  //       smooth: false,
  //       animationEasing: 'linear', // Smooth linear transition
  //       animationDurationUpdate: 1000, // Duration for updates
  //     })),
  //   }
  //   // Set the chart option
  //   if (eChartsRef && eChartsRef.current)
  //     eChartsRef.current?.getEchartsInstance().setOption(options)
  // }, [xValues, yValues])

  function getOption() {
    return {
      //  Title Adjustments
      title: {
        text: title,
        left: 'center',
        top: '5%',
        textStyle: {
          color: theme.colours.graphing.graphLineColor,
          fontSize: 28,
          fontWeight: 'bold',
        },
      },
      autoResize: true,
      grid: {
        containLabel: true,
        // top: gridTop, // Position the graph area
        bottom: isMobile ? '17%' : '10%',
        // left: isMobile ? '10%' : '8%',
        // right: '5%',
      },
      //--------//
      // X AXIS //
      //--------//
      xAxis: {
        type: 'time',
        name: xLabel,
        // data: xValues,
        nameLocation: 'middle',

        nameGap: 30,

        // Axis Name Adjustments
        nameTextStyle: {
          fontSize: 15, // ← make it larger
          fontWeight: 'bold',
          color: theme.colours.graphing.graphLineColor, // optional: custom color
        },

        // Axis Value Adjustments
        axisLabel: {
          hideOverlap: true,
          color: theme.colours.graphing.graphLineColor,
          interval: 1, // ← show every other label
          formatter: (value: string | number | Date) => {
            const date = new Date(value)
            const hour12 = (date.getHours() % 12 || 12).toString()
            const minutes = date.getMinutes().toString().padStart(2, '0')
            const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
            return `${hour12}:${minutes} ${ampm}`
          },
          // fontSize: 20,
          // fontWeight: 'bold',
        },

        // Axis Line Adjustments
        axisLine: {
          lineStyle: {
            color: theme.colours.graphing.graphLineColor, // color of the axis line
          },
        },

        // Axis Tick Adjustments
        axisTick: {
          length: 0, // ← Longer ticks
          lineStyle: {
            color: theme.colours.graphing.graphLineColor,
            width: 1, // ← Thicker tick lines
          },
        },
      },

      //--------//
      // Y AXIS //
      //--------//
      yAxis: {
        type: 'value',
        // name: yLabel,
        nameLocation: 'middle',
        nameGap: 30,

        // Axis Name Adjustments
        nameTextStyle: {
          fontSize: 15, // ← make it larger
          fontWeight: 'bold',
          color: theme.colours.graphing.graphLineColor, // optional: custom color
        },

        // Axis Value Adjustments
        axisLabel: {
          color: theme.colours.graphing.graphLineColor,
          // fontSize: 20,
          // fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any[]) => {
          if (!params.length) return ''

          const date = new Date(params[0].value[0])
          const hours = date.getHours()
          const minutes = date.getMinutes().toString().padStart(2, '0')
          const ampm = hours >= 12 ? 'PM' : 'AM'
          const hour12 = hours % 12 || 12

          const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]

          const getOrdinal = (n: number) => {
            const s = ['th', 'st', 'nd', 'rd']
            const v = n % 100
            return s[(v - 20) % 10] || s[v] || s[0]
          }

          const timestamp = `${hour12}:${minutes} ${ampm} ${monthNames[date.getMonth()]} ${date.getDate()}${getOrdinal(date.getDate())}, ${date.getFullYear()}`

          // Build one line per series
          const seriesLines = params.map((p) => {
            return `${p.marker} <strong>${p.seriesName}:</strong> ${p.value[1]}`
          })

          return `<strong>${timestamp}</strong><br/>${seriesLines.join('<br/>')}`
        },
      },

      dataZoom: [
        {
          type: isMobile ? 'slider' : 'inside',
          start: 50,
          end: 100,
        },
      ],

      series: yValues.map((plant: any, index: number) => ({
        name: plant.name,
        data: plant.data,
        type: 'line',
        smooth: false,
        animationEasing: 'linear', // Smooth linear transition
        animationDurationUpdate: 1000, // Duration for updates
      })),
    }
  }
  return (
    <div id="chart-container" style={{ height: '100%' }}>
      <ReactEcharts
        key={JSON.stringify(theme)}
        theme={'customTheme'}
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
