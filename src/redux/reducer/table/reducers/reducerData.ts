import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  data: [],
  error: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    reducerInputValue: (state: Draft<any>, action: PayloadAction<any>) => {
      state.inputValue = action.payload;
    },
    reducerGetData: (state: Draft<any>, action: PayloadAction<any>) => {
      state.data = action.payload.data;
    },
    reducerErrors: (state: Draft<any>, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

export const { reducerGetData, reducerErrors, reducerInputValue } =
dataSlice.actions;

export default dataSlice.reducer;