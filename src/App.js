import * as React from "react";

import theme from "./them/them";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import UserFrom from "./components/UserForm";
export default function MyApp() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer hideProgressBar={true} />
      <div className="container">
        <div>
          <p className="form-name">Create User Account</p>
          <UserFrom></UserFrom>
        </div>
      </div>
    </ThemeProvider>
  );
}
