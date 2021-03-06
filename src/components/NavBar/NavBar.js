import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui/svg-icons/action/home'
import ReorderIcon from 'material-ui/svg-icons/action/reorder'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'

import { AppDrawerContainer } from '../../containers'

export default function NavBar ({
  handleHomeTap,
  handleDrawerTap,
  isDrawerOpen,
  onLogout,
  title,
  children,
  hasSmallScreen,
}) {

  return (
    <div>
      <AppBar
        title={isDrawerOpen ? '' : title}
        titleStyle={{fontWeight: 100}}
        iconElementLeft={
          isDrawerOpen
           ? null
           : <span>
              <IconButton onClick={handleDrawerTap}>
                <ReorderIcon color='white' />
              </IconButton>
              <IconButton onClick={handleHomeTap}>
                <HomeIcon color={'white'} />
              </IconButton>
            </span>
        }
        iconElementRight={
          <IconButton onClick={onLogout}>
            <ExitIcon color='white' />
          </IconButton>
        } />
      <div style={(isDrawerOpen && !hasSmallScreen) ? {marginLeft: 250} : {}}>
        {children}
      </div>
      <AppDrawerContainer />
    </div>
  )

}
