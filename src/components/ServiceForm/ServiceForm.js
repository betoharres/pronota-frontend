import React, { Component } from 'react'
import { Field } from 'redux-form/immutable'

import {
  AutoCompleteForm,
  TextForm,
  CheckBoxForm
} from '../../components/FormComponents'

import { parseToAutocomplete } from '../../utils'
import { UF, cidades } from '../../datasources'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from '../../redux/modules/user'
import * as activitiesActionCreators from '../../redux/modules/activities'

import './styles.css'

class ServiceForm extends Component {

  async componentDidMount () {
    await this.props.fetchAndHandleMultipleActivities(this.props.currentSubdomain)
  }

  render () {
    const { autocompleteActivities } = this.props
    return (
      <div>
        <div className='serviceField'>
          <Field name='ufId' label='UF' component={AutoCompleteForm}
            dataSource={UF} dataSourceConfig={{text: 'sigla', value: 'id'}} />
        </div>
        <div className='serviceField'>
          <Field name='cidadeId' label='Cidade' component={AutoCompleteForm}
            dataSource={cidades} dataSourceConfig={{text: 'nome', value: 'id'}} />
        </div>
        <div className='serviceField'>
          <Field name='activityId' component={AutoCompleteForm}
            dataSourceConfig={{text: 'nome', value: 'id'}}
            dataSource={autocompleteActivities} label='Atividade' />
        </div>
        <div className='serviceField'>
          <Field name='baseCalculo' label='Base Calculo' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='aliquotaServicos' label='Aliquota do Servico' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='valorDeducoes' label='Valor Deducoes' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='valorPis' label='Valor PIS' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='valorCofins' label='Valor Cofins' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='valorInss' label='Valor INSS' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='valorIr' label='Valor IR' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='valorCsll' label='Valor CSLL' component={TextForm}/>
        </div>
        <br/>
        <div className='serviceField'>
          <Field name='issRetido' label='ISS Retido' component={CheckBoxForm}/>
        </div>
        <div className='serviceField'>
          <Field name='valorIssRetido' label='Valor ISS Retido' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='valorDescIncond' label='Valor Desconto Incondicionado' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='valorDescCond' label='Valor Desconto Condicionado' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='outrasRetencoes' label='Outras Retencoes' component={TextForm}/>
        </div>
        <div className='serviceField'>
          <Field name='valorLiquidoNfse' label='Valor Liquido NFSE' component={TextForm}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({user, activities}) {
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
