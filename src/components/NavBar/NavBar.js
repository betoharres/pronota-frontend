import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui/svg-icons/action/home'
import ReorderIcon from 'material-ui/svg-icons/action/reorder'

import { CompaniesDrawerContainer } from '../../containers'

export default function NavBar ({handleHomeTap, handleDrawerTap, title, children}) {

  return (
    <div>
      <AppBar
        title={title}
        iconElementLeft={
          <IconButton onClick={handleHomeTap}>
            <HomeIcon color={'white'} />
          </IconButton>
        }
        iconElementRight={
          <IconButton onClick={handleDrawerTap}>
            <ReorderIcon color={'white'} />
          </IconButton>
        } />
      {children}
      <CompaniesDrawerContainer />
    </div>
  )

}
