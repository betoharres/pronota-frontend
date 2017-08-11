import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { TextForm } from '../../components/FormComponents'
import { reduxForm, Field } from 'redux-form/immutable'

import './styles.css'

function Login (props) {

  return (
    <div>
      <h1 className='center'>Login</h1>
      <form onSubmit={props.handleSubmit}>
        <Field name='email' label='E-mail' component={TextForm} />
        <Field name='password' label='Senha' type="password" component={TextForm} />
        <RaisedButton type='submit' label={'Entrar'} fullWidth={true}
          disabled={props.pristine || props.submitting} />
      </form>
    </div>
  )

}

export default reduxForm({form: 'LoginForm'})(Login)
