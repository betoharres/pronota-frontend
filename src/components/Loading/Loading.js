import React from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import './styles.css'

export default function Loading (props) {

  return (
    <div className='loadingContainer'>
      <LinearProgress mode='indeterminate' />
    </div>
  )

}
