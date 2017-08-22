import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as drawerActionCreators from '../../redux/modules/drawer'
import * as userActionCreators from '../../redux/modules/user'
import * as companiesActionCreators from '../../redux/modules/companies'

import { CompaniesDrawer } from '../../components'

class CompaniesDrawerContainer extends Component {

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

  redirectToNewCompany (e) {
    this.props.history.push('/companies/new')
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
  }

  render () {
    return (
      <CompaniesDrawer toggleDrawer={(isOpen) => this.toggleDrawer(isOpen)}
        isOpen={this.props.isOpen} companies={this.props.companies.delete('status')}
        hasSmallScreen={this.state.hasSmallScreen}
        redirectToNewCompany={(e) => this.redirectToNewCompany(e)}
        selectCompany={(id) => this.selectCompany(id)} />
    )
  }
}

function mapStateToProps ({drawer, companies}) {
  return {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompaniesDrawerContainer))
