import React from 'react'
import { reduxForm, Field, FormSection } from 'redux-form/immutable'
import { TextForm, AutoCompleteForm, SelectForm, CheckBoxForm } from '../../components/FormComponents'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { alphaNumeric, required, number, maxLength, email, cpf, cnpj } from '../../validations'
import { UF, cidades } from '../../datasources'
import './styles.css'

function CompanyForm (props) {

  return (
    <div className='divContainer'>
      <Paper className='companyFormContainer'>
        <form onSubmit={props.handleSubmit}>
          <FormSection name={props.resourceName}>
            <div className='companyFormField'>
              <Field name='name' validate={[required, alphaNumeric]}
                label='Nome' component={TextForm} />
            </div>
            {props.isCompany
              ? <div className='companyFormField'>
                <Field name='subdomain' validate={[required, alphaNumeric]}
                  label='Dominio' component={TextForm} />
                </div>
              : null}
            <div className='companyFormField'>
              <Field name='nomeFantasia' validate={[alphaNumeric]}
                label='Nome Fantasia' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='simplesNacional' label='Simples Nacional' component={CheckBoxForm} />
            </div>
            <div className='companyFormField'>
              <Field name='incentivadorCultural' label='Incentivador Cultural' component={CheckBoxForm} />
            </div>
            <div className='companyFormField'>
              <Field name='razaoSocial' validate={[alphaNumeric]} label='Razao Social' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='tipo' label='Tipo' validate={[required]} component={SelectForm}>
                <MenuItem value={'pessoa_juridica'} primaryText={'Pessoa Juridica'} />
                <MenuItem value={'pessoa_fisica'} primaryText={'Pessoa Fisica'} />
              </Field>
            </div>
            <div className='companyFormField'>
              <Field name='cnpj' label='CNPJ' validate={[cnpj]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='cpf' label='CPF' validate={[cpf]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='inscEstadual' label='Inscricao Estadual' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='inscMunicipal' label='Inscricao Municipal' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='ufId' label='UF' validate={[required]} component={AutoCompleteForm}
                dataSource={UF} dataSourceConfig={{text: 'sigla', value: 'id'}} />
            </div>
            <div className='companyFormField'>
              <Field name='cidadeId' label='Cidade' validate={[required]} component={AutoCompleteForm}
                dataSource={cidades} dataSourceConfig={{text: 'nome', value: 'id'}} />
            </div>
            <div className='companyFormField'>
              <Field name='cep' label='CEP' validate={[number]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='logradouro' label='Logradouro' validate={[alphaNumeric]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='numero' label='Numero' validate={[number]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='complemento' label='Complemento' validate={[alphaNumeric]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='bairro' label='Bairro' validate={[alphaNumeric]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='email' label='Email' validate={[email]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='fone' label='Fone' validate={[number]} component={TextForm} />
            </div>
            <div>
              <RaisedButton type='submit' label={'Enviar'} fullWidth={true}
                disabled={props.pristine || props.submitting} />
            </div>
          </FormSection>
        </form>
      </Paper>
    </div>
  )
}

export default reduxForm({form: 'CompanyForm'})(CompanyForm)
