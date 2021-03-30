import { combineReducers } from 'redux';

import decisions from './decisions'
import history from './history'

export default combineReducers({
    decisions,
    history
})