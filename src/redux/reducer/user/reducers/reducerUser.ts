import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  data: JSON.parse(localStorage.getItem("userData") as string) || {},
  token: (localStorage.getItem("token") as string) || {},
  error: false,
  inputValue: {
    login: null,
    passwor: null
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reducerInputValue: (state: Draft<any>, action: PayloadAction<any>) => {
      state.inputValue = action.payload;
    },
    reducerGetUser: (state: Draft<any>, action: PayloadAction<any>) => {
      state.data = action.payload;
      localStorage.setItem("token", "supersecrettoken_for_user2");
    },
    reducerErrors: (state: Draft<any>, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

export const { reducerGetUser, reducerErrors, reducerInputValue } =
  userSlice.actions;

export default userSlice.reducer;
