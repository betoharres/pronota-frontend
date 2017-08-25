import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import './styles.css'

export default function Home (props) {
  return (
    <div className='container'>
      <RaisedButton label='Registrar' onTouchTap={props.onOpenRegisterModal} />
      <span style={{margin: 10}}/>
      <FlatButton label='Login'
        style={{color: 'white'}} onTouchTap={props.onOpenLoginModal} />
    </div>
  )
}
