import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initialize } from 'redux-form'
import { RoleForm } from '../../components'
import * as rolesActionCreators from '../../redux/modules/roles'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as snackbarActionCreators from '../../redux/modules/snackbar'

class RoleFormContainer extends Component {

  async componentDidMount () {
    if (this.props.id) {
      this.props.setNavBarTitle('Editar Permissão')
      if (await this.props.fetchAndHandleRole(this.props.id)) {
        this.props.initialize('RoleForm', {role: this.props.role})
      }
    } else {
      this.props.setNavBarTitle('Nova Permissão')
    }
  }

  handleSubmitRole (role) {
    if (this.props.id) {
      this.props.handleUpdateRole(this.props.id, role)
      this.props.showSnackbar('Permissão atualizada com sucesso')
    } else {
      this.props.handleCreateRole(role)
      this.props.showSnackbar('Permissão criada com sucesso')
    }
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
    }
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...navBarActionCreators,
    ...rolesActionCreators,
    ...snackbarActionCreators,
    ...{initialize},
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleFormContainer)
