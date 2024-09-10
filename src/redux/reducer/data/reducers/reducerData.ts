import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { IData, IDataList } from "../../../../types";

const initialState: IDataList = {
  data: [],
  error: false,
  inputValues: {}
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    reducerInputValue: (state: Draft<{inputValues: IData | {}}>, action: PayloadAction<IData>) => {
      state.inputValues = {...state.inputValues, ...action.payload};
    },
    reducerGetData: (state: Draft<{data: IData[] | []}>, action: PayloadAction<IData[]>) => {
      state.data = action.payload || [];
    },
    reducerChangeData: (state: Draft<{data: IData[] | []}>, action: PayloadAction<IData>) => {
      const index = state.data.findIndex((item: IData) => item.id === action.payload.id);

      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
    reducerErrors: (state: Draft<{error: boolean}>, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    reducerFilterData: (state: Draft<{data: IData[] | []}>, action: PayloadAction<string>) => {
      state.data = state.data.filter((el: IData) => el.id !== action.payload);
    },
  },
});

export const { reducerGetData, reducerErrors, reducerInputValue, reducerFilterData, reducerChangeData } =
  dataSlice.actions;

export default dataSlice.reducer;