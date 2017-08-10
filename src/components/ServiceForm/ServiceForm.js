import React, { Component } from 'react'
import { Field } from 'redux-form/immutable'

import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import Checkbox from 'material-ui/Checkbox'

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

  renderTextField ({ input, label, meta: { touched, error }}) {
    return (
      <TextField hintText={label} fullWidth={true}
        floatingLabelText={label}
        errorText={touched && error}
        {...input} />
    )
  }

  renderCheckBox ({input, label, meta: {touched, error}}) {
    return (
      <Checkbox label={label} checked={input.value ? true : false} onCheck={input.onChange} />
    )
  }

  renderAutoCompleteField ({ input, label, meta: { touched, error }, ...custom}) {
    const key = custom.dataSourceConfig['text']
    const selectedItem = custom.dataSource[input.value - 1]
    const searchText = selectedItem ? selectedItem[key] : ''

    return (
      <AutoComplete
        floatingLabelText={label}
        errorText={touched && error}
        maxSearchResults={6}
        fullWidth={true}
        onNewRequest={(e, i, v) => input.onChange(++i)}
        filter={AutoComplete.caseInsensitiveFilter}
        dataSourceConfig={custom.dataSourceConfig}
        dataSource={custom.dataSource}
        searchText={searchText}
        {...input}
        {...custom} />
    )
  }

  renderAutoCompleteCompaniesField ({ input, label, meta: { touched, error }, ...custom}) {
    const key = custom.dataSourceConfig['text']
    const selectedItem = custom.dataSource[input.value - 1]
    const searchText = selectedItem ? selectedItem[key] : ''

    return (
      <AutoComplete
        floatingLabelText={label}
        errorText={touched && error}
        maxSearchResults={6}
        fullWidth={true}
        onNewRequest={(e, i, v) => {input.onChange(e[custom.dataSourceConfig['value']])}}
        filter={AutoComplete.caseInsensitiveFilter}
        dataSourceConfig={custom.dataSourceConfig}
        dataSource={custom.dataSource}
        searchText={searchText}
        {...input}
        {...custom} />
    )
  }

  render () {
    return (
      <div>
        <div className='serviceField'>
          <Field name='ufId' label='UF' component={this.renderAutoCompleteField}
            dataSource={UF} dataSourceConfig={{text: 'sigla', value: 'id'}} />
        </div>
        <div className='serviceField'>
          <Field name='cidadeId' label='Cidade' component={this.renderAutoCompleteField}
            dataSource={cidades} dataSourceConfig={{text: 'nome', value: 'id'}} />
        </div>
        <div className='serviceField'>
          <Field name='activityId' component={this.renderAutoCompleteField}
            dataSourceConfig={{text: 'nome', value: 'id'}}
            dataSource={this.props.activities} label='Atividade' />
        </div>
        <div className='serviceField'>
          <Field name='baseCalculo' label='Base Calculo' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='aliquotaServicos' label='Aliquota do Servico' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='valorDeducoes' label='Valor Deducoes' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='valorPis' label='Valor PIS' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='valorCofins' label='Valor Cofins' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='valorInss' label='Valor INSS' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='valorIr' label='Valor IR' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='valorCsll' label='Valor CSLL' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='issRetido' label='ISS Retido' component={this.renderCheckBox}/>
        </div>
        <div className='serviceField'>
          <Field name='valorIssRetido' label='Valor ISS Retido' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='valorDescIncond' label='Valor Desconto Incondicionado' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='valorDescCond' label='Valor Desconto Condicionado' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='outrasRetencoes' label='Outras Retencoes' component={this.renderTextField}/>
        </div>
        <div className='serviceField'>
          <Field name='valorLiquidoNfse' label='Valor Liquido NFSE' component={this.renderTextField}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({user, activities}) {
  activities.delete('status')
  activities = parseToAutocomplete(activities, {id: 'id', text: 'nome'})
  return {
    activities,
    currentSubdomain: user.get('currentSubdomain'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...activitiesActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceForm)
