import React, {Component} from 'react'
import { Company } from '../../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { staleCompany, staleUserRole } from '../../utils'
import * as companiesActionsCreators from '../../redux/modules/companies'
import * as userActionCreators from '../../redux/modules/user'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as rpsActionCreators from '../../redux/modules/rps'

class CompanyContainer extends Component {

  handleRedirectToRoles () {
    this.props.history.push('/roles')
  }

  handleRedirectToRPS (selectedRow) {
    const id = this.props.rps.valueSeq().toArray()[selectedRow].get('id')
    this.props.history.push(`/rps/${id}/edit`)
  }

  async componentDidMount () {
    // if (this.props.noCompany || staleCompany(this.props.lastUpdated)) {
    if (true) {
      await this.props.fetchAndHandleCompany(id)
      const { subdomain, name, id } = this.props
      await this.props.setUserCurrentSubdomain(subdomain, name, id)
      await this.props.fetchAndHandleMultipleRps(subdomain)
      await this.props.fetchAndHandleUserRole(subdomain)
    } else if (!this.props.noCompany) {
      const { subdomain, name, id } = this.props
      await this.props.setUserCurrentSubdomain(subdomain, name, id)
      if (staleUserRole(this.props.lastUpdatedUserRole))
        await this.props.fetchAndHandleUserRole(this.props.currentSubdomain)
    }
      this.props.setNavBarTitle(this.props.name)
  }

  async destroyCompany () {
    if (await this.props.handleDestroyCompany(this.props.id, this.props.name)) {
      this.props.history.push('/account')
    }
  }

  render () {
    return (
      <Company name={this.props.name}
        multipleRPS={this.props.rps}
        roleName={this.props.roleName}
        destroyCompany={() => this.destroyCompany()}
        onRedirectToRoles={() => this.handleRedirectToRoles()}
        onRedirectToRPS={(rps) => this.handleRedirectToRPS(rps)}
        isLoadingCompany={this.props.isLoadingCompany}
        isLoadingRole={this.props.isLoadingRole} />
    )
  }
}

function mapStateToProps ({companies, user, rps}, {match}) {
  rps = rps.delete('status')
  const { id } = match.params
  const company = companies.get(id)
  const noCompany = typeof company  === 'undefined'

  if (noCompany) {
    return {
      id,
      noCompany,
      rps,
      name: '',
      subdomain: '',
      roleName: '',
      isLoadingRole: true,
      isLoadingCompany: true,
      lastUpdated: 0,
      lastUpdatedUserRole: 0,
      currentSubdomain: user.get('currentSubdomain'),
    }
  } else {
      return {
        id,
        noCompany,
        rps,
        name: company.get('name'),
        subdomain: company.get('subdomain'),
        roleName: user.getIn(['role', 'info', 'name']),
        isLoadingRole: user.getIn(['role', 'isLoading']),
        isLoadingCompany: companies.getIn(['status', 'isLoading']),
        lastUpdated: companies.getIn(['status', 'lastUpdated']),
        lastUpdatedUserRole: user.getIn(['role', 'lastUpdated']),
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
