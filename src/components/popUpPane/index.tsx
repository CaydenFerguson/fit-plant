////////////////
// HOW TO USE //
////////////////

// {showUpload ? (
//   <PopUpPane setShowPopup={setShowUpload} showPop={showUpload}>
//     <> PUT YOUR CONTENT HERE </>
//   </PopUpPane>
// ) : null}

import { useGlobalContext } from '@/app/context/GlobalContext'
import { useTheme } from '@emotion/react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { CloseButton } from './style'

export default function PopUpPane({
  children,
  setShowPopup,
  showPopup,
  paneTitle = '',
}: any) {
  const [showPanel, setShowPanel] = useState<any>(null)
  const [opened, setOpened] = useState(false)
  const { isMobile } = useGlobalContext()

  const theme = useTheme()
  function checkOpen() {
    if (opened === false) {
      setOpened(true)
    } else {
      setShowPopup(false)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('This runs after 2 seconds!')
      setShowPanel(true)
    }, 200)

    // Clean up if component unmounts before timeout finishes
    return () => clearTimeout(timeout)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ zIndex: 1000 }}
    >
      <div
        onClick={() => setShowPanel(false)}
        style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: '0%',
          left: '0%',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 100,
        }}
      >
        <AnimatePresence initial={false}>
          {showPanel ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onAnimationComplete={() => checkOpen()}
              onClick={(e) => e.stopPropagation()}
              key="box"
              style={{
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                justifyContent: 'start',
                alignItems: 'center',
                maxWidth: isMobile ? '95%' : '80%',
                height: 'auto',
                maxHeight: '60%',
                position: 'relative',
                backgroundColor: theme.colours.navAndPanelsTrans,
                borderRadius: '20px',
                boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.25)',
                overflowY: 'scroll',
                zIndex: 1001,
              }}
            >
              <h2
                style={{
                  marginBottom: '20px',
                  paddingBottom: '10px',
                  paddingLeft: isMobile ? '0px' : '15px',
                  paddingRight: isMobile ? '0px' : '15px',
                  // borderBottom: '1px solid white',
                }}
              >
                {paneTitle}
              </h2>
              <CloseButton onClick={() => setShowPanel(false)}>❌</CloseButton>
              {children}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
