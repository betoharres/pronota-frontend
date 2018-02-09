import React, { Component } from 'react'
import { Field, reduxForm, FormSection } from 'redux-form/immutable'
import { AutoCompleteForm, SelectForm } from '../../components/FormComponents'
import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import SignIcon from 'material-ui/svg-icons/action/assignment-turned-in'
import PDFIcon from 'material-ui/svg-icons/image/picture-as-pdf'

import './styles.css'

import { ServiceForm } from '../../components'
import { required } from '../../validations'

class RPSForm extends Component {

  static defaultProps = {
    isSigned: false,
  }

  renderDatePicker ({input, label, meta: {touched, error}, ...custom}) {
    let date
    if (input.value.length > 0 && input.value.match(/^\d{4}-\d{2}-\d{2}$/)){
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
        errorText={touched && error}
        onChange={(e, value) => {input.onChange(value)}}
        {...custom}
      />
    )
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

    const { rps, onOpenPDF, onSignClick } = this.props
    const isSigned = rps && rps.get('assinatura') ? true : false

    return (
      <div className='rpsContainer'>
        <div className="rpsActionButtons">
          <RaisedButton icon={<SignIcon />} onClick={onSignClick}
            primary={!(isSigned)} disabled={!this.props.rps} label='Assinar'/>
          <RaisedButton disabled={!(isSigned)} primary={isSigned}
            icon={<PDFIcon />} onClick={onOpenPDF} />
        </div>
          <form onSubmit={this.props.handleSubmit}>
            <FormSection name='rps'>
              <Paper className='rpsPaperContainer'>
                <div className='rpsField'>
                  <Field
                    name='tomadorAttributes'
                    label='Tomador'
                    validate={[required]}
                    component={AutoCompleteForm}
                    dataSource={this.props.autoCompleteCompanies}
                    dataSourceConfig={{text: 'name', value: 'id'}} />
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
                  <Field
                    name='natOperId'
                    component={SelectForm}
                    validate={[required]}
                    label='Natureza da Operação'>
                    {naturezaOperacao.map((natOper, index) =>
                      <MenuItem key={index} value={natOper.id} primaryText={natOper.descricao} />
                    )}
                  </Field>
                </div>
                <div className='rpsField'>
                  <Field
                    name='regimeId'
                    component={SelectForm}
                    validate={[required]}
                    label='Regime Tributação'>
                    {regimeTributacao.map((regime, index) =>
                      <MenuItem key={index} value={regime.id} primaryText={regime.descricao} />
                    )}
                  </Field>
                </div>
                <FormSection name={'serviceAttributes'}>
                  <ServiceForm />
                </FormSection>
                <div>
                  <RaisedButton type='submit' label={'Enviar'} fullWidth={true}
                    disabled={this.props.pristine || this.props.submitting} />
                </div>
              </Paper>
            </FormSection>
          </form>
      </div>
    )
  }
}

export default reduxForm({form: 'RPSForm'})(RPSForm)
