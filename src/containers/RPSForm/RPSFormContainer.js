import React, { Component } from 'react'

import { SelectCertificateContainer } from '../../containers'

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
import * as activitiesActionCreators from '../../redux/modules/activities'
import * as snackbarActionCreators from '../../redux/modules/snackbar'
import * as modalActionCreators from '../../redux/modules/modal'
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
        allCompanies: allCompanies,
        autoCompleteCompanies: parseToAutocomplete(
          allCompanies, {id: 'id', text: 'name'}
        ),
      })
  }

  async componentDidMount () {
    await Promise.all([
      await this.props.fetchAndHandleMultipleClients(),
      await this.props.fetchAndHandleMultipleActivities(),
      await this.props.fetchAndHandleMultipleAffiliates(),
    ])
    this.buildAutoCompleteCompanies()

    if (this.props.id) {
      this.props.setNavBarTitle('Editar RPS')
      const rps = await this.props.fetchAndHandleRps(this.props.id)
      rps.prestadorAttributes = this.buildCompanyObject(this.props.currentCompanyId)
      if (this.props.rps) { this.props.initialize('RPSForm', {rps}) }
    } else {
      this.props.setNavBarTitle('Novo RPS')
    }
  }

  async handleSubmitRPS (rps) {
    const tomadorId = rps.getIn(['rps', 'tomadorAttributes'])
    const tomadorObject = this.buildCompanyObject(tomadorId)
    rps = rps.mergeIn(['rps', 'tomadorAttributes'], tomadorObject)
    // rps = rps.mergeIn(['rps', 'serviceAttributes'], {ufId: 1})

    if (this.props.id) {
      await this.props.handleUpdateRps(this.props.id, rps)
        ? this.props.showSnackbar('RPS atualizado com sucesso')
        : this.props.showSnackbar('Não foi possível atualizar RPS')
    } else {
      await this.props.handleCreateRps(rps)
        ? this.props.showSnackbar('RPS criado com sucesso')
        : this.props.showSnackbar('Não foi possível criar RPS')
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
              simplesNacional: company.get('simplesNacional'),
              incentivadorCultural: company.get('incentivadorCultural'),
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

  async handleOpenPDF () {
    const pdfLink = await this.props.fetchPDF(this.props.id)
    window.open(pdfLink, '_blank').focus()
  }

  handleSignClick () {
    const id = this.props.rps.get('id')
    this.props.openModal(() => <SelectCertificateContainer rpsId={id} />)
  }

  render () {
    return (
      <RPSForm onSubmit={(rps) => this.handleSubmitRPS(rps)}
        autoCompleteCompanies={this.state.autoCompleteCompanies}
        hasCertificates={this.props.hasCertificates}
        onSignClick={() => this.handleSignClick()}
        onOpenPDF={() => this.handleOpenPDF()}
        rps={this.props.rps} />
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
      currentCompanyId: user.get('currentCompanyId'),
    }
  } else {
    return {
      companies,
      clients,
      affiliates,
      currentCompanyId: user.get('currentCompanyId'),
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
    ...activitiesActionCreators,
    ...snackbarActionCreators,
    ...modalActionCreators,
    ...{initialize}}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RPSFormContainer)
