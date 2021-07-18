import { combineReducers } from 'redux';

import decisions from './decisions'
import history from './history'
import products from './product'
import warning from './warning'
import user from './user'
import filter from './filter'

export default combineReducers({
    decisions,
    products,
    history,
    warning,
    user,
    filter
})