import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

import './styles.css'

export default function Account (props) {

  return (
    <div className='accountContainer'>
      <Paper style={{padding: 20, margin: 20}} zDepth={1}>
        <h1>Atualizar Senha</h1>
        <br />
        <Divider style={{marginTop: 40, margin: 20}} />
        <div style={{alignItems: 'center'}}>
          <RaisedButton onClick={props.onLogout} label='Logout' />
        </div>
      </Paper>
    </div>
  )

}
