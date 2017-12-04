import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initialize } from 'redux-form'
import { CompanyForm } from '../../components'
import * as affiliateActionCreators from '../../redux/modules/affiliates'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as snackbarActionCreators from '../../redux/modules/snackbar'

class AffiliateFormContainer extends Component {

  async componentDidMount () {
    if (this.props.id) {
      this.props.setNavBarTitle('Editar Filial')
      if (await this.props.fetchAndHandleAffiliate(this.props.id)) {
        this.props.initialize('CompanyForm', {affiliate: this.props.affiliate})
      }
    } else {
      this.props.setNavBarTitle('Nova Filial')
    }
  }

  handleSubmitAffiliate (affiliate) {
    if (this.props.id) {
      this.props.handleUpdateAffiliate(this.props.id, affiliate)
      this.props.showSnackbar('Afiliado atualizado com sucesso')
    } else {
      this.props.handleCreateAffiliate(affiliate)
      this.props.showSnackbar('Afiliado criado com sucesso')
    }
  }

  render () {
    return (
      <CompanyForm isCompany={false} resourceName='filial'
          onSubmit={(affiliate) => this.handleSubmitAffiliate(affiliate)} />
    )
  }
}

function mapStateToProps ({user, affiliates}, {match}) {
  const { id } = match.params
  if (id) {
    return {
      id,
      affiliate: affiliates.get(id),
    }
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...navBarActionCreators,
    ...affiliateActionCreators,
    ...snackbarActionCreators,
    ...{initialize},
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateFormContainer)
