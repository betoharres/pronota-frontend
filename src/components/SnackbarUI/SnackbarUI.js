import React from 'react'
import Snackbar from 'material-ui/Snackbar'

export default function SnackbarUI ({isOpen, message, duration, onRequestClose}) {
  return (
    <Snackbar
      open={isOpen}
      message={message}
      autoHideDuration={duration}
      onRequestClose={onRequestClose}
    />
  )
}
