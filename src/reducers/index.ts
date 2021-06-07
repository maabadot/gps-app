import { combineReducers } from 'redux';
import auth from './auth'
import geodata from './geodata'

export default combineReducers({auth, geodata});