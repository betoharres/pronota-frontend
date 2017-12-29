import React from 'react'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import './styles.css'

import {
  cyan500,
} from 'material-ui/styles/colors'

export default function Account ({user, role, onDeleteAccountClick}) {
  return (
    <div className='accountContainer'>
      <Paper className='contentAccountContainer' style={{backgroundColor: cyan500}}>
        <div className='avatarContainer'>
          <Avatar src="http://malkimuseum.org/wp-content/uploads/2017/06/dummy-image.jpg" size={200} />
        </div>
        <Paper style={{padding: 0, margin: 0, height: '30vh'}} zDepth={1}>
          <div className='userInfoContainer'>
            <div style={{marginTop: 15}}>
              <MenuItem>{user.get('email')}</MenuItem>
              <MenuItem>{role ? role.get('name') : ''}</MenuItem>
            </div>
            <RaisedButton
              onClick={onDeleteAccountClick}
              style={{marginTop: 15}}
              secondary={true}
              label={'DELETAR CONTA'} />
          </div>
        </Paper>
      </Paper>
    </div>
  )

}
