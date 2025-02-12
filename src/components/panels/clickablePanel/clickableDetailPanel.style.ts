import styled from '@emotion/styled'

export const Overlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
})

export const Panel = styled.div({
  backgroundColor: '#1a1a1a',
  padding: '40px',
  borderRadius: '10px',
  minWidth: '600px',
  minHeight: '400px',
  position: 'relative',
  boxShadow: '0 0 20px rgba(0,0,0,0.7)',
  color: '#fff',
})

export const CloseButton = styled.button({
  position: 'absolute',
  top: '15px',
  right: '15px',
  background: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  color: '#fff',
  cursor: 'pointer',
})
