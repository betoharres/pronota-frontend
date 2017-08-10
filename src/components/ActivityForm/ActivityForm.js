import React, { Component } from 'react'
import { reduxForm, Field, FormSection } from 'redux-form/immutable'
import AutoComplete from 'material-ui/AutoComplete'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import { tributacaoMunicipio, CNAE }from '../../datasources'

import './styles.css'

class ActivityForm extends Component {

  renderTextField ({ input, label, meta: { touched, error }, ...custom}) {
    return (
      <TextField hintText={label}
      fullWidth={true}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom} />
    )
  }

  renderSelectField ({ input, label, meta: { touched, error },
    children, ...custom }) {
    return (
      <SelectField
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
        fullWidth={true}
        maxSearchResults={6}
        onNewRequest={(e, i, v) => input.onChange(e[custom.dataSourceConfig['value']])}
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
      <div className='activityContainer'>
        <h1 className='activityTitle'>
          {this.props.isNewRecord ? 'Nova Atividade' : 'Editar Atividade'}
        </h1>
        <form onSubmit={this.props.handleSubmit}>
          <FormSection name='activity'>
            <div className='activityField'>
              <Field name='nome' label='Nome' component={this.renderTextField} />
            </div>
            <div className='activityField'>
              <Field name='discriminacao' label='Discriminacao'
                component={this.renderTextField} />
            </div>
            <div className='activityField'>
              <Field name='cnaeId' label='CNAE' dataSource={CNAE}
                dataSourceConfig={{text: 'descricao', value: 'cnaeId'}}
                component={this.renderAutoCompleteField} />
            </div>
            <div className='activityField'>
              <Field name='tributacaoMunicipioId' label='Tributacao do Municipio'
                dataSourceConfig={{text: 'descricao', value: 'tributacaoMunicipioId'}}
                dataSource={tributacaoMunicipio}
                component={this.renderAutoCompleteField} />
            </div>
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

export default reduxForm({form: 'ActivityForm'})(ActivityForm)
