import React, { Component } from 'react'
import { Map } from 'immutable'
import { Field, reduxForm, FormSection } from 'redux-form/immutable'
import { AutoCompleteForm, TextForm, SelectForm } from '../../components/FormComponents'
import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'

import './styles.css'

import { ServiceForm } from '../../components'

class RPSForm extends Component {

  renderDatePicker ({input, label, meta: {touched, error}, ...custom}) {
    return (
      <DatePicker hintText={label} mode={'portrait'} fullWidth={true}
        onChange={(e, value) => input.onChange(value)}
        value={input.value !== '' ? {controlledDate: input.value} : {controlledDate: null}}
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

  parseSelectedCompany (value) {
    const selectedCompany = this.props.autoCompleteCompanies[value -1]
    const company = this.props.allCompanies.get(selectedCompany.id.toString())
    return this.buildCompanyObject(company)
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
        <Paper className='rpsPaperContainer'>
          <form onSubmit={this.props.handleSubmit}>
            <FormSection name='rps'>
              <div className='rpsField'>
                <Field name='prestadorAttributes' label='Prestador' component={AutoCompleteForm}
                  dataSource={this.props.autoCompleteCompanies} dataSourceConfig={{text: 'name', value: 'id'}}
                  normalize={(value) => this.parseSelectedCompany(value)} />
              </div>
              <div className='rpsField'>
                <Field name='tomadorAttributes' label='Tomador' component={AutoCompleteForm}
                    dataSource={this.props.autoCompleteCompanies} dataSourceConfig={{text: 'name', value: 'id'}}
                    normalize={(value) => this.parseSelectedCompany(value)}/>
              </div>
              <div className='rpsField'>
                <Field name='serie' component={TextForm} label="Serie" />
              </div>
              <div className='rpsField'>
                <Field name='tipo' component={SelectForm} label="Tipo">
                  <MenuItem value={0} primaryText={'Registro de Prestação de Serviços'} />
                  <MenuItem value={1} primaryText={'Nota Fiscal Conjugada (Mista)'} />
                  <MenuItem value={2} primaryText={'Cupom'} />
                </Field>
              </div>
              <div className='rpsField'>
                <Field name='emissao' component={this.renderDatePicker} label="Emissao" />
              </div>
              <div className='rpsField'>
                <Field name='situacao' component={SelectForm} label="Situacao">
                    <MenuItem value={0} primaryText={'Normal'} />
                    <MenuItem value={1} primaryText={'Cancelado'} />
                </Field>
              </div>
              <div className='rpsField'>
                <Field name='natOperId' component={AutoCompleteForm}
                  dataSourceConfig={{text: 'descricao', value: 'id'}}
                  dataSource={naturezaOperacao} label='Natureza da Operacao' />
              </div>
              <div className='rpsField'>
                <Field name='regimeId' component={AutoCompleteForm}
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
        </Paper>
      </div>
    )
  }
}

export default reduxForm({form: 'RPSForm'})(RPSForm)
