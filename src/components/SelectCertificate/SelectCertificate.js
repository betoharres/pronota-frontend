import React from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import './styles.css'

import { redA200 } from 'material-ui/styles/colors'


export default function SelectCertificate (props) {

  const isDisabled = props.isLoading ||
                     props.isSigning ||
                     props.certificates.size === 0
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
          : props.certificates.size === 0
            ? <div>
                <p>Voce precisa fazer o upload de no minimo 1 certificado.</p>
              </div>
            : <div>
                {props.signErrors
                    ? <Paper className='errorContainer' style={{color: redA200}}>
                        <p>A prefeitura rejeitou o RPS pelos seguintes motivos:</p>
                        {props.signErrors && props.signErrors.base.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </Paper>
                  : null
                }
                <RadioButtonGroup
                      name="selectCertificate"
                      onChange={props.onSelectCertificate}
                      defaultSelected={0}>
                      {props.certificates.valueSeq().map((certificate, index) => (
                        <RadioButton
                          key={index}
                          disabled={isDisabled}
                          label={`${certificate.get('id')} - ${certificate.get('filename')}`}
                          value={certificate.get('id')} />
                  ))
                }
                </RadioButtonGroup>
              </div>
      }
      <div className="certificatePass">
        <TextField
          type={'password'}
          fullWidth={true}
          disabled={isDisabled}
          onChange={props.onUpdatePassword}
          floatingLabelText='Senha do Certificado' />
        <RaisedButton
          fullWidth={true}
          secondary={true}
          label={props.isSigning ? 'Assinando...' : 'Assinar'}
          disabled={isDisabled}
          onClick={props.onSignRps} />
      </div>
    </div>
  )

}
