import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import NotFound from './config/NotFound'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { loginLocalCredentials } from './redux/modules/user'
import { fetchAndHandleMultipleCompanies } from './redux/modules/companies'
import { saveQueryCredentials } from './utils'

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
  ActivitiesContainer,
  ClientsContainer,
  CertificatesContainer,
} from './containers'

import { Loading } from './components'

import './App.css'

class App extends Component {

  async componentWillMount () {
    if (window.location.search.length > 0) {
      saveQueryCredentials(window.location.search)
    }
    const user = await this.props.dispatch(loginLocalCredentials())
    if (user) {await this.props.dispatch(fetchAndHandleMultipleCompanies())}
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <ModalContainer />
            {this.props.isAuthenticating
              ? <Route component={Loading} />
              : this.props.isAuthenticated
                ? <NavBarContainer>
                    <Switch>
                      <Route exact path='/' component={() => <Redirect to='/account' />} />
                      <Route exact path='/account' component={AccountContainer} />
                      <Route exact path='/companies/new' component={CompanyFormContainer} />
                      <Route exact path='/companies/:id' component={CompanyContainer} />
                      <Route exact path='/companies/:id/edit' component={CompanyFormContainer} />
                      <Route exact path='/clients' component={ClientsContainer} />
                      <Route exact path='/clients/new' component={ClientFormContainer} />
                      <Route exact path='/clients/:id/edit' component={ClientFormContainer} />
                      <Route exact path='/affiliates/new' component={AffiliateFormContainer} />
                      <Route exact path='/affiliates/:id/edit' component={AffiliateFormContainer} />
                      <Route exact path='/rps' component={RPSIndexContainer} />
                      <Route exact path='/rps/new' component={RPSFormContainer} />
                      <Route exact path='/rps/:id/edit' component={RPSFormContainer} />
                      <Route exact path='/roles' component={RolesContainer} />
                      <Route exact path='/roles/new' component={RoleFormContainer} />
                      <Route exact path='/roles/:id/edit' component={RoleFormContainer} />
                      <Route exact path='/activities' component={ActivitiesContainer} />
                      <Route exact path='/activities/new' component={ActivityFormContainer} />
                      <Route exact path='/activities/:id/edit' component={ActivityFormContainer} />
                      <Route exact path='/certificates' component={CertificatesContainer} />
                      <NotFound component={() => <span>Pagina nao encontrada</span>}/>
                    </Switch>
                  </NavBarContainer>
                : <Switch>
                    <Route exact path='/' component={HomeContainer} />
                    <NotFound component={() => <HomeContainer notFound={true} />} />
                  </Switch>
            }
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
