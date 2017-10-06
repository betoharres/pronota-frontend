import React from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

export default function SelectCertificate (props) {
  return (
    <div>
      <h1>Certificados</h1>
      {props.isLoading
          ? <CircularProgress
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            size={20} />
      : <RadioButtonGroup
          name="selectCertificate"
          onChange={props.onSelectCertificate}
          defaultSelected={0}>
          {props.certificates.valueSeq().map((certificate, index) => (
            <RadioButton
              key={index}
              label={`${certificate.get('id')} -
                ${certificate.get('filename')}`}
              value={certificate.get('id')} />
          ))
        }
        </RadioButtonGroup>
      }
      <div className="certificatePass">
        <TextField
          type={'password'}
          fullWidth={true}
          disabled={props.isLoading || props.isSigning}
          onChange={props.onUpdatePassword}
          floatingLabelText='Senha' />
        <RaisedButton
          fullWidth={true}
          secondary={true}
          label='Assinar'
          disabled={props.isLoading || props.isSigning}
          onClick={props.onSignRps} />
      </div>
    </div>
  )

}
