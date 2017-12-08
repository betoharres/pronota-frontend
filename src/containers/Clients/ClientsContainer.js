import React, { Component } from 'react'
import { Clients } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as clientsActionCreators from '../../redux/modules/clients'

class ClientsContainer extends Component {

  async componentDidMount () {
    await this.props.fetchAndHandleMultipleClients()
    this.props.setNavBarTitle('Clientes')
  }

  handleRowClick (selectedRow) {
    const id = this.props.clients.valueSeq().toArray()[selectedRow].get('id')
    this.props.history.push(`/clients/${id}/edit`)
  }

  redirectTo (path) {
    this.props.history.push(path)
  }

  handleDestroyClient (id) {
    this.props.handleDestroyClient(id)
  }

  render () {
    return (
      <Clients
        isLoading={this.props.isLoading}
        clients={this.props.clients}
        redirectTo={(path) => this.redirectTo(path)}
        onRowClick={(selectedRow) => this.handleRowClick(selectedRow)}
        onDestroyClient={(id) => this.handleDestroyClient(id)} />
    )
  }
}

function mapStateToProps ({clients, user}) {
  return {
    noClients: clients.size === 0,
    clients: clients.delete('status'),
    currentCompanyName: user.get('currentCompanyName'),
    isLoading: clients.getIn(['status', 'isLoading']),
    lastUpdated: clients.getIn(['status', 'lastUpdated']),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...clientsActionCreators,
    ...navBarActionCreators
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsContainer)
