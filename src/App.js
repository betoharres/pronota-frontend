import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './config/NotFound'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { validateLocalCredentials } from './redux/modules/user'

import {
  HomeContainer,
  ModalContainer,
  LoginContainer,
  RegisterContainer,
  CompanyFormContainer,
  CompanyContainer,
  ClientFormContainer,
  AffiliateFormContainer,
  RolesContainer,
} from './containers'

import './App.css'

class App extends Component {

  async componentDidMount () {
    await this.props.dispatch(validateLocalCredentials())
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <ModalContainer />
          <Router>
            <Switch>
              <Route exact path='/' component={HomeContainer} />
              <Route exact path='/login' component={LoginContainer} />
              <Route exact path='/register' component={RegisterContainer} />
              {this.props.isAuthenticated
                  ? <Switch>
                      <Route exact path='/companies/new' component={CompanyFormContainer} />
                      <Route exact path='/companies/:id' component={CompanyContainer} />
                      <Route exact path='/companies/:id/edit' component={CompanyFormContainer} />
                      <Route exact path='/clients/new' component={ClientFormContainer} />
                      <Route exact path='/clients/:id' component={ClientFormContainer} />
                      <Route exact path='/affiliates/new' component={AffiliateFormContainer} />
                      <Route exact path='/affiliates/:id/edit' component={AffiliateFormContainer} />
                      <Route exact path='/roles' component={RolesContainer} />
                      <NotFound isAuthenticating={this.props.isAuthenticating}
                        component={() => <div>Pagina nao encontrada(autenticado)</div>} />
                    </Switch>
                  : <NotFound isAuthenticating={this.props.isAuthenticating}
                      component={() => <div>Pagina nao encontrada(nao autenticado)</div>} />
              }
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps ({user}) {
  return {
    isAuthenticated: user.get('isAuthenticated'),
    isAuthenticating: user.get('isAuthenticating'),
  }
}

export default connect(mapStateToProps)(App)
