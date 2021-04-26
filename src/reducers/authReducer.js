import { ACTION_TYPES } from '../constants'

export default (
  state = {
    user: null
  },

  action) => {
  switch (action.type) {
    case ACTION_TYPES.auth.setUser:
      return {
        ...state,
        user: action.payload
      }
    case ACTION_TYPES.auth.unsetUser:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}