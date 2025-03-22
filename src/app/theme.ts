// All colours will be defined here

import { color } from 'echarts'

// Used for Graphs
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

// Eventually we will have the background colour toggleable to be the light or dark
const theme = {
  dark: {
    colours: {
      background: '#2e2c2f',
      navAndPanels: '#29282A',

      backgroundDark: '#2e2c2f',
      backgroundLight: '#FFFFFF',
      foregroundDark: '#29282A',
      foregroundLight: '#E9E6E6',
      buttonBlue: '#44C7AF', //Change me to something better
      buttonDisabledBlue: '#A1E3D7', //Change me to something better
      greyLight: '#2e2c2f',
      greyDark: '#29282A',
      textDark: '#29282A',
      textLight: '#FFFFFF',
      text: '#FFFFFF',
      offWhite: '#E9E6E6',
      activeNav: '#44C7AF',
      hoverNav: 'rgba(68,199,175,0.1)',
      linkBlue: '#66C3FF',
      black: '#000000',
      notificationLight: 'rgba(255,255,255,0.02)',
      notificationDark: 'rgba(255,255,255,0.05)',
      transparent: 'rgba(0,0,0,0)',

      graphing: {
        color: colorPalette,
        graphLineColor: '#FFFFFF',
        textStyle: {
          color: '#FFFFFF',
          // color: '#E9E6E6',
        },
        title: {
          textStyle: {
            color: '#EEF1FA',
          },
          subtextStyle: {
            color: '#B9B8CE',
          },
        },
      },
    },
  },
  light: {
    colours: {
      background: '#EBEBEB',
      navAndPanels: '#5D707F',
      // CC7E85 - pink
      backgroundDark: '#2e2c2f',
      backgroundLight: '#FFFFFF',
      foregroundDark: '#FFFFFF',
      foregroundLight: '#E9E6E6',
      buttonBlue: '#44C7AF', //Change me to something better
      buttonDisabledBlue: '#A1E3D7', //Change me to something better
      greyLight: '#2e2c2f',
      greyDark: '#D6D6D6',
      textDark: '#29282A',
      textLight: '#FFFFFF',
      text: '#FFFFFF',
      offWhite: '#E9E6E6',
      activeNav: '#44C7AF',
      hoverNav: 'rgba(68,199,175,0.1)',
      linkBlue: '#66C3FF',
      black: '#000000',
      notificationLight: 'rgba(214, 214, 214,0.05)',
      notificationDark: 'rgba(214, 214, 214,0.1)',
      transparent: 'rgba(0,0,0,0)',

      graphing: {
        color: colorPalette,
        graphLineColor: '#FFFFFF',
        textStyle: {
          color: '#FFFFFF',
        },
        title: {
          textStyle: {
            color: '#EEF1FA',
          },
          subtextStyle: {
            color: '#B9B8CE',
          },
        },
      },
    },
  },
}

const size = {
  xs: '250px',
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  xxl: '1440px',
}

export const device = {
  xs: `@media (min-width: ${size.xs})`,
  sm: `@media (min-width: ${size.sm})`,
  md: `@media (min-width: ${size.md})`,
  lg: `@media (min-width: ${size.lg})`,
  xl: `@media (min-width: ${size.xl})`,
  xxl: `@media (min-width: ${size.xxl})`,
}

export default theme

// This is the structure of the theme object for apache e charts
// var colorPalette = [
//   '#4992ff',
//   '#7cffb2',
//   '#fddd60',
//   '#ff6e76',
//   '#58d9f9',
//   '#05c091',
//   '#ff8a45',
//   '#8d48e3',
//   '#dd79ff'
// ];
// var theme = {
//   darkMode: true,

//   color: colorPalette,
//   backgroundColor: backgroundColor,
//   axisPointer: {
//       lineStyle: {
//           color: '#817f91'
//       },
//       crossStyle: {
//           color: '#817f91'
//       },
//       label: {
//           // TODO Contrast of label backgorundColor
//           color: '#fff'
//       }
//   },
//   legend: {
//       textStyle: {
//           color: contrastColor
//       }
//   },
//   textStyle: {
//       color: contrastColor
//   },
//   title: {
//       textStyle: {
//           color: '#EEF1FA'
//       },
//       subtextStyle: {
//           color: '#B9B8CE'
//       }
//   },
//   toolbox: {
//       iconStyle: {
//           borderColor: contrastColor
//       }
//   },
//   dataZoom: {
//       borderColor: '#71708A',
//       textStyle: {
//           color: contrastColor
//       },
//       brushStyle: {
//           color: 'rgba(135,163,206,0.3)'
//       },
//       handleStyle: {
//           color: '#353450',
//           borderColor: '#C5CBE3'
//       },
//       moveHandleStyle: {
//           color: '#B0B6C3',
//           opacity: 0.3
//       },
//       fillerColor: 'rgba(135,163,206,0.2)',
//       emphasis: {
//           handleStyle: {
//               borderColor: '#91B7F2',
//               color: '#4D587D'
//           },
//           moveHandleStyle: {
//               color: '#636D9A',
//               opacity: 0.7
//           }
//       },
//       dataBackground: {
//           lineStyle: {
//               color: '#71708A',
//               width: 1
//           },
//           areaStyle: {
//               color: '#71708A'
//           }
//       },
//       selectedDataBackground: {
//           lineStyle: {
//               color: '#87A3CE'
//           },
//           areaStyle: {
//               color: '#87A3CE'
//           }
//       }
//   },
//   visualMap: {
//       textStyle: {
//           color: contrastColor
//       }
//   },
//   timeline: {
//       lineStyle: {
//           color: contrastColor
//       },
//       label: {
//           color: contrastColor
//       },
//       controlStyle: {
//           color: contrastColor,
//           borderColor: contrastColor
//       }
//   },
//   calendar: {
//       itemStyle: {
//           color: backgroundColor
//       },
//       dayLabel: {
//           color: contrastColor
//       },
//       monthLabel: {
//           color: contrastColor
//       },
//       yearLabel: {
//           color: contrastColor
//       }
//   },
//   timeAxis: axisCommon(),
//   logAxis: axisCommon(),
//   valueAxis: axisCommon(),
//   categoryAxis: axisCommon(),

//   line: {
//       symbol: 'circle'
//   },
//   graph: {
//       color: colorPalette
//   },
//   gauge: {
//       title: {
//           color: contrastColor
//       }
//   },
//   candlestick: {
//       itemStyle: {
//           color: '#FD1050',
//           color0: '#0CF49B',
//           borderColor: '#FD1050',
//           borderColor0: '#0CF49B'
//       }
//   }
// };
