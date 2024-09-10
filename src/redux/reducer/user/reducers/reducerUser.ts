import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "../../../../types";

const initialState: IUserData = {
  token: (localStorage.getItem("token") as string) || {},
  error: false,
  inputValue: {
    login: null,
    password: null
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reducerInputValue: (state: Draft<IUserData>, action: PayloadAction<{ login: string | null; password: string | null }>) => {
      state.inputValue = action.payload;
    },
    reducerGetUser: (state: Draft<{token: string | {}}>, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    reducerErrors: (state: Draft<{error: boolean}>, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

export const { reducerGetUser, reducerErrors, reducerInputValue } =
  userSlice.actions;

export default userSlice.reducer;
