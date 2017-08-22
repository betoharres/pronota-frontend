import React, { Component } from 'react'
import { Account } from '../../components'

import { connect } from 'react-redux'
import { setNavBarTitle } from '../../redux/modules/navBar'

class AccountContainer extends Component {

  componentDidMount () {
    this.props.dispatch(setNavBarTitle('Minha Conta'))
  }

  redirectToCompany = (companyId) => {
    this.props.history.push(`/companies/${companyId}`)
  }

  render () {
    return (
      <Account openModal={(e) => this.openModal(e)}
        companies={this.props.companies}
        redirectToCompany={(companyId) => this.redirectToCompany(companyId)} />
    )
  }
}

function mapStateToProps ({companies}) {
  companies = companies.delete('status')
  return {
    companies,
  }
}

export default connect(mapStateToProps)(AccountContainer)
