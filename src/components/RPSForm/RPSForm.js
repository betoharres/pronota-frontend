import React, { Component } from 'react'
import { Map } from 'immutable'
import { Field, reduxForm, FormSection } from 'redux-form/immutable'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'
import DatePicker from 'material-ui/DatePicker'

import './styles.css'

import { ServiceForm } from '../../components'

class RPSForm extends Component {

  renderTextField ({ input, label, meta: { touched, error }, ...custom}) {
    return (
      <TextField hintText={label}
        floatingLabelText={label}
        fullWidth={true}
        errorText={touched && error}
        {...input}
        {...custom} />
    )
  }

  renderSelectField ({ input, label, meta: { touched, error }, children, ...custom }) {
    return (
      <SelectField
        fullWidth={true}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom} />
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
        onNewRequest={(e, i, v) => input.onChange(e[custom.dataSourceConfig['value']])}
        filter={AutoComplete.caseInsensitiveFilter}
        dataSourceConfig={custom.dataSourceConfig}
        dataSource={custom.dataSource}
        searchText={searchText}
        {...input}
        {...custom} />
    )
  }

  renderDatePicker ({input, label, meta: {touched, error}, ...custom}) {
    return (
      <DatePicker hintText={label} mode={'portrait'} fullWidth={true}
        onChange={(e, value) => input.onChange(value)}
        value={input.value !== '' ? input.value : {}}
        {...custom} />
    )
  }

  buildCompanyObject (company) {
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

  render () {

    const regimeTributacao = [
      {id: 1, descricao: 'Microempresa Municipal'},
      {id: 2, descricao: 'Estimativa'},
      {id: 3, descricao: 'Sociedade de Profissionais'},
      {id: 4, descricao: 'Cooperativa'},
      {id: 5, descricao: 'MEI – Simples Nacional'},
      {id: 6, descricao: 'ME EPP – Simples Nacional'},
    ]

    const naturezaOperacao = [
      {id: 1, descricao: 'Tributação no município'},
      {id: 2, descricao: 'Tributação fora do município'},
      {id: 3, descricao: 'Isenção'},
      {id: 4, descricao: 'Imune'},
      {id: 5, descricao: 'Exigibilidade suspensa por decisão judicial'},
      {id: 6, descricao: 'Exigibilidade suspensa por procedimento administrativo'},
    ]

    return (
      <div className='rpsContainer'>
        <h1>Novo RPS</h1>
        <form onSubmit={this.props.handleSubmit}>
          <FormSection name='rps'>
            <div className='rpsField'>
              <Field name='prestadorAttributes' label='Prestador' component={this.renderAutoCompleteField}
                dataSource={this.props.parsedAllCompanies} dataSourceConfig={{text: 'name', value: 'id'}}
                normalize={(value) => {
                  if (Number.isInteger(value)) {
                    value = value.toString()
                    const company = this.props.allCompanies.get(value)
                    return this.buildCompanyObject(company)
                  }
                  return value}
                } />
            </div>
            <div className='rpsField'>
              <Field name='tomadorAttributes' label='Tomador' component={this.renderAutoCompleteField}
                  dataSource={this.props.parsedAllCompanies} dataSourceConfig={{text: 'name', value: 'id'}}
                  normalize={(value) => {
                    if (Number.isInteger(value)) {
                      value = value.toString()
                      const company = this.props.allCompanies.get(value)
                      return this.buildCompanyObject(company)
                    }
                  }}/>
            </div>
            <div className='rpsField'>
              <Field name='serie' component={this.renderTextField} label="Serie" />
            </div>
            <div className='rpsField'>
              <Field name='tipo' component={this.renderSelectField} label="Tipo">
                <MenuItem value={0} primaryText={'Registro de Prestação de Serviços'} />
                <MenuItem value={1} primaryText={'Nota Fiscal Conjugada (Mista)'} />
                <MenuItem value={2} primaryText={'Cupom'} />
              </Field>
            </div>
            <div className='rpsField'>
              <Field name='emissao' component={this.renderDatePicker} label="Emissao" />
            </div>
            <div className='rpsField'>
              <Field name='situacao' component={this.renderSelectField} label="Situacao">
                  <MenuItem value={0} primaryText={'Normal'} />
                  <MenuItem value={1} primaryText={'Cancelado'} />
              </Field>
            </div>
            <div className='rpsField'>
              <Field name='natOperId' component={this.renderAutoCompleteField}
                dataSourceConfig={{text: 'descricao', value: 'id'}}
                dataSource={naturezaOperacao} label='Natureza da Operacao' />
            </div>
            <div className='rpsField'>
              <Field name='regimeId' component={this.renderAutoCompleteField}
                dataSource={regimeTributacao} label='Regime Tributacao'
                dataSourceConfig={{text: 'descricao', value: 'id'}} />
            </div>
            <FormSection name={'serviceAttributes'}>
              <ServiceForm />
            </FormSection>
            <div>
              <RaisedButton type='submit' label={'Enviar'} fullWidth={true}
                disabled={this.props.pristine || this.props.submitting} />
            </div>
          </FormSection>
        </form>
      </div>
    )
  }
}

export default reduxForm({form: 'RPSForm'})(RPSForm)
