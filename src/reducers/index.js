import { combineReducers } from 'redux';
import uiReducer from './uiReducer'
import authReducer from './authReducer'
import accountReducer from './accountReducer'

export default combineReducers({
  ui: uiReducer,
  auth: authReducer,
  account: accountReducer
});