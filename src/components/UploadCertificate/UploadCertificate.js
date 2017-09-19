import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import './styles.css'

export default function UploadCertificate (props) {

  return (
    <div className='certificatesContainer'>
      <h1 className='title'>Upload de Certificado</h1>
      <span className='hint'>O arquivo deve ser de extensão .pfx ou .p12</span>
      <RaisedButton
        label={'Selecione'}
        style={{padding: 10}}
        containerElement='label'>
        <input type="file" />
      </RaisedButton>
      <RaisedButton label={'upload'} primary={true} style={{marginTop: 10}} />
    </div>
  )

}
