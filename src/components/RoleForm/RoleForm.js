import React from 'react'
import { reduxForm, FormSection, Field } from 'redux-form/immutable'
import { TextForm } from '../../components/FormComponents'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import './styles.css'

function RoleForm (props) {

  return (
    <div className='roleFormContainer'>
      <Paper className='paperRoleContainer'>
        <form onSubmit={props.handleSubmit}>
          <FormSection name='role'>
            <div className='roleFormField'>
              <Field name='name' label='Nome' component={TextForm} />
            </div>
            <div className='roleFormSubmitContainer'>
              <RaisedButton type='submit' label={'Enviar'} fullWidth={true}
                disabled={props.pristine || props.submitting} />
            </div>
          </FormSection>
        </form>
      </Paper>
    </div>
  )
}
export default reduxForm({form: 'RoleForm'})(RoleForm)
