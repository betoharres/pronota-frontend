import React from 'react'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress'
import UserIcon from 'material-ui/svg-icons/social/person'
import { cyan500 } from 'material-ui/styles/colors'

import './styles.css'

export default function Account ({user, role, onDeleteAccountClick, isLoadingRole}) {
  return (
    <div className='accountContainer'>
      <Paper className='contentAccountContainer' style={{backgroundColor: cyan500}}>
        <div className='avatarContainer'>
          <Avatar icon={<UserIcon />} size={200} />
        </div>
        <Paper style={{padding: 0, margin: 0, height: '30vh'}} zDepth={1}>
          <div className='userInfoContainer'>
            <div style={{marginTop: 15}}>
              <MenuItem>{user.get('email')}</MenuItem>
              {!isLoadingRole
                  ? role.size > 0 ? <MenuItem>{role.get('name')}</MenuItem> : null
                  : <LinearProgress size={25} />
              }
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
