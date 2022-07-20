import {
  combineReducers
} from 'redux';

import mapReducer from './map-reducer';

const finalReducer = {
  map: mapReducer,
}

const rootReducer = combineReducers(finalReducer)

export default rootReducer