import React from 'react'
import Dropzone from 'react-dropzone'

export default function UploadPanel() {
  return (
    <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          style={{ border: '2px dashed #ccc', padding: '20px' }}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </Dropzone>
  )
}
