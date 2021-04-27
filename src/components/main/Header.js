import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../../firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, IconButton, ButtonBase, Menu, MenuItem, Avatar } from '@material-ui/core'
import { HeaderSearch } from '.'
import { grey } from '@material-ui/core/colors'
import Notifications from '@material-ui/icons/Notifications'
import MoreVert from '@material-ui/icons/MoreVert'
import { PATHS } from '../../constants';
// import { accountAction, authAction } from '../../actions';

const styles = {
  container: {
    height: 64,
    margin: "0px 8px",
    display: 'flex',
    alignItems: 'center'
  },
  buttonContainer: {
    display: 'flex'
  },
  button: {
    textTransform: 'none',
    borderRadius: 10,
    fontWeight: 'bold',
    color: grey[500]
  },
  search: {
    flex: 1
  },
  logoContainer: {
    borderRadius: 20,
  },
  logo: {
    padding: 4,
    margin: 8
  },
  nameAvatar: {
    backgroundColor: 'black',
    height: 20,
    width: 20,
    marginRight: 5
  }
}

const pageButtons = [
  {
    name: 'Profile',
    path: '',
    type: 'account'
  },
]

const HeaderPageButtons = (props) => {
  if (props.currentUser) {
    return (
      pageButtons.map((page) => {
        let display = page.name
        if (page.type === 'account') {
          display = <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={styles.nameAvatar}>{props.currentUser.displayName.charAt(0)}</Avatar>
            {props.currentUser.displayName}
          </div>
        }
        return <Button style={props.location.pathname.includes(page.name.toLowerCase()) ? { ...styles.button, color: 'rgb(0,0,0)' } : styles.button}
          onClick={() => props.history.push(page.path)}
        >
          {display}
        </Button>
      })
    )
  } else {
    return
  }
}

const OptionsPopOver = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    props.onClick()
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const onLogout = () => {
    props.onLogout()
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

class Header extends Component {
  state = {
    options: false
  }

  render() {
    return (
      <div style={styles.container}>
        <ButtonBase style={styles.logoContainer} onClick={this.logoPress.bind(this)}>
          Logo
        </ButtonBase>
        <HeaderSearch style={styles.search} />
        <div style={styles.buttonContainer}>
          <HeaderPageButtons {...this.props} />
          <IconButton >
            <Notifications />
          </IconButton>
          <OptionsPopOver
            open={this.state.options}
            onClick={() => this.setState({ options: true })}
            onLogout={this.logout.bind(this)}
          />
        </div>
      </div>
    )
  }

  logoPress() {
    this.props.history.push(PATHS.home)
  }

  logout() {
    this.props.firebase.signOut()
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user
  }
}

export default compose(
  withFirebase,
  withRouter
)(connect(mapStateToProps)(Header))