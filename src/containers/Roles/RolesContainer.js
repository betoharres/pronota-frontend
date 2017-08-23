import React, { Component } from 'react'
import { Roles } from '../../components'

import * as roleActionCreators from '../../redux/modules/roles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
    this.props.setNavBarTitle('Permissões')
  }

  redirectTo (selectedRow) {
    const id = this.props.roles.valueSeq().toArray()[selectedRow].get('id')
    this.props.history.push(`/roles/${id}/edit`)
  }

  handleDestroyRole (id) {
    this.props.handleDestroyRole(this.props.currentSubdomain, id)
  }

  render () {
    return (
      <Roles
        isLoading={this.props.isLoading}
        roles={this.props.roles}
        redirectTo={(path) => this.redirectTo(path)}
        onDestroyRole={(id) => this.handleDestroyRole(id)} />
    )
  }
}

function mapStateToProps ({roles, user}) {
  roles = roles.delete('status')
  const noRoles = (roles.size === 0)
  return {
    noRoles,
    roles,
    currentSubdomain: user.get('currentSubdomain'),
    currentCompanyName: user.get('currentCompanyName'),
    isLoading: roles.getIn(['status', 'isLoading']),
    lastUpdated: roles.getIn(['status', 'lastUpdated']),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...roleActionCreators,
                             ...navBarActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesContainer)
