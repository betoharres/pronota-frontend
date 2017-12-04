import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as snackbarActionCreators from '../../redux/modules/snackbar'

import { SnackbarUI } from '../../components'

class SnackbarContainer extends Component {

  handleRequestClose () {
    this.props.hideSnackbar()
  }

  render () {
    return (
      <SnackbarUI
        isOpen={this.props.isOpen}
        message={this.props.message}
        duration={this.props.duration}
        onRequestClose={() => this.handleRequestClose()}
      />
    )
  }
}

function mapStateToProps ({snackbar}) {
  return {
    isOpen: snackbar.get('isOpen'),
    message: snackbar.get('message'),
    duration: snackbar.get('duration'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(snackbarActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarContainer)
