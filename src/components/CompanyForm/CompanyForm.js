import React from 'react'
import { reduxForm, Field, FormSection } from 'redux-form/immutable'
import { TextForm, AutoCompleteForm, SelectForm, CheckBoxForm } from '../../components/FormComponents'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import { UF, cidades } from '../../datasources'
import './styles.css'

function CompanyForm (props) {
  return (
    <div className='companyFormField'>
        <form onSubmit={props.handleSubmit}>
          <FormSection name={props.resourceName}>
            <div className='companyFormField'>
              <Field name='name' label='Nome' component={TextForm} />
            </div>
            {props.isCompany
              ? <div className='companyFormField'>
                  <Field name='subdomain' label='Dominio' component={TextForm} />
                </div>
              : null}
            <div className='companyFormField'>
              <Field name='nomeFantasia' label='Nome Fantasia' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='simplesNacional' label='Simples Nacional' component={CheckBoxForm} />
            </div>
            <div className='companyFormField'>
              <Field name='incentivadorCultural' label='Incentivador Cultural' component={CheckBoxForm} />
            </div>
            <div className='companyFormField'>
              <Field name='razaoSocial' label='Razao Social' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='tipo' label='Tipo' component={SelectForm}>
                <MenuItem value={'pessoa_juridica'} primaryText={'Pessoa Juridica'} />
                <MenuItem value={'pessoa_fisica'} primaryText={'Pessoa Fisica'} />
              </Field>
            </div>
            <div className='companyFormField'>
              <Field name='cnpj' label='CNPJ' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='cpf' label='CPF' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='inscEstadual' label='Inscricao Estadual' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='inscMunicipal' label='Inscricao Municipal' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='ufId' label='UF' component={AutoCompleteForm}
                dataSource={UF} dataSourceConfig={{text: 'sigla', value: 'id'}} />
            </div>
            <div className='companyFormField'>
              <Field name='cidadeId' label='Cidade' component={AutoCompleteForm}
                dataSource={cidades} dataSourceConfig={{text: 'nome', value: 'id'}} />
            </div>
            <div className='companyFormField'>
              <Field name='cep' label='CEP' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='logradouro' label='Logradouro' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='numero' label='Numero' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='complemento' label='Complemento' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='bairro' label='Bairro' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='email' label='Email' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='fone' label='Fone' component={TextForm} />
            </div>
            <div>
              <RaisedButton type='submit' label={'Enviar'} fullWidth={true}
                disabled={props.pristine || props.submitting} />
            </div>
          </FormSection>
        </form>
      </div>
    )
}

export default reduxForm({form: 'CompanyForm'})(CompanyForm)
