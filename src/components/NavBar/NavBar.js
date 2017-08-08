import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui/svg-icons/action/home'
import ReorderIcon from 'material-ui/svg-icons/action/reorder'

export default function NavBar ({handleHomeTap, handleDrawerTap, title}) {

  return (
    <AppBar
      title={title}
      iconElementLeft={
        <div>
          <IconButton onClick={handleDrawerTap}>
            <ReorderIcon color={'white'} />
          </IconButton>
          <IconButton onClick={handleHomeTap}>
            <HomeIcon color={'white'} />
          </IconButton>
        </div>
      }
      style={{marginRight: 24}}
    />
  )

}
