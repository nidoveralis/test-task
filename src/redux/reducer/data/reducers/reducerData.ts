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
      state.data = action.payload || [];
    },
    reducerErrors: (state: Draft<any>, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    reducerFilterData: (state: Draft<any>, action: PayloadAction<any>) => {
      state.data = state.data.filter((el: any) => el.id !== action.payload);
    },
  },
});

export const { reducerGetData, reducerErrors, reducerInputValue, reducerFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;