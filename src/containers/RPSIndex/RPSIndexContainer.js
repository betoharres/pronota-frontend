import React, { Component } from 'react'
import { RPSIndex } from '../../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as rpsActionCreators from '../../redux/modules/rps'
import * as userActionCreators from '../../redux/modules/user'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as snackbarActionCreators from '../../redux/modules/snackbar'

class RPSIndexContainer extends Component {

  async componentDidMount () {
    this.props.setNavBarTitle('RPS')
    await this.props.fetchAndHandleMultipleRps()
  }

  handleRedirectToRPS (selectedRow) {
    const id = this.props.rps.valueSeq().toArray()[selectedRow].get('id')
    this.props.history.push(`/rps/${id}/edit`)
  }

  redirectTo (path) {
    this.props.history.push(path)
  }

  async handleDestroyRps (id) {
    await this.props.handleDestroyRps(id)
      ? this.props.showSnackbar('RPS deletado com sucesso')
      : this.props.showSnackbar('Não foi possível deletar RPS')
  }


  render () {
    return (
      <RPSIndex
        multipleRPS={this.props.rps}
        redirectTo={(path) => this.redirectTo(path)}
        onDestroyRps={(id) => this.handleDestroyRps(id)}
        onRedirectToRPS={(rps) => this.handleRedirectToRPS(rps)} />
    )
  }
}

function mapStateToProps ({user, rps}) {
  rps = rps.delete('status')
  return {
    rps,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...navBarActionCreators,
    ...rpsActionCreators,
    ...snackbarActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RPSIndexContainer)
