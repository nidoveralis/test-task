import { combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit";

import reducerData from "./reducers/reducerData";
import { IDataList } from "../../../types";

interface DataReducers {
  data: Reducer<IDataList, AnyAction>;
}

const DataStore = combineReducers<DataReducers>({
  data: reducerData,
});

export default DataStore;
