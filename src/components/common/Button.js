import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button as MaterialButton } from '@material-ui/core'

const useStyle = makeStyles({
  root: {
    fontWeight: 'bold',
    textTransform: 'none'
  }
})

export default (props) => {
  const classes = useStyle()
  return (
    <MaterialButton
      classes={{ root: classes.root }}
      {...props}
    >
      {props.children}
    </MaterialButton>
  )
}