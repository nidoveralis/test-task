import axios from "axios";

import { AppDispatch } from "../../reducer/store";

import { reducerGetData, reducerErrors } from "../../reducer/table/reducers/reducerData";

const BASE_URL = 'https://test.v5.pryaniky.com';

export const getData = (token: string) =>
  async (dispatch: AppDispatch, getState: () => any) => {
    try {
      const response = await axios.get(`${BASE_URL}/ru/data/v3/testmethods/docs/userdocs/get`, {
        headers: {
          'x-auth': token,
        },
      });
      dispatch(reducerGetData(response.data));
    } catch (error) {
      console.error(error);
      dispatch(reducerErrors(true));
      throw error;
    }
  };