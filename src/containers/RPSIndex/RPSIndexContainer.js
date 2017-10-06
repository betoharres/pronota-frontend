import React, { Component } from 'react'
import { RPSIndex } from '../../components'
import { SelectCertificateContainer } from '../../containers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as rpsActionCreators from '../../redux/modules/rps'
import * as userActionCreators from '../../redux/modules/user'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as modalActionCreators from '../../redux/modules/modal'

class RPSIndexContainer extends Component {

  async componentDidMount () {
    this.props.setNavBarTitle('RPS')
    await this.props.fetchAndHandleMultipleRps(this.props.currentSubdomain)
  }

  handleRedirectToRPS (selectedRow) {
    const id = this.props.rps.valueSeq().toArray()[selectedRow].get('id')
    this.props.history.push(`/rps/${id}/edit`)
  }

  redirectTo (path) {
    this.props.history.push(path)
  }

  handleDestroyRps (id) {
    this.props.handleDestroyRps(this.props.currentSubdomain, id)
  }

  handleSignClick (id) {
    this.props.openModal(() => <SelectCertificateContainer rpsId={id} />)
  }

  render () {
    return (
      <RPSIndex
        multipleRPS={this.props.rps}
        redirectTo={(path) => this.redirectTo(path)}
        onDestroyRps={(id) => this.handleDestroyRps(id)}
        onSignClick={(id) => this.handleSignClick(id)}
        onRedirectToRPS={(rps) => this.handleRedirectToRPS(rps)} />
    )
  }
}

function mapStateToProps ({user, rps}) {
  rps = rps.delete('status')
  return {
    rps,
    currentSubdomain: user.get('currentSubdomain'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...navBarActionCreators,
    ...rpsActionCreators,
    ...modalActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RPSIndexContainer)
