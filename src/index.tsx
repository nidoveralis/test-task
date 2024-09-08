import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/reducer/store";
// import App from './App';
import './scss/index.scss';
import AuthPage from "./components/auth/authPage";
import Page404 from "./components/page404/page404";
import DataTables from "./components/table/dataTable";

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
        <Route path="/main/*" element={<DataTables />} />
        <Route path="/page404/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);