import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
import { bindActionCreators } from 'redux'
import { RPSForm } from '../../components'
import * as userActionCreators from '../../redux/modules/user'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as rpsActionCreators from '../../redux/modules/rps'
import * as affiliatesActionCreators from '../../redux/modules/affiliates'
import * as clientsActionCreators from '../../redux/modules/clients'
import { parseToAutocomplete } from '../../utils'

class RPSFormContainer extends Component {

  async componentDidMount () {
      await this.props.fetchAndHandleMultipleClients(this.props.currentSubdomain)
      await this.props.fetchAndHandleMultipleAffiliates(this.props.currentSubdomain)

    if (this.props.id) {
      this.props.setNavBarTitle('Editar RPS')
      await this.props.fetchAndHandleRps(this.props.currentSubdomain, this.props.id)
      if (this.props.rps) { this.props.initialize('RPSForm', {rps: this.props.rps}) }
    } else {
      this.props.setNavBarTitle('Novo RPS')
    }
  }

  handleSubmitRPS (rps) {
    if (this.props.id){
      this.props.handleUpdateRps(this.props.currentSubdomain, this.props.id, rps)
    } else {
      this.props.handleCreateRps(this.props.currentSubdomain, rps)
    }
  }

  render () {
    return (
      <RPSForm allCompanies={this.props.allCompanies}
               parsedAllCompanies={this.props.parsedAllCompanies}
               onSubmit={(rps) => this.handleSubmitRPS(rps)} />
    )
  }
}

function mapStateToProps ({user, rps, activities, companies, clients, affiliates}, {match}) {
  const { id } = match.params
  companies = companies.delete('status')
  clients = clients.delete('status')
  affiliates = affiliates.delete('status')
  const allCompanies = companies.merge(clients).merge(affiliates)
  const parsedAllCompanies = parseToAutocomplete(allCompanies, {id: 'id', text: 'name'})

  if (id) {
    return {
      id,
      parsedAllCompanies,
      allCompanies,
      rps: rps.get(id),
      currentSubdomain: user.get('currentSubdomain'),
    }
  } else {
    return {
      parsedAllCompanies,
      allCompanies,
      currentSubdomain: user.get('currentSubdomain'),
    }
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...rpsActionCreators,
    ...userActionCreators,
    ...navBarActionCreators,
    ...affiliatesActionCreators,
    ...clientsActionCreators,
    ...{initialize}}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RPSFormContainer)
