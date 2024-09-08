import { combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit";

import reducerData from "./reducers/reducerData";

interface DataReducers {
  data: Reducer<any, AnyAction>;
}

const DataStore = combineReducers<DataReducers>({
  data: reducerData,
});

export default DataStore;
