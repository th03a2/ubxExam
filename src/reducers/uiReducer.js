import { ACTION_TYPES } from '../constants'

export default (
  state = {
    search: {
      focus: false
    }
  },
  action) => {
  switch (action.type) {
    case ACTION_TYPES.ui.focusSearch:
      return {
        ...state,
        search: {
          focus: true
        }
      }
    case ACTION_TYPES.ui.blurSearch:
      return {
        ...state,
        search: {
          focus: false
        }
      }
    default:
      return state
  }
}