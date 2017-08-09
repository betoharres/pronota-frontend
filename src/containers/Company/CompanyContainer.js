import React, {Component} from 'react'
import { Company } from '../../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { staleCompany } from '../../utils'
import * as companiesActionsCreators from '../../redux/modules/companies'
import * as userActionCreators from '../../redux/modules/user'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as rpsActionCreators from '../../redux/modules/rps'

class CompanyContainer extends Component {

  redirectToRoles () {
    // this.context.router.push('/roles')
  }

  async componentWillMount () {
    await this.props.setUserCurrentSubdomain(this.props.subdomain, this.props.name)
  }

  async componentDidMount () {
    const { id } = this.props.match.params
    if (this.props.noCompany || staleCompany(this.props.lastUpdated)) {
      await this.props.fetchAndHandleCompany(id)
      const { subdomain, name } = this.props
      await this.props.setUserCurrentSubdomain(subdomain, name)
      await this.props.fetchAndHandleMultipleRps(subdomain)
    } else if (!this.props.noCompany) {
      this.props.fetchAndHandleUserRole(this.props.subdomain)
    }
      this.props.setNavBarTitle(this.props.name)
  }

  async destroyCompany () {
    await this.props.handleDestroyCompany(this.props.id, this.props.name)
    // ? this.context.router.push('/account') : null
  }

  render () {
    return (
      <Company name={this.props.name}
        destroyCompany={() => this.destroyCompany()}
        roleName={this.props.roleName}
        redirectToRoles={() => this.redirectToRoles()}
        isLoadingCompany={this.props.isLoadingCompany}
        isLoadingRole={this.props.isLoadingRole} />
    )
  }
}

function mapStateToProps ({companies, user}, {match}) {
  const { id } = match.params
  const company = companies.get(id)
  const noCompany = typeof company  === 'undefined'

  if (noCompany) {
    return {
      id,
      noCompany,
      name: '',
      subdomain: '',
      roleName: '',
      isLoadingRole: true,
      isLoadingCompany: true,
      lastUpdated: 0,
    }
  } else {
      return {
        id,
        noCompany,
        name: company.get('name'),
        subdomain: company.get('subdomain'),
        roleName: user.getIn(['role', 'info', 'name']),
        isLoadingRole: user.getIn(['role', 'isLoading']),
        isLoadingCompany: companies.getIn(['status', 'isLoading']),
        lastUpdated: companies.getIn(['status', 'lastUpdated']),
      }
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...companiesActionsCreators,
    ...userActionCreators,
    ...rpsActionCreators,
    ...navBarActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer)
