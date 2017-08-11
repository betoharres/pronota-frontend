import React from 'react'
import Dialog from 'material-ui/Dialog'

export default function Modal ({isOpen, handleClose, Component}) {
  return (
    <Dialog autoScrollBodyContent={true}
      modal={false} open={isOpen} onRequestClose={handleClose}>
      <Component />
    </Dialog>
  )

}
