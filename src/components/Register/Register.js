import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { TextForm } from '../../components/FormComponents'
import { reduxForm, Field } from 'redux-form/immutable'
import { email, required, minLength } from '../../validations'
import { validateUserEmail } from '../../utils'

import './styles.css'

const minLength8 = minLength(8)

const asyncValidate = async (values) => {
  const { isAvailable } = await validateUserEmail(values.get('email'))
  if (!(isAvailable)) {
    throw Object({ email: 'E-mail ja cadastrado' })
  }
}

function Register (props) {

  return (
    <div>
      <h1 className='center'>Registre-se</h1>
      <form onSubmit={props.handleSubmit}>
        <Field name='email' label='E-mail' onBlur={props.onCheckUserExists}
          component={TextForm} validate={[required, email]}/>
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

export default reduxForm({
  form: 'RegisterForm',
  asyncValidate,
  asyncBlurFields: ['email'],
})(Register)
