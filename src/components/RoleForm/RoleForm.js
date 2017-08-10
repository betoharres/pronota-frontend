import React, { Component } from 'react'
import { reduxForm, FormSection, Field } from 'redux-form/immutable'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import './styles.css'

class RoleForm extends Component {

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

  render () {
    return (
      <div className='roleFormContainer'>
        <form onSubmit={this.props.handleSubmit}>
          <FormSection name='role'>
            <div className='roleFormField'>
              <Field name='name' label='Nome' component={this.renderTextField} />
            </div>
            <div className='roleFormSubmitContainer'>
              <RaisedButton type='submit' label={'Enviar'} fullWidth={true}
                disabled={this.props.pristine || this.props.submitting} />
            </div>
          </FormSection>
        </form>
      </div>
    )
  }
}
export default reduxForm({form: 'RoleForm'})(RoleForm)
