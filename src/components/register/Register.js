import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../../firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Box, TextField as MaterialTextField, IconButton } from '@material-ui/core'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import RemoveRedEyeOutlined from '@material-ui/icons/RemoveRedEyeOutlined'
import { Button } from '../common'
import { grey } from '@material-ui/core/colors'
import { authAction } from '../../actions'
import { PATHS } from '../../constants';


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
  nameContainer: {
    display: 'flex',
    margin: '15px 0px'
  },
  emailContainer: {
    margin: '15px 0px'
  },
  passwordContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '15px 0px'
  }
}

const TextField = (props) => {
  const textFieldStyles = makeStyles({
    input: { height: 20, fontSize: 14, padding: "7px 11px" },
    label: { fontSize: 14, transform: "translate(14px, 10px) scale(1)" }
  })

  const classes = textFieldStyles()
  return <MaterialTextField
    InputProps={{ classes: { input: classes.input } }}
    InputLabelProps={{ classes: { outlined: classes.label } }}
    {...props}
  />
}

class Register extends Component {
  state = {
    firstName: {
      value: null,
      error: null
    },
    lastName: {
      value: null,
      error: null
    },
    email: {
      value: null,
      error: null
    },
    password: {
      value: null,
      error: null,
      confirm: null,
      show: false
    },
  }

  render() {
    const { firstName, lastName, email, password } = this.state
    return (
      <div style={styles.body}>
        <Box style={styles.main}>
          <div style={styles.nameContainer}>
            <TextField
              fullWidth
              style={{ marginRight: 16 }}
              variant='outlined'
              label='First Name'
              error={firstName.error}
              onChange={(event) => this.setState({ firstName: { value: event.target.value, error: null } })}
            />
            <TextField
              fullWidth
              variant='outlined'
              label='Last Name'
              error={lastName.error}
              onChange={(event) => this.setState({ lastName: { value: event.target.value, error: null } })}
            />
          </div>
          <div style={styles.emailContainer}>
            <TextField
              fullWidth
              variant='outlined'
              label='Email'
              email={email.error}
              onChange={(event) => this.setState({ email: { value: event.target.value, error: null } })}
            />
          </div>
          <div style={styles.passwordContainer}>
            <TextField
              fullWidth
              style={{ marginRight: 16 }}
              variant='outlined'
              label='Password'
              type={password.show ? 'string' : 'password'}
              onChange={(event) => this.setState({ password: { ...password, value: event.target.value, error: null } })}
            />
            <TextField
              fullWidth
              variant='outlined'
              label='Confirm'
              type={password.show ? 'string' : 'password'}
              onChange={(event) => this.setState({ password: { ...password, confirm: event.target.value, error: null } })}
            />
            <IconButton
              style={{ padding: 6, margin: '0px 6px' }}
              onClick={() => this.setState({ password: { ...password, show: !password.show } })}
            >
              {
                password.show ?
                  <RemoveRedEye />
                  : <RemoveRedEyeOutlined />
              }
            </IconButton>
          </div>
          <div style={styles.buttonOuterContainer}>
            <div style={styles.buttonInnerContainer}>
              <Button
                color='primary'
                onClick={() => this.props.history.push(PATHS.login)}
              >
                Sign in instead
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={() => this.register()}
              >
                Next
              </Button>
            </div>
          </div>
        </Box>
      </div>
    )
  }

  async register() {
    const { email, password, firstName, lastName } = this.state

    try {
      const authUser = await this.props.firebase.createUserWithEmailAndPassword(email.value, password.value)
      await authUser.user.updateProfile({
        displayName: `${firstName.value} ${lastName.value}`
      })
      const userDoc = await this.props.firebase.user(authUser.user.uid)
      userDoc.set({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        role: "user"
      })
      this.props.setUser(authUser)
      this.props.history.push(PATHS.home) //need proper success screen
    } catch (error) {
      this.setState({
        error: error
      })
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    setUser(user) {
      dispatch(authAction.setUser(user))
    }
  })
}

export default connect(null, mapDispatchToProps)(
  compose(
    withFirebase,
    withRouter
  )(Register)
)
