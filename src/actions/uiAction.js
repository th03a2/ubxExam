import {ACTION_TYPES} from '../constants'
export default {
  searchFocus() {
    return dispatch => dispatch({ type: ACTION_TYPES.ui.focusSearch })
  },
  searchBlur() {
    return dispatch => dispatch({ type: ACTION_TYPES.ui.blurSearch })
  }
};
