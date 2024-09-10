import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/reducer/store";
import './scss/index.scss';
import AuthPage from "./components/auth/authPage";
import DataTables from "./components/table/dataTable";
import PrivateRoute from "./components/privateRoute/privateRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const detectedBasename = window.location.pathname.startsWith("/react")
  ? "/react"
  : "/";

  root.render(
  <Provider store={store}>
    <BrowserRouter basename={detectedBasename}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login/*" element={<AuthPage />} />
        <Route path="/main/*" element={<PrivateRoute component={<DataTables />} />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);