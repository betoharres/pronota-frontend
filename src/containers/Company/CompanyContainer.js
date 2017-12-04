import React, {Component} from 'react'
import { Company } from '../../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { staleCompany, staleUserRole } from '../../utils'
import * as companiesActionsCreators from '../../redux/modules/companies'
import * as userActionCreators from '../../redux/modules/user'
import * as navBarActionCreators from '../../redux/modules/navBar'

class CompanyContainer extends Component {

  handleRedirectToRoles () {
    this.props.history.push('/roles')
  }

  handleRedirectToRPS (selectedRow) {
    const id = this.props.rps.valueSeq().toArray()[selectedRow].get('id')
    this.props.history.push(`/rps/${id}/edit`)
  }

  async loadCompany () {
    const { id } = this.props
    if (this.props.noCompany || staleCompany(this.props.lastUpdated)) {
      const { subdomain, name } = await this.props.fetchAndHandleCompany(id)
      this.props.setNavBarTitle(this.props.name)
      await this.props.setUserCurrentSubdomain(subdomain, name, id)
      await this.props.fetchAndHandleUserRole(subdomain)
    } else {
      this.props.setNavBarTitle(this.props.name)
      if (staleUserRole(this.props.lastUpdatedUserRole))
        await this.props.fetchAndHandleUserRole()
    }
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.loadCompany()
    }
  }

  async componentDidMount () {
    this.loadCompany()
  }

  async destroyCompany () {
    if (await this.props.handleDestroyCompany(this.props.id, this.props.name)) {
      this.props.history.push('/account')
    }
  }

  redirectTo (path) {
    this.props.history.push(path)
  }

  render () {
    return (
      <Company name={this.props.name}
        roleName={this.props.roleName}
        destroyCompany={() => this.destroyCompany()}
        redirectTo={(path) => this.redirectTo(path)}
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
      name: '',
      subdomain: '',
      roleName: '',
      isLoadingRole: true,
      isLoadingCompany: true,
      lastUpdated: 0,
      lastUpdatedUserRole: 0,
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
        lastUpdatedUserRole: user.getIn(['role', 'lastUpdated']),
      }
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...companiesActionsCreators,
    ...userActionCreators,
    ...navBarActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer)
