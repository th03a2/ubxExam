import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { AuthUserContext } from './session';
import { withFirebase } from './firebase'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import configureStore from './store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Home, Login, Register, Flights } from './components'
import { PATHS, COLORS } from './constants'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {

  state = {
    authUser: null
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null })
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={configureStore()}>
          <Router>
            <Switch>
              <Redirect exact from={"/"} to={PATHS.home} />
              <Route path={PATHS.home} render={() => <Home />} />
              <Route path={PATHS.login} render={() => <Login />} />
              <Route path={PATHS.register} render={() => <Register />} />
              <AuthUserContext.Provider value={this.state.authUser}>
                <Route path={PATHS.flights} render={() => <Flights />} />
              </AuthUserContext.Provider>
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default withFirebase(App)
