import { configureStore } from "@reduxjs/toolkit";

import UserStore from "./user/index";
import DataStore from "./data/index";

const store = configureStore({
  reducer: {
    user: UserStore,
    data: DataStore,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
