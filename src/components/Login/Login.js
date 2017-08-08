import React from 'react'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { TextForm } from '../../components/FormComponents'

import { reduxForm, Field } from 'redux-form/immutable'

function Login (props) {

  return (
    <div className='centeredContainer'>
      <Paper style={{padding: 20, margin: 20}} zDepth={2}>
        <h1 className='center'>Login</h1>
        <br />
        <Divider />
        <br />
        <form onSubmit={props.handleSubmit}>
          <Field name='email' label='E-mail' component={TextForm} />
          <Field name='password' label='Senha' type="password" component={TextForm} />
          <RaisedButton type='submit' label={'Entrar'} fullWidth={true}
            disabled={props.pristine || props.submitting} />
        </form>
      </Paper>
    </div>
  )

}

export default reduxForm({form: 'LoginForm'})(Login)
