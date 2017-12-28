import React from 'react'
import Dialog from 'material-ui/Dialog'

export default function Modal ({isOpen, handleClose, Component}) {
  return (
    <Dialog modal={false} open={isOpen} autoScrollBodyContent={true} onRequestClose={handleClose}>
      <Component />
    </Dialog>
  )

}
