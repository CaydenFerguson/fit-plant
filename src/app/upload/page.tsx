'use client'

import NormalPageLayout from '@/components/normalPageLayout'
import PanelGeneric from '@/components/panels/panelGeneric'
import React, { useEffect, useState } from 'react'
import { auth } from '@/config/firebase'
import { CodeOutputBox, Container, CopyButton, Title } from './style'

export default function upload() {
  const [buttonText, setButtonText] = useState('Copy')
  useEffect(() => {
    const userId = auth?.currentUser?.uid
    const code = document.getElementById('code') as HTMLInputElement
    if (userId) {
      code.value = userId.toString()
    } else {
      code.value = 'Failed to get user id'
    }
  }, [])

  function copyCode() {
    const code = document.getElementById('code') as HTMLInputElement
    code.select()
    code.setSelectionRange(0, 99999)
    document.execCommand('copy')
    setButtonText('Copied!')
  }

  return (
    <NormalPageLayout>
      <PanelGeneric>
        <Container>
          <Title>Upload</Title>
          <p>Below is your secret code, use it to pair your sensor!</p>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <CodeOutputBox disabled={true} id="code" type="text" />
            <CopyButton id="button" onClick={copyCode}>
              {buttonText}
            </CopyButton>
          </div>
        </Container>
      </PanelGeneric>
    </NormalPageLayout>
  )
}
