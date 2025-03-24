import styled from '@emotion/styled'
export const TileWrapper = styled.div(({ theme }) => {
  return {
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderRadius: '10px', // Rounded corners
    overflow: 'hidden',
    backgroundColor: theme.colours.navAndPanels,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',

    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    },
  }
})
