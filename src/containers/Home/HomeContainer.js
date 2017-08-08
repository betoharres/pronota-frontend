import React, { Component } from 'react'
import { Home } from '../../components'
import { connect } from 'react-redux'

class HomeContainer extends Component {

  render () {
    return (
      <Home />
    )
  }
}

function mapStateToProps ({navBar, user}) {
  return {isAuthenticated: user.get('isAuthenticated')}
}

export default connect(mapStateToProps)(HomeContainer)
