import React, { Component } from 'react'
import { RPSIndex } from '../../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as rpsActionCreators from '../../redux/modules/rps'
import * as userActionCreators from '../../redux/modules/user'
import * as navBarActionCreators from '../../redux/modules/navBar'

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

  render () {
    return (
      <RPSIndex
        multipleRPS={this.props.rps}
        redirectTo={(path) => this.redirectTo(path)}
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RPSIndexContainer)
