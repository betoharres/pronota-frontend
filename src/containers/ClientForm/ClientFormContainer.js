import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initialize } from 'redux-form'
import { CompanyForm } from '../../components'
import * as clientsActionCreators from '../../redux/modules/clients'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as snackbarActionCreators from '../../redux/modules/snackbar'

class ClientFormContainer extends Component {

  async componentDidMount () {
    if (this.props.id) {
      this.props.setNavBarTitle('Editar Cliente')
      if (await this.props.fetchAndHandleClient(this.props.id)) {
        this.props.initialize('CompanyForm', {cliente: this.props.client})
      }
    } else {
      this.props.setNavBarTitle('Novo Cliente')
    }
  }

  handleSubmitClient (client) {
    if (this.props.id) {
      this.props.handleUpdateClient(this.props.id, client)
        ? this.props.showSnackbar('Cliente atualizado com sucesso')
        : this.props.showSnackbar('Erro ao atualizar Cliente')
    } else {
      this.props.handleCreateClient(client)
        ? this.props.showSnackbar('Cliente criado com sucesso')
        : this.props.showSnackbar('Erro ao criar Cliente')
    }
  }

  render () {
    return (
      <CompanyForm isCompany={false} resourceName='cliente'
          onSubmit={(client) => this.handleSubmitClient(client)} />
    )
  }
}

function mapStateToProps ({user, clients}, {match}) {
  const { id } = match.params
  if (id) {
    return {
      id,
      client: clients.get(id),
    }
  }
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...navBarActionCreators,
    ...clientsActionCreators,
    ...snackbarActionCreators,
    ...{initialize},
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientFormContainer)
