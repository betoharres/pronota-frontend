import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initialize } from 'redux-form'
import { CompanyForm } from '../../components'
import * as affiliateActionCreators from '../../redux/modules/affiliates'
import * as navBarActionCreators from '../../redux/modules/navBar'

class AffiliateFormContainer extends Component {

  async componentDidMount () {
    if (this.props.id) {
      if (await this.props.fetchAndHandleAffiliate(this.props.currentSubdomain, this.props.id)) {
        this.props.initialize('CompanyForm', {affiliate: this.props.affiliate})
        this.props.setNavBarTitle('Editar Filial')
      } else {
        this.props.setNavBarTitle('Nova Filial')
      }
    }
  }

  handleSubmitAffiliate (affiliate) {
    this.props.id
      ? this.props.handleUpdateAffiliate(this.props.currentSubdomain, this.props.id, affiliate)
      : this.props.handleCreateAffiliate(this.props.currentSubdomain, affiliate)
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
      currentSubdomain: user.get('currentSubdomain'),
    }
  } else {
    return {
      currentSubdomain: user.get('currentSubdomain'),
    }
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...navBarActionCreators,
    ...affiliateActionCreators,
    ...{initialize},
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateFormContainer)
