import React, { Component } from 'react'
import { NavBar } from '../../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as drawerActionCreators from '../../redux/modules/drawer'

import { CompaniesDrawerContainer } from '../../containers'

class NavBarContainer extends Component {

  handleDrawerTap () {
    this.props.isDrawerOpen
    ? this.props.closeDrawer()
    : this.props.openDrawer()
  }

  handleHomeTap () {
    this.props.history.push('/')
  }

  render () {
    return (
      <div>
        <CompaniesDrawerContainer />
        <NavBar title={this.props.title}
          handleHomeTap={() => this.handleHomeTap()}
          handleDrawerTap={() => this.handleDrawerTap()}
          handleAccountTap={() => this.handleAccountTap()}/>
      </div>
    )
  }
}

function mapStateToProps ({navBar, drawer}) {
  return {
    title: navBar.get('title'),
    isDrawerOpen: drawer.get('isOpen')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(drawerActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer)
