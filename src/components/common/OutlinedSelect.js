import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Select, InputLabel, FormControl, OutlinedInput } from '@material-ui/core'

const OutlinedSelect = (props) => {
  const [focus, setFocus] = useState(false)
  return (
    <FormControl
      variant='outlined'
      style={props.style}
    >
      <InputLabel htmlFor={`outlined-select-${props.label}`}>
        {props.label}
      </InputLabel>
      <Select
        native
        disabled={props.disabled}
        onChange={(event) => props.onChange(event)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={props.value}
        inputProps={{ id: `outlined-select-${props.label}` }}
        input={<OutlinedInput notched={!!props.value || focus} labelWidth={props.labelWidth} />}
        variant="outlined"
      >
        {props.children}
      </Select>
    </FormControl>
  )
}

export default OutlinedSelect
