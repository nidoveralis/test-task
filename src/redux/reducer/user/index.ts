import { combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit";

import reducerUser from "./reducers/reducerUser";
import { IUserData } from "../../../types";

interface CustomerReducers {
  user: Reducer<IUserData, AnyAction>;
}

const UserStore = combineReducers<CustomerReducers>({
  user: reducerUser,
});

export default UserStore;
