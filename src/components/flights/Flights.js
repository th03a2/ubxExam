import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withAuthorization } from '../../session'
import { withFirebase } from '../../firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Icon } from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import { Main } from '../'
import { FlightCard, AddFlight } from '.'

class Flights extends Component {

  actions = [
    {
      icon: <Icon path={mdiPlus} size={1} />,
      onClick: () => this.setState({ openFlight: true })
    }
  ]

  state = {
    loading: false,
    flights: null,
    openFlight: false
  }

  componentDidMount() {
    this.setState({ loading: true })
    const flightsRef = this.props.firebase.flights()
    flightsRef.onSnapshot(snapshot => {
      this.setState({ flights: snapshot.docs, loading: false })
    })
  }
  handleLike = (pk, current) => {
    this.props.firebase.addLikeOnFlight(pk, current)
  }
  handleDelete = (pk) => {
    this.props.firebase.removeFlight(pk)
  }

  render() {
    const { flights, openFlight } = this.state
    return (
      <Main actions={this.actions}>
        {this.renderFlightCards(flights)}
        <AddFlight open={openFlight} onClose={() => this.setState({ openFlight: false })} />
      </Main>
    )
  }

  renderFlightCards(flights) {
    if (flights) {
      return flights.sort((a, b) => a.current > b.current ? 1 : -1)
        .map((flight) => {
          // console.log(flight);
          // console.log(flight._delegate._key.path.segments[6]);
          return <FlightCard
            details={flight.data()}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
        })
    }
  }

}

const condition = authUser => !!authUser;

export default connect()(
  compose(
    withRouter,
    withFirebase,
    withAuthorization(condition),
  )(Flights))