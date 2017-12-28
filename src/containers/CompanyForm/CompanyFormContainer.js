import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initialize } from 'redux-form'
import { CompanyForm } from '../../components'
import * as companiesActionCreators from '../../redux/modules/companies'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as snackbarActionCreators from '../../redux/modules/snackbar'

class CompanyFormContainer extends Component {

  async componentDidMount () {
    if (this.props.id) {
      const company = await this.props.fetchAndHandleCompany(this.props.id)
      if (company) { this.props.initialize('CompanyForm', {company}) }
      this.props.setNavBarTitle('Editar Empresa')
    } else {
      this.props.setNavBarTitle('Nova Empresa')
    }
  }

  async handleSubmitCompany (company) {
    let newCompany = null
    if (this.props.id) {
      newCompany = await this.props.handleUpdateCompany(this.props.id, company)
      newCompany
        ? this.props.showSnackbar('Empresa atualizada com sucesso')
        : this.props.showSnackbar('Erro ao atualizar Empresa')
    } else {
      newCompany = await this.props.handleCreateCompany(company)
      newCompany
        ? this.props.showSnackbar('Empresa criada com sucesso')
        : this.props.showSnackbar('Erro ao criar Empresa')
    }
    if (newCompany) {this.props.history.push(`/companies/${newCompany.id}`)}
  }

  render () {
    return (
      <CompanyForm
        isCompany={true}
        hasSubdomain={true}
        resourceName='company'
        onSubmit={(company) => this.handleSubmitCompany(company)} />
    )
  }
}

function mapStateToProps ({companies}, {match}) {
  const { id } = match.params
  if (id) {
    return {
      id,
      company: companies.get(id),
    }
  }
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...navBarActionCreators,
    ...companiesActionCreators,
    ...snackbarActionCreators,
    ...{initialize},
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyFormContainer)
