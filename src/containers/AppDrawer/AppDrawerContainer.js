import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as drawerActionCreators from '../../redux/modules/drawer'
import * as userActionCreators from '../../redux/modules/user'

import { AppDrawer } from '../../components'

class AppDrawerContainer extends Component {

  async componentDidMount () {
    this.props.shouldDockDrawer(window.innerWidth)
    window.addEventListener("resize", () => this.updateWindowSize())
  }

  componentWillUnmount () {
    window.removeEventListener("resize", () => this.updateWindowSize())
  }

  updateWindowSize () {
    this.props.shouldDockDrawer(window.innerWidth)
  }

  toggleDrawer (isOpen) {
    isOpen ? this.props.closeDrawer() : this.props.openDrawer()
  }

  handleRedirectTo (path) {
    this.props.history.push(path)
    if (this.props.hasSmallScreen && this.props.isOpen)
      this.props.closeDrawer()
  }

  handleDrawerTap () {
    this.props.isDrawerOpen
    ? this.props.closeDrawer()
    : this.props.openDrawer()
  }

  async selectCompany (id) {
    await this.props.setUserCurrentSubdomain(
      this.props.companies.getIn([`${id}`, 'subdomain']),
      this.props.companies.getIn([`${id}`, 'name']),
      id)
    this.props.history.push(`/companies/${id}`)
    if (this.props.hasSmallScreen && this.props.isOpen)
      this.props.closeDrawer()
  }

  render () {
    return (
      <AppDrawer
        toggleDrawer={(isOpen) => this.toggleDrawer(isOpen)}
        redirectToAccount={(e) => this.redirectToAccount(e)}
        isOpen={this.props.isOpen}
        navBarTitle={this.props.navBarTitle}
        companies={this.props.companies.delete('status')}
        currentCompanyId={this.props.currentCompanyId}
        hasSmallScreen={this.props.hasSmallScreen}
        onRedirectTo={(e) => this.handleRedirectTo(e)}
        selectCompany={(id) => this.selectCompany(id)} />
    )
  }
}

function mapStateToProps ({drawer, companies, navBar, user}) {
  return {
    companies,
    isOpen: drawer.get('isOpen'),
    navBarTitle: navBar.get('title'),
    hasSmallScreen: drawer.get('hasSmallScreen'),
    currentCompanyId: user.get('currentCompanyId'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...drawerActionCreators},
    dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppDrawerContainer))
