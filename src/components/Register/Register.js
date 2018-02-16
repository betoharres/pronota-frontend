import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { TextForm } from '../../components/FormComponents'
import { reduxForm, Field } from 'redux-form/immutable'
import { email, required, minLength } from '../../validations'

import './styles.css'

const minLength8 = minLength(8)

function Register (props) {

  return (
    <div>
      <h1 className='center'>Registre-se</h1>
      <form onSubmit={props.handleSubmit}>
          <Field name='email' label='E-mail' component={TextForm} validate={[required, email]}/>
          <Field name='password' label='Senha' type="password" component={TextForm}
            validate={[required, minLength8]}/>
          <Field name='password_confirmation' label='Confirme a Senha' type="password" component={TextForm}
            validate={[required, minLength8]}/>
          <RaisedButton type='submit' label={'Entrar'} fullWidth={true}
            primary={true} disabled={props.pristine || props.submitting} />
      </form>
    </div>
  )

}

export default reduxForm({form: 'RegisterForm'})(Register)
