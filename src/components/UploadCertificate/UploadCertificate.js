import React from 'react'
import Dropzone from 'react-dropzone'

import './styles.css'

export default function UploadCertificate (props) {

  return (
    <div className='certificatesContainer'>
      <h1 className='title'>Upload de Certificado</h1>
      <span className='hint'>O arquivo deve ser de extensão .pfx ou .p12</span>
      <Dropzone
        multiple={false}
        accept='application/pkcs12, application/pfx'
        onDrop={(e, files) => props.onUploadClick(e, files)}>
        <p>Arraste o arquivo aqui</p>
      </Dropzone>
    </div>
  )

}
