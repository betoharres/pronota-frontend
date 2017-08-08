import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as drawerActionCreators from '../../redux/modules/drawer'
import * as userActionCreators from '../../redux/modules/user'
import * as companiesActionCreators from '../../redux/modules/companies'

import { CompaniesDrawer } from '../../components'

class CompaniesDrawerContainer extends Component {

  async componentDidMount () {
    await this.props.fetchAndHandleMultipleCompanies()
  }

  toggleDrawer (isOpen) {
    isOpen ? this.props.closeDrawer() : this.props.openDrawer()
  }

  redirectToNewCompany (e) {
    e.stopPropagation()
    // this.context.router.push('/companies/new')
    this.props.closeDrawer()
  }

  selectCompany (id) {
    this.props.closeDrawer()
    this.props.setUserCurrentSubdomain(
      this.props.companies.getIn([`${id}`, 'subdomain']),
      this.props.companies.getIn([`${id}`, 'name'])
    )
    // this.context.router.push(`/companies/${id}`)
  }

  render () {
    return (
      <CompaniesDrawer toggleDrawer={(isOpen) => this.toggleDrawer(isOpen)}
        isOpen={this.props.isOpen} companies={this.props.companies.delete('status')}
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

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesDrawerContainer)
