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
