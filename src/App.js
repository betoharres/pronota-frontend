import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { HomeContainer, ModalContainer } from './containers'
import './App.css'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <ModalContainer />
          <Router>
            <Switch>
              <Route exact path='/' component={HomeContainer} />
              <Route component={() => <div>Pagina nao encontrada</div>}/>
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect()(App)
