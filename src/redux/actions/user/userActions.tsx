import axios from "axios";

import { AppDispatch } from "../../reducer/store";

import { reducerGetUser, reducerErrors } from "../../reducer/user/reducers/reducerUser";
import { BASE_URL } from "../../../utils/formattedDate";

export const userLogin =
  (username: string, password: string) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await axios.post(`${BASE_URL}/ru/data/v3/testmethods/docs/login`, {
          username,
          password,
        });
        dispatch(reducerErrors(response.data.error_code !== 0));
        dispatch(reducerGetUser(response.data.data.token));
      } catch (error) {
        console.error(error);
        dispatch(reducerErrors(true));
        throw error;
      }
    };