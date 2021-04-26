import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, TextField, CircularProgress } from '@material-ui/core'
import { Button } from '../common'
import { grey } from '@material-ui/core/colors'
import { withFirebase } from '../../firebase'
import { PATHS, PATTERNS } from '../../constants'
import utils from '../../utils'
import { accountAction } from '../../actions';

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  main: {
    height: 500,
    width: 450,
    borderRadius: 10,
    border: `1px solid ${grey[400]}`,
    boxSizing: 'border-box',
    padding: '48px 40px 36px',
    position: 'relative',
  },
  buttonOuterContainer: {
    position: 'absolute',
    left: 48,
    right: 48,
    bottom: 36
  },
  buttonInnerContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}

class Login extends Component {
  state = {
    email: {
      value: null,
      error: null
    },
    password: null,
    error: null,
    loading: false
  }

  async login() {
    this.setState({ loading: true })
    const { email, password } = this.state
    this.onEmailBlur(email.value)

    if (!email.error) {
      try {
        const authRef = await this.props.firebase.signInWithEmailAndPassword(email.value, password)
        const userDoc = await this.props.firebase.user(authRef.user.uid)
        const user = await userDoc.get()

        this.redirectToLandingPage(user.data())
        this.props.history.push(PATHS.flights)
      } catch (error) {
        this.setState({ loading: false, error: utils.authErrorHandler(error) })
      }
    }

    this.setState({ loading: false })
  }

  onEmailBlur(value) {
    if (value && !value.match(PATTERNS.email)) {
      this.setState({ email: { value: value, error: "Invalid email." } })
    }
  }

  redirectToLandingPage(user) {
    this.props.setProfile(user)
    switch (user.role) {
      case "airline": this.props.history.push(PATHS.flights)
        break;
      default: this.props.history.push(PATHS.home)
        break;
    }
  }

  render() {
    const { error, loading, email } = this.state
    return (
      <div style={styles.body}>
        <Box style={styles.main}>
          <div>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              style={{ margin: '10px 0px' }}
              onChange={event => this.setState({ email: { value: event.target.value.trim(), error: null }, error: null })}
              onKeyPress={(event) => utils.onPressEnter(event, this.login.bind(this))}
              onBlur={(event) => this.onEmailBlur(event.target.value.trim())}
              error={!!error || !!email.error}
              helperText={email.error}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              style={{ margin: '10px 0px' }}
              onChange={event => this.setState({ password: event.target.value, error: null })}
              onKeyPress={(event) => utils.onPressEnter(event, this.login.bind(this))}
              error={!!error}
              helperText={!!error && error}
            />
          </div>
          <div style={styles.buttonOuterContainer}>
            <div style={styles.buttonInnerContainer}>
              <Button
                color="primary"
                onClick={() => this.props.history.push(PATHS.register)}
              >
                Create account
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={() => this.login()}
              >
                Next
                {loading && <CircularProgress size={24} style={styles.buttonProgress} />}
              </Button>
            </div>
          </div>
        </Box>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    setProfile(user) {
      dispatch(accountAction.setProfile(user))
    }
  })
}

export default
  compose(
    withFirebase,
    withRouter
  )(connect(null, mapDispatchToProps)(Login))

