import axios from "axios";

import { AppDispatch } from "../../reducer/store";

import { reducerGetUser, reducerErrors } from "../../reducer/user/reducers/reducerUser";

const BASE_URL = 'https://test.v5.pryaniky.com';

export const userLogin =
  (username: string, password: string) =>
    async (dispatch: AppDispatch, getState: () => any) => {
      try {
        const response = await axios.post(`${BASE_URL}/ru/data/v3/testmethods/docs/login`, {
          username,
          password,
        });
        dispatch(reducerErrors(response.data.error_code !== 0));
        dispatch(reducerGetUser(response.data));
      } catch (error) {
        console.error(error);
        dispatch(reducerErrors(true));
        throw error;
      }
    };