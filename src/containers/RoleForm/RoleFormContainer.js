import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initialize } from 'redux-form'
import { RoleForm } from '../../components'
import * as rolesActionCreators from '../../redux/modules/roles'
import * as navBarActionCreators from '../../redux/modules/navBar'

class RoleFormContainer extends Component {

  async componentDidMount () {
    this.props.setNavBarTitle('Nova Permissao')
    if (this.props.id) {
      if (await this.props.fetchAndHandleRole(this.props.currentSubdomain, this.props.id)) {
        this.props.initialize('RoleForm', {role: this.props.role})
      }
    }
  }

  handleSubmitRole (role) {
    this.props.id
      ? this.props.handleUpdateRole(this.props.currentSubdomain, this.props.id, role)
      : this.props.handleCreateRole(this.props.currentSubdomain, role)
  }

  render () {
    return (
      <RoleForm isCompany={false} resourceName='role'
          onSubmit={(role) => this.handleSubmitRole(role)} />
    )
  }
}

function mapStateToProps ({user, roles}, {match}) {
  const { id } = match.params
  if (id) {
    return {
      id,
      role: roles.get(id),
      currentSubdomain: user.get('currentSubdomain'),
    }
  } else {
    return {
      currentSubdomain: user.get('currentSubdomain'),
    }
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...navBarActionCreators,
    ...rolesActionCreators,
    ...{initialize},
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleFormContainer)
