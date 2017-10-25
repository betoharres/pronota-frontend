import React, { Component } from 'react'
import { Field } from 'redux-form/immutable'

import {
  AutoCompleteForm,
  TextForm,
  CheckBoxForm
} from '../../components/FormComponents'

import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'

import { parseToAutocomplete } from '../../utils'
import { cidades, UF } from '../../datasources'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from '../../redux/modules/user'
import * as activitiesActionCreators from '../../redux/modules/activities'

import { required, alphaNumeric, number } from '../../validations'
import './styles.css'

// TODO: Validate valorServicos
class ServiceForm extends Component {

  async componentDidMount () {
    await this.props.fetchAndHandleMultipleActivities(
      this.props.currentSubdomain
    )
  }

  render () {
    return (
      <div>
        <div className='dividerService'>
          <Subheader>Servico</Subheader>
          <Divider />
        </div>
        <div className='serviceField'>
          <Field name='ufId' label='UF' component={AutoCompleteForm}
            dataSource={UF} dataSourceConfig={{text: 'sigla', value: 'id'}}
            validate={[alphaNumeric, required]} />
        </div>
        <div className='serviceField'>
          <Field name='cidadeId' label='Cidade' component={AutoCompleteForm}
            dataSource={cidades} dataSourceConfig={{text: 'nome', value: 'id'}}
            validate={[alphaNumeric, required]} />
        </div>
        <div className='serviceField'>
          <Field
            validate={[required, alphaNumeric]}
            name='activityId'
            component={AutoCompleteForm}
            dataSourceConfig={{text: 'nome', value: 'id'}}
            dataSource={this.props.autocompleteActivities} label='Atividade' />
        </div>
        <div className='serviceField'>
          <Field
            name='valorServicos'
            label='Valor Servicos'
            component={TextForm}
            validate={[required, number]} />
        </div>
        <div className='serviceField'>
          <Field name='baseCalculo' label='Base Calculo' component={TextForm}
            validate={[required, number]} />
        </div>
        <div className='serviceField'>
          <Field name='aliquotaServicos' label='Aliquota do Servico'
            component={TextForm} validate={[number]} />
        </div>
        <div className='serviceField'>
          <Field name='valorDeducoes' label='Valor Deducoes' component={TextForm}
            validate={[number]} />
        </div>
        <div className='serviceField'>
          <Field name='valorPis' label='Valor PIS' component={TextForm}
            validate={[number]} />
        </div>
        <div className='serviceField'>
          <Field name='valorCofins' label='Valor Cofins' component={TextForm}
            validate={[number]} />
        </div>
        <div className='serviceField'>
          <Field name='valorInss' label='Valor INSS' component={TextForm}
            validate={[number]} />
        </div>
        <div className='serviceField'>
          <Field name='valorIr' label='Valor IR' component={TextForm}
            validate={[number]} />
        </div>
        <div className='serviceField'>
          <Field name='valorCsll' label='Valor CSLL' component={TextForm}
            validate={[number]} />
        </div>
        <br/>
        <div className='serviceField'>
          <Field name='issRetido' label='ISS Retido' component={CheckBoxForm} />
        </div>
        <div className='serviceField'>
          <Field name='valorIssRetido' label='Valor ISS Retido'
            component={TextForm} validate={[number]} />
        </div>
        <div className='serviceField'>
          <Field name='valorDescIncond' label='Valor Desconto Incondicionado'
            component={TextForm} validate={[number]} />
        </div>
        <div className='serviceField'>
          <Field name='valorDescCond' label='Valor Desconto Condicionado'
             component={TextForm} validate={[number]} />
        </div>
        <div className='serviceField'>
          <Field name='outrasRetencoes' label='Outras Retencoes'
             component={TextForm} validate={[number]} />
        </div>
        <div className='serviceField'>
          <Field name='valorLiquidoNfse' label='Valor Liquido NFSE'
            component={TextForm} validate={[number]} />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ user, activities }) {
  activities = activities.delete('status')
  const autocompleteActivities = parseToAutocomplete(activities, {id: 'id', text: 'nome'})

  return {
    activities,
    autocompleteActivities,
    currentSubdomain: user.get('currentSubdomain'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...activitiesActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceForm)
