import { ACTION_TYPES } from '../constants'

export default {
  setUser(user) {
    return dispatch => {
      dispatch({
        type: ACTION_TYPES.auth.setUser,
        payload: user
      })
    }
  },
};