import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as drawerActionCreators from '../../redux/modules/drawer'
import * as userActionCreators from '../../redux/modules/user'
import * as companiesActionCreators from '../../redux/modules/companies'

import { AppDrawer } from '../../components'

class AppDrawerContainer extends Component {

  state = {
    hasSmallScreen: false,
    width: window.innerWidth,
    height: window.innerHeight,
  }

  async componentDidMount () {
    this.updateWindowSize()
    window.addEventListener("resize", () => this.updateWindowSize())
    await this.props.fetchAndHandleMultipleCompanies()
  }

  componentWillUnmount () {
    window.removeEventListener("resize", () => this.updateWindowSize())
  }

  updateWindowSize () {
    const hasSmallScreen = window.innerWidth < 1024
    if (hasSmallScreen) {
      this.props.closeDrawer()
    } else {
      this.props.openDrawer()
    }
    this.setState({
      hasSmallScreen,
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  toggleDrawer (isOpen) {
    isOpen ? this.props.closeDrawer() : this.props.openDrawer()
  }

  handleRedirectTo (path) {
    this.props.history.push(path)
    if (this.state.hasSmallScreen && this.props.isOpen)
      this.props.closeDrawer()
  }

  handleDrawerTap () {
    this.props.isDrawerOpen
    ? this.props.closeDrawer()
    : this.props.openDrawer()
  }

  selectCompany (id) {
    this.props.setUserCurrentSubdomain(
      this.props.companies.getIn([`${id}`, 'subdomain']),
      this.props.companies.getIn([`${id}`, 'name']),
      id
    )
    this.props.history.push(`/companies/${id}`)
    if (this.state.hasSmallScreen && this.props.isOpen)
      this.props.closeDrawer()
  }

  render () {
    return (
      <AppDrawer toggleDrawer={(isOpen) => this.toggleDrawer(isOpen)}
        redirectToAccount={(e) => this.redirectToAccount(e)}
        isOpen={this.props.isOpen}
        navBarTitle={this.props.navBarTitle}
        companies={this.props.companies.delete('status')}
        hasSmallScreen={this.state.hasSmallScreen}
        onRedirectTo={(e) => this.handleRedirectTo(e)}
        selectCompany={(id) => this.selectCompany(id)} />
    )
  }
}

function mapStateToProps ({drawer, companies, navBar}) {
  return {
    navBarTitle: navBar.get('title'),
    isOpen: drawer.get('isOpen'),
    companies,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...drawerActionCreators,
    ...companiesActionCreators},
    dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppDrawerContainer))
