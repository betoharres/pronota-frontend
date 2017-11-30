import React, { Component } from 'react'
import { Field, reduxForm, FormSection } from 'redux-form/immutable'
import { AutoCompleteForm, TextForm, SelectForm } from '../../components/FormComponents'
import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'

import './styles.css'

import { ServiceForm } from '../../components'
import { alphaNumeric, required, number, maxLength } from '../../validations'

class RPSForm extends Component {

  renderDatePicker ({input, label, meta: {touched, error}, ...custom}) {
    let date
    if (input.value.match(/^\d{4}-\d{2}-\d{2}$/)){
      // TODO: make this work worldwide
      date = new Date(`${input.value}T12:00:00.000Z`)
    } else if (input.value) {
      date = new Date(input.value)
    } else {
      date = undefined
    }
    return (
      <DatePicker
        hintText={label}
        mode={'portrait'}
        fullWidth={true}
        value={date}
        onChange={(e, value) => {input.onChange(value)}}
        {...custom}
      />
    )
  }

  maxLength5 = maxLength(5)

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
                <Field
                  name='prestadorAttributes'
                  label='Prestador'
                  validate={[required, alphaNumeric]}
                  component={AutoCompleteForm}
                  dataSource={this.props.autoCompleteCompanies}
                  dataSourceConfig={{text: 'name', value: 'id'}} />
              </div>
              <div className='rpsField'>
                <Field
                  name='tomadorAttributes'
                  label='Tomador'
                  validate={[required, alphaNumeric]}
                  component={AutoCompleteForm}
                  dataSource={this.props.autoCompleteCompanies}
                  dataSourceConfig={{text: 'name', value: 'id'}} />
              </div>
              <div className='rpsField'>
                <Field
                  name='serie'
                  validate={[required, number, this.maxLength5]}
                  component={TextForm}
                  label="Serie" />
              </div>
              <div className='rpsField'>
                <Field
                  name='tipo'
                  validate={[required]}
                  component={SelectForm}
                  label="Tipo">
                  <MenuItem value={1} primaryText={'Recibo Provisório de Serviços'} />
                  <MenuItem value={2} primaryText={'Nota Fiscal Conjugada (Mista)'} />
                  <MenuItem value={3} primaryText={'Cupom'} />
                </Field>
              </div>
              <br/>
              <div className='rpsField'>
                <Field
                  name='emissao'
                  validate={[required]}
                  component={this.renderDatePicker}
                  label="Data do Serviço" />
              </div>
              <div className='rpsField'>
                <Field name='situacao'
                  validate={[required]}
                  component={SelectForm}
                  label="Situacao">
                    <MenuItem value={1} primaryText={'Normal'} />
                    <MenuItem value={2} primaryText={'Cancelado'} />
                </Field>
              </div>
              <div className='rpsField'>
                <Field
                  name='natOperId'
                  component={AutoCompleteForm}
                  validate={[required, alphaNumeric]}
                  dataSourceConfig={{text: 'descricao', value: 'id'}}
                  dataSource={naturezaOperacao} label='Natureza da Operacao' />
              </div>
              <div className='rpsField'>
                <Field
                  name='regimeId'
                  component={AutoCompleteForm}
                  validate={[alphaNumeric]}
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
