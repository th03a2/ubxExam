import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header } from '.'
import { Fab } from '@material-ui/core'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    height: window.innerHeight - 64,
  },
}

/**
* @augments {Component<{  actions:arrayOfobject),  backgroundColor:string>}
*/
class Main extends Component {
  render() {
    return (
      <div >
        <Header />
        <div style={{ ...styles.container, backgroundColor: this.props.backgroundColor }}>
          {this.props.children}
        </div>
        <div style={{ position: 'fixed', bottom: 10, right: 10, display: 'flex', flexDirection: 'column' }}>
          {
            this.props.actions ? this.props.actions.map((action) => {
              return <Fab style={{ height: 40, width: 40, margin: '5px 5px' }} color={action.color} onClick={() => action.onClick()}>
                {action.icon}
              </Fab>
            }) : null
          }
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
  backgroundColor: PropTypes.string
}

export default Main