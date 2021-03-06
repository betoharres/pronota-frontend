import React from 'react'
import { reduxForm, Field, FormSection } from 'redux-form/immutable'
import { TextForm, AutoCompleteForm, CheckBoxForm } from '../../components/FormComponents'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'

import { maxLength, alphaNumeric, required, number, exactLength, email, cpf, cnpj } from '../../validations'
import { UF, cidades } from '../../datasources'
import './styles.css'

export const SelectTipo = props => (
  <SelectField
    fullWidth={true}
    floatingLabelText={props.label}
    errorText={props.meta.touched && props.meta.error}
    onChange={(event, index, value) => {
      props.onSetIsCompany(value === 'pessoa_juridica' ? true : false)
      return props.input.onChange(value)
    }}
    children={props.children}
    value={props.input.value} />
);

function CompanyForm (props) {

  const cepLength = exactLength(8)
  const foneMaxLength = maxLength(11)
  const emailMaxLength = maxLength(80)
  const complementoMaxLength = maxLength(60)
  const logradouroMaxLength = maxLength(125)
  const numeroMaxLength = maxLength(10)
  const razaoSocialMaxLength = maxLength(115)
  const inscMunicipalMaxLength = maxLength(15)

  return (
    <div className='divContainer'>
      <Paper className='companyFormContainer'>
        <form onSubmit={props.handleSubmit}>
          <FormSection name={props.resourceName}>
            <div className='companyFormField'>
              <Field name='name' validate={[required]}
                label='Nome' component={TextForm} />
            </div>
            {props.hasSubdomain
              ? <div className='companyFormField'>
                  <Field name='subdomain' validate={[required, alphaNumeric]}
                    label='Username da Empresa' component={TextForm} />
                </div>
              : <div className='companyFormField'>
                  <Field name='tipo' label='Tipo' validate={[required]}
                    onSetIsCompany={(value) => props.onSetIsCompany(value)} component={SelectTipo}>
                    <MenuItem value={'pessoa_juridica'} primaryText={'Pessoa Juridica'} />
                    <MenuItem value={'pessoa_fisica'} primaryText={'Pessoa Fisica'} />
                  </Field>
                </div>
            }
            {props.isCompany
                ? <div>
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
                      <Field name='razaoSocial' validate={[razaoSocialMaxLength]}
                        label='Razao Social' component={TextForm} />
                    </div>
                    <div className='companyFormField'>
                      <Field name='inscEstadual' label='Inscricao Estadual' component={TextForm} />
                    </div>
                    <div className='companyFormField'>
                      <Field name='inscMunicipal' label='Inscricao Municipal'
                        validate={[inscMunicipalMaxLength]} component={TextForm} />
                    </div>
                    <div className='companyFormField'>
                      <Field name='cnpj' label='CNPJ' validate={[cnpj]} component={TextForm} />
                    </div>
                  </div>
                : <div className='companyFormField'>
                    <Field name='cpf' label='CPF' validate={[cpf]} component={TextForm} />
                  </div>
              }
            <div className='companyFormField'>
              <Field name='ufId' label='UF' validate={[required]} component={AutoCompleteForm}
                dataSource={UF} dataSourceConfig={{text: 'sigla', value: 'id'}} />
            </div>
            <div className='companyFormField'>
              <Field name='cidadeId' label='Cidade' validate={[required]} component={AutoCompleteForm}
                dataSource={cidades} dataSourceConfig={{text: 'nome', value: 'id'}} />
            </div>
            <div className='companyFormField'>
              <Field name='cep' label='CEP' validate={[cepLength, number]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='logradouro' label='Logradouro'
                validate={[logradouroMaxLength]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='numero' label='Numero' validate={[number, numeroMaxLength]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='complemento' label='Complemento'
                validate={[complementoMaxLength]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='bairro' label='Bairro' component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='email' label='Email' validate={[email, emailMaxLength]} component={TextForm} />
            </div>
            <div className='companyFormField'>
              <Field name='fone' label='Fone' validate={[number, foneMaxLength]} component={TextForm} />
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
