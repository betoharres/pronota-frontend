import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FileReaderInput from 'react-file-reader-input'

import './styles.css'

export default function UploadCertificate (props) {

  return (
    <div className='certificatesContainer'>
      <h1 className='title'>Upload de Certificado</h1>
      <span className='hint'>O arquivo deve ser de extensão .pfx ou .p12</span>
      <FileReaderInput as='binary' id='certificate-upload'
        accept='.pfx, .p12' onChange={props.onUploadClick}>
          <RaisedButton label={'Upload'} />
        </FileReaderInput>
    </div>
  )

}
