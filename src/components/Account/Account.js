import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import './styles.css'

export default function Account (props) {

  return (
    <div className='accountContainer'>
      <br />
      <RaisedButton onClick={props.onLogout} label='Logout' />
    </div>
  )

}
