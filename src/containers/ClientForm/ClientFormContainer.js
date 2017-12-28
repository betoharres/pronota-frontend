import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initialize } from 'redux-form'
import { CompanyForm } from '../../components'
import { formValueSelector } from 'redux-form'
import * as clientsActionCreators from '../../redux/modules/clients'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as snackbarActionCreators from '../../redux/modules/snackbar'

class ClientFormContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isCompany: props.isCompany,
    }
  }

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

  handleSetIsCompany (isCompany) {
    this.setState({isCompany})
  }

  render () {
    console.log(this.state.isCompany)
    return (
      <CompanyForm
        resourceName='cliente'
        hasSubdomain={false}
        isCompany={this.state.isCompany}
        onSetIsCompany={(isCompany) => this.handleSetIsCompany(isCompany)}
        onSubmit={(client) => this.handleSubmitClient(client)} />
    )
  }
}

function mapStateToProps ({user, clients}, {match}) {
  const { id } = match.params
  if (id) {
    return {
      id,
      isCompany: clients.getIn([id, 'tipo']) === 'pessoa_juridica' ? true : false,
      client: clients.get(id),
    }
  }
  return {
    isCompany: true,
  }
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
