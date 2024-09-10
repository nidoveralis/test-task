export interface IData {
  id: string,
  companySigDate: string, 
  companySignatureName: string, 
  documentName: string, 
  documentStatus: string, 
  documentType: string, 
  employeeNumber: string, 
  employeeSigDate: string, 
  employeeSignatureName: string
};

export interface IUserData {
  token: string | {},
  error: boolean,
  inputValue: {
    login: string | null,
    password: string | null
  }
};

export interface IDataList {
  data: IData[],
  error: boolean,
  inputValues: IData | {},
};

export interface IPrivateRouteProps {
  component: JSX.Element;
};

export interface IStore {
  user: {
    user: IUserData
  },
  data: {
    data: IDataList
  }
}
