import React from 'react'
import { reduxForm, Field, FormSection } from 'redux-form/immutable'
import { TextForm, AutoCompleteForm } from '../../components/FormComponents'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { tributacaoMunicipio, CNAE }from '../../datasources'

import './styles.css'

function ActivityForm (props) {

  return (
    <div className='activityContainer'>
      <Paper className='activityPaperContainer'>
        <form onSubmit={props.handleSubmit}>
          <FormSection name='activity'>
            <div className='activityField'>
              <Field name='nome' label='Nome' component={TextForm} />
            </div>
            <div className='activityField'>
              <Field name='discriminacao' label='Discriminacao'
                component={TextForm} />
            </div>
            <div className='activityField'>
              <Field name='cnaeId' label='CNAE' dataSource={CNAE}
                dataSourceConfig={{text: 'descricao', value: 'cnaeId'}}
                component={AutoCompleteForm} />
            </div>
            <div className='activityField'>
              <Field name='tributacaoMunicipioId' label='Tributacao do Municipio'
                dataSourceConfig={{text: 'descricao', value: 'tributacaoMunicipioId'}}
                dataSource={tributacaoMunicipio}
                component={AutoCompleteForm} />
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

export default reduxForm({form: 'ActivityForm'})(ActivityForm)
