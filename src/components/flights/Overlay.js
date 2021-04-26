import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'

const styles = {
  overlay: {
    background: 'rgba(0,0,0,0.5)',
    transition: 'all 0.15s ease-in-out 0s'
  }
}

const Overlay = (props) => {
  return (
    props.show ?
      <Box style={{ ...styles.overlay, ...props.style, ...props.styleShown, opacity: 1 }} />
      : <Box style={{ ...styles.overlay, ...props.style, ...props.styleHidden, opacity: 0 }} />
  )
}

Overlay.propTypes = {
  show: PropTypes.bool,
  style: PropTypes.object,
  styleShown: PropTypes.object,
  styleHidden: PropTypes.object
}

export default Overlay