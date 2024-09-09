import axios from "axios";

import { AppDispatch } from "../../reducer/store";

import { reducerGetData, reducerErrors, reducerFilterData } from "../../reducer/data/reducers/reducerData";
import { getLocalISOString } from "../../../utils/formattedDate";

const BASE_URL = 'https://test.v5.pryaniky.com';
const token = localStorage.getItem("token");
const headers = {
  'x-auth': token,
  'Content-Type': 'application/json',
};

export const getData = () =>
  async (dispatch: AppDispatch, getState: () => any) => {
    const token = localStorage.getItem("token") || '';
    try {
      const response = await axios.get(`${BASE_URL}/ru/data/v3/testmethods/docs/userdocs/get`, {
        headers: {
          'x-auth': token,
          'Content-Type': 'application/json',
        }
      });
      dispatch(reducerGetData(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(reducerErrors(true));
      throw error;
    }
  };

export const removeData = (id: string) =>
  async (dispatch: AppDispatch, getState: () => any) => {
    try {
      const response = await axios.get(`${BASE_URL}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
        headers,
      });

      if (response.data.error_code === 0) {
        dispatch(reducerFilterData(id));
      } else {
        dispatch(reducerErrors(true));
      }
    } catch (error) {
      console.error(error);
      dispatch(reducerErrors(true));
      throw error;
    }
  };

export const createData = () =>
  async (dispatch: AppDispatch, getState: () => any) => {
    const dataPayload = {
      companySigDate: getLocalISOString(),
      companySignatureName: "Договор.sig",
      documentName: "Договор.pdf",
      documentStatus: "test",
      documentType: "Трудовой договор",
      employeeNumber: "test",
      employeeSigDate: getLocalISOString(),
      employeeSignatureName: "Договор.sig"
    };
    try {
      const response = await axios.post(`${BASE_URL}/ru/data/v3/testmethods/docs/userdocs/create`, dataPayload, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(reducerErrors(true));
      throw error;
    }
  };

export const setData = (id: string) =>
  async (dispatch: AppDispatch, getState: () => any) => {
    try {
      const response = await axios.get(`${BASE_URL}/ru/data/v3/testmethods/docs/userdocs/set/{id}`, {
        headers
      });
      dispatch(reducerGetData(response.data));
    } catch (error) {
      console.error(error);
      dispatch(reducerErrors(true));
      throw error;
    }
  };