import React, { Component } from 'react'
import { Map } from 'immutable'
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

  state = {
    autoCompleteCompanies: [{}],
    allCompanies: Map({}),
  }

  buildAutoCompleteCompanies () {
    let { companies, clients, affiliates } = this.props
    companies = companies.delete('status')
    clients = clients.delete('status')
    affiliates = affiliates.delete('status')

    const allCompanies = companies.merge(clients).merge(affiliates)
    if (companies || clients || affiliates)
      this.setState({
        autoCompleteCompanies: parseToAutocomplete(allCompanies, {id: 'id', text: 'name'}),
        allCompanies: allCompanies
      })
  }

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
    this.buildAutoCompleteCompanies()
  }

  handleSubmitRPS (rps) {
    const prestadorPath = ['rps', 'prestadorAttributes']
    const tomadorPath = ['rps', 'tomadorAttributes']
    rps = rps.mergeIn(prestadorPath, this.buildCompanyObject(rps.getIn(prestadorPath)))
    rps = rps.mergeIn(tomadorPath, this.buildCompanyObject(rps.getIn(tomadorPath)))
    if (this.props.id){
      this.props.handleUpdateRps(this.props.currentSubdomain, this.props.id, rps)
    } else {
      this.props.handleCreateRps(this.props.currentSubdomain, rps)
    }
  }

  buildCompanyObject (selectedId) {
    if (this.state.autoCompleteCompanies) {
      const company = this.state.allCompanies.get(selectedId.toString())
      return Map({
              cnpj: company.get('cnpj'),
              cpf: company.get('cpf'),
              tipo: company.get('tipo'),
              inscMunicipal: company.get('inscMunicipal'),
              razaoSocial: company.get('razaoSocial'),
              logradouro: company.get('logradouro'),
              numero: company.get('numero'),
              complemento: company.get('complemento'),
              bairro: company.get('bairro'),
              cidadeId: company.get('cidadeId'),
              ufId: company.get('ufId'),
              cep: company.get('cep'),
              email: company.get('email'),
              fone: company.get('fone'),
            })
    }
  }

  render () {
    return (
      <RPSForm onSubmit={(rps) => this.handleSubmitRPS(rps)}
               autoCompleteCompanies={this.state.autoCompleteCompanies} />
    )
  }
}

function mapStateToProps ({user, rps, activities, companies, clients, affiliates}, {match}) {
  const { id } = match.params

  if (id) {
    return {
      id,
      rps: rps.get(id),
      companies,
      clients,
      affiliates,
      currentSubdomain: user.get('currentSubdomain'),
    }
  } else {
    return {
      companies,
      clients,
      affiliates,
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
