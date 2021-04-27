import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Icon from '@mdi/react'
import airport from 'airport-codes'
import moment from 'moment'
import { mdiAirplane } from '@mdi/js'
import { Box } from '@material-ui/core'
import { Overlay } from '.'
import { grey } from '@material-ui/core/colors'

const cardHeight = 300
const cardWidth = 236

const styles = {
  overlay: {
    borderRadius: 10,
    background: 'rgba(0,0,0,0.1)',
    height: '100%',
  },
  overlayHidden: {
    transform: `scale(0.8) translateY(-${cardHeight * 1.2}px)`
  },
  overlayShown: {
    transform: `scale(1) translateY(-${cardHeight}px)`
  },
  card: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    height: cardHeight,
    width: cardWidth,
    position: 'relative',
  },
  airportCode: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Anton',
    fontSize: 32
  },
  airportName: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 12
  }
}

/**
* @augments {Component<{  item:object>}
*/
class FlightCard extends Component {

  state = {
    hovered: false
  }

  render() {
    const { pk, details } = this.props
    const { hovered } = this.state
    return (
      <div style={styles.container}
        onMouseOver={this.hover.bind(this)}
        onMouseLeave={this.unhover.bind(this)}
      >
        <Box style={styles.card}>
          {this.renderFlight(pk, details)}
        </Box>
        <Overlay show={hovered} style={styles.overlay} styleShown={styles.overlayShown} styleHidden={styles.overlayHidden} />
      </div>
    )
  }

  renderFlight(pk, details) {
    return (
      <div style={{ height: '97%', width: '97%', borderRadius: 8, backgroundColor: grey[200], position: 'relative' }} key={pk} >
        <div style={{ position: 'absolute', right: 0, top: 0, margin: 'auto' }}>
          <button onClick={() => this.deleteFlight(pk)} >x</button>
        </div>
        <button onClick={() => this.updateFlight(pk, details)} >Update</button>
        <div
          style={{ height: '65%', fontFamily: 'Open Sans Condensed', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 120 }}
        >
          <span style={{ zIndex: 1, cursor: 'grabbing' }} onClick={() => this.likeFlight(pk, details, this.props.userId)}>{details.current}</span>
        </div>
        <div style={{ height: '10%', display: 'flex', justifyContent: 'center' }}>
          {moment(details.date).format("LL")}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ flex: 2 }}>
            <div style={styles.airportCode}>
              {details.origin}
            </div>
            <div style={styles.airportName}>
              {this.formatAirport(airport.findWhere({ iata: details.origin }).get('name'))}
            </div>
          </div>
          <Icon
            style={{ flex: 1 }}
            path={mdiAirplane}
            rotate={90}
            size={2}
          />
          <div style={{ flex: 2 }}>
            <div style={styles.airportCode}>
              {details.destination}
            </div>
            <div style={styles.airportName}>{
              this.formatAirport(airport.findWhere({ iata: details.destination }).get('name'))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  formatAirport(airport) {
    return airport.replace(/\b(\w*Intl\w*)\b/g, "")
      .replace(/\b(\w*Airport\w*)\b/g, "")
  }

  hover() {
    // this.setState({ hovered: true })
  }

  unhover() {
    this.setState({ hovered: false })
  }

  deleteFlight(pk) {
    let has_deleted = window.confirm("Are you sure you want to delete this flight?")
    if (has_deleted === true) {
      this.props.onDelete(pk)
    } else {
      alert("Your flight is not deleted")
    }
  }
  likeFlight(pk, flights, userid) {
    this.props.onLike(pk, flights, userid)
  }
  updateFlight(pk, flight) {
    this.props.onUpdate(pk, flight)
  }
}

FlightCard.propTypes = {
  item: PropTypes.object
}

const mapStateToProps = (state) => ({
  userId: state.auth.user.uid
})

export default connect(
  mapStateToProps
)(FlightCard)

// export default FlightCard