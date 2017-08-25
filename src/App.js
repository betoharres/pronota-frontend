import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './config/NotFound'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { validateLocalCredentials } from './redux/modules/user'
import { fetchAndHandleMultipleCompanies } from './redux/modules/companies'

import {
  NavBarContainer,
  AccountContainer,
  HomeContainer,
  ModalContainer,
  CompanyFormContainer,
  CompanyContainer,
  ClientFormContainer,
  AffiliateFormContainer,
  RolesContainer,
  RPSFormContainer,
  RoleFormContainer,
  ActivityFormContainer,
  RPSIndexContainer,
} from './containers'

import './App.css'

class App extends Component {

  async componentWillMount () {
    if (await this.props.dispatch(validateLocalCredentials())) {
      await this.props.dispatch(fetchAndHandleMultipleCompanies())
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <ModalContainer />
            <Switch>
              <Route exact path='/' component={HomeContainer} />
              {this.props.isAuthenticated
                ? <NavBarContainer>
                    <Switch>
                      <Route exact path='/account' component={AccountContainer} />
                      <Route exact path='/companies/new' component={CompanyFormContainer} />
                      <Route exact path='/companies/:id' component={CompanyContainer} />
                      <Route exact path='/companies/:id/edit' component={CompanyFormContainer} />
                      <Route exact path='/clients/new' component={ClientFormContainer} />
                      <Route exact path='/clients/:id' component={ClientFormContainer} />
                      <Route exact path='/affiliates/new' component={AffiliateFormContainer} />
                      <Route exact path='/affiliates/:id/edit' component={AffiliateFormContainer} />
                      <Route exact path='/roles' component={RolesContainer} />
                      <Route exact path='/rps' component={RPSIndexContainer} />
                      <Route exact path='/rps/new' component={RPSFormContainer} />
                      <Route exact path='/rps/:id/edit' component={RPSFormContainer} />
                      <Route exact path='/roles/new' component={RoleFormContainer} />
                      <Route exact path='/roles/:id/edit' component={RoleFormContainer} />
                      <Route exact path='/activities/new' component={ActivityFormContainer} />
                      <Route exact path='/activities/:id/edit' component={ActivityFormContainer} />
                      <NotFound isAuthenticating={this.props.isAuthenticating}
                        component={() => <div>Pagina não encontrada</div>} />
                      </Switch>
                    </NavBarContainer>
                  : <NotFound isAuthenticating={this.props.isAuthenticating}
                      component={() => <HomeContainer />} />
              }
            </Switch>
          </div>
        </Router>
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
