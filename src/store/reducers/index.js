import { combineReducers } from "redux";

import mapReducer from "./map-reducer";
import tabReducer from "./tab-reducer";

const finalReducer = {
  map: mapReducer,
  tab: tabReducer,
};

const rootReducer = combineReducers(finalReducer);

export default rootReducer;
