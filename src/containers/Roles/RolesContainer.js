import React, { Component } from 'react'
import { Roles } from '../../components'

import * as roleActionCreators from '../../redux/modules/roles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Map } from 'immutable'
import { staleRoles } from '../../utils'
import * as navBarActionCreators from '../../redux/modules/navBar'

class RolesContainer extends Component {

  async componentDidMount () {
    if (this.props.noRoles || staleRoles(this.props.lastUpdated)) {
      await this.props.fetchAndHandleMultipleRoles(this.props.currentSubdomain)
    } else {
      const rolesInArray = []
      this.props.roles.map((role) => rolesInArray.push(role.toJS()))
      this.props.loadingMultipleRolesSuccess(rolesInArray)
    }
    this.props.setNavBarTitle('Cargos')
  }

  goToEdit (id) {
    this.props.history.push(`/roles/${id}/edit`)
  }

  handleDestroyRole (id) {
    this.props.handleDestroyRole(this.props.currentSubdomain, id)
  }

  redirectToNewRoles () {
    this.props.history.push('/roles/new')
  }

  render () {
    return (
      <div>
        <Roles isLoading={this.props.isLoading} roles={this.props.roles}
          goToEdit={(id) => this.goToEdit(id)}
          handleDestroyRole={(id) => this.handleDestroyRole(id)}
          onRedirectToNewRoles={() => this.redirectToNewRoles()} />
          <br />
      </div>
    )
  }
}

function mapStateToProps ({roles, user}) {
  const noRoles = (roles.delete('status').size === 0)
  if (noRoles) {
    return {
      noRoles,
      roles: Map({}),
      currentSubdomain: user.get('currentSubdomain'),
      isLoading: roles.getIn(['status', 'isLoading']),
      lastUpdated: roles.getIn(['status', 'lastUpdated']),
    }
  } else {
    return {
      noRoles,
      roles: roles.get('info'),
      currentSubdomain: user.get('currentSubdomain'),
      currentCompanyName: user.get('currentCompanyName'),
      isLoading: roles.getIn(['status', 'isLoading']),
      lastUpdated: roles.getIn(['status', 'lastUpdated']),
    }
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...roleActionCreators,
                             ...navBarActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesContainer)
