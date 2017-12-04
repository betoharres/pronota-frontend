import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initialize } from 'redux-form'
import { CompanyForm } from '../../components'
import * as clientsActionCreators from '../../redux/modules/clients'
import * as navBarActionCreators from '../../redux/modules/navBar'

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
    } else {
      this.props.handleCreateClient(client)
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
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...navBarActionCreators,
    ...clientsActionCreators,
    ...{initialize},
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientFormContainer)
