// All colours will be defined here

// Eventually we will have the background colour toggleable to be the light or dark
const theme = {
  colours: {
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
    offWhite: '#E9E6E6',
    activeNav: '#44C7AF',
    hoverNav: 'rgba(68,199,175,0.1)',
    linkBlue: '#66C3FF',

    transparent: 'rgba(0,0,0,0)',
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
