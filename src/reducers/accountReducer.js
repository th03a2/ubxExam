import { ACTION_TYPES } from '../constants'

export default (
  state = {
    profile: null
  },

  action) => {
  switch (action.type) {
    case ACTION_TYPES.account.setProfile:
      return {
        ...state,
        profile: action.payload
      }
    case ACTION_TYPES.account.unsetProfile:
      return {
        ...state,
        profile: null
      }
    default:
      return state
  }
}