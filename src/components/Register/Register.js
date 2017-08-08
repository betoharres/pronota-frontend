import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { TextForm } from '../../components/FormComponents'
import { reduxForm, Field } from 'redux-form/immutable'

import './styles.css'

function Register (props) {

  return (
    <div className='centeredContainer'>
      <Paper style={{padding: 20, margin: 20}} zDepth={2}>
        <h1 className='center'>Registre-se</h1>
        <form onSubmit={props.handleSubmit}>
            <Field name='email' label='E-mail' component={TextForm} />
            <Field name='password' label='Senha' type="password" component={TextForm} />
            <Field name='password_confirmation' label='Confirme a Senha' type="password" component={TextForm} />
            <RaisedButton type='submit' label={'Entrar'} fullWidth={true}
              primary={true} disabled={props.pristine || props.submitting} />
        </form>
      </Paper>
    </div>
  )

}

export default reduxForm({form: 'RegisterForm'})(Register)
