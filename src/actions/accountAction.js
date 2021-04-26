import { ACTION_TYPES } from '../constants'

export default {
  setProfile(profile) {
    return dispatch => {
      dispatch({
        type: ACTION_TYPES.account.setProfile,
        payload: profile
      })
    }
  },
};