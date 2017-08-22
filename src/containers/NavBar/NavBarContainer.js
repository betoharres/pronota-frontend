import React, { Component } from 'react'
import { NavBar } from '../../components'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestLogoutUser } from '../../redux/modules/user'
import * as drawerActionCreators from '../../redux/modules/drawer'

class NavBarContainer extends Component {

  handleDrawerTap () {
    this.props.isDrawerOpen
    ? this.props.closeDrawer()
    : this.props.openDrawer()
  }

  handleHomeTap () {
    this.props.currentCompanyId
      ? this.props.history.push(`/companies/${this.props.currentCompanyId}`)
      : this.props.history.push('/account')
  }

  async handleLogout () {
    if(await this.props.requestLogoutUser()) {
      this.props.closeDrawer()
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div>
        <NavBar title={this.props.title}
          handleHomeTap={() => this.handleHomeTap()}
          handleDrawerTap={() => this.handleDrawerTap()}
          handleAccountTap={() => this.handleAccountTap()}
          isDrawerOpen={this.props.isDrawerOpen}
          onLogout={() => this.handleLogout()}>
          {this.props.children}
        </NavBar>
      </div>
    )
  }
}

function mapStateToProps ({navBar, drawer, user}) {
  return {
    title: navBar.get('title'),
    isDrawerOpen: drawer.get('isOpen'),
    currentCompanyId: user.get('currentCompanyId'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...drawerActionCreators, ...{requestLogoutUser}}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarContainer))
