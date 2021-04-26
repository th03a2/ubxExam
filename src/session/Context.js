import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withFirebase } from '../firebase';
import { PATHS } from '../constants'
import { authAction, accountAction } from '../actions'

const AuthUserContext = React.createContext(null);

export const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(PATHS.login);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? this.renderComponent(authUser) : null
          }
        </AuthUserContext.Consumer>
      );
    }

    renderComponent(authUser) {
      this.props.firebase.getUser(authUser.uid).then((profile) => this.props.setProfile(profile))
      this.props.setUser(authUser)
      return <Component {...this.props} />
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return ({
      setUser(user) {
        dispatch(authAction.setUser(user))
      },
      setProfile(userProfile) {
        dispatch(accountAction.setProfile(userProfile))
      }
    })
  }

  return compose(
    withRouter,
    withFirebase,
  )(connect(null, mapDispatchToProps)(WithAuthorization));
};

export default AuthUserContext;