import { useGlobalContext } from '@/app/context/GlobalContext'
import { device } from '@/app/theme'
import styled from '@emotion/styled'
export const TileWrapper = styled.div(({ theme }) => {
  const { isMobile } = useGlobalContext()
  return {
    flexBasis: '200px',
    minWidth: '250px',
    flex: '1 1 200px',
    maxWidth: isMobile ? '500px' : '300px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderRadius: '20px',
    backgroundColor: theme.colours.navAndPanels,
    border: 'none',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    },

    [device.md]: {
      flex: '1 1 300px',
      maxWidth: '400px',
      border: 'none',
    },
    [device.xl]: {
      maxWidth: '350px',
      minWidth: '350px',
    },
    [device.xxl]: {
      maxWidth: '350px',
      minWidth: '350px',
      // flex: '1 1 300px',
    },
  }
})
