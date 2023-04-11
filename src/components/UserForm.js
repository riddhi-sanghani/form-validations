import React, { useState } from "react";
import Button from "@mui/material/Button";
import CustomDatePicker from "./CustomDatePicker";
import CustomInput from "./CustomInput";
import customToast from "../tost/customTost";
import axios from "axios";

const registerUser = async (userData) => {
  await axios
    .post("https://fullstack-test-nay.vercel.app/api/users/create", userData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export default function UserFrom() {
  const [state, setState] = useState({
    fullName: "",
    contact: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    error: [],
    day: "",
    month: "",
    year: "",
    loading: false,
  });
  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      error: [],
    }));
  };
  const handleContactChange = (e) => {
    if (e.target.value.length < 11) {
      var contact = e.target.value
        .replace(/\D+/g, "")
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      setState((prev) => ({ ...prev, contact, error: [] }));
    }
  };
  const handleValidation = async () => {
    const {
      fullName,
      contact,
      email,
      password,
      ConfirmPassword,
      day,
      month,
      year,
    } = state;
    let error = [];

    if (
      !fullName.match(/^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/)
    ) {
      error.push("fullName");
    }
    if (!contact || contact.length < 10) {
      error.push("contact");
    }
    if (day === "") {
      error.push("day");
    }
    if (month === "") {
      error.push("month");
    }
    if (year === "") {
      error.push("year");
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      error.push("email");
    }
    if (
      password === "" ||
      !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    ) {
      error.push("password");
    }
    if (password === "" || password !== ConfirmPassword) {
      error.push("ConfirmPassword");
    }
    return error;
  };
  const handleSubmit = async () => {
    var error = await handleValidation();
    const { fullName, contact, email, password, day, month, year } = state;
    if (error.length === 0) {
      setState((prev) => ({ ...prev, loading: true }));
      const userData = {
        full_name: fullName,
        contact_number: contact,
        email: email,
        date_of_birth: `${day}${month}${year}`,
        password: password,
      };
      registerUser(userData)
        .then((res) => {
          handleCancel();
          customToast.success("User registered successfully");
          setState((prev) => ({ ...prev, loading: false }));
        })
        .catch((err) => {
          let errorMessage = err.toJSON().response
            ? err.response.data.description
            : "Something went wrong";
          customToast.error(errorMessage);
          setState((prev) => ({ ...prev, loading: false }));
        });
    } else {
      setState((prev) => ({ ...prev, error }));
    }
  };
  const handleDatePicker = (type, value) => {
    setState((prev) => ({
      ...prev,
      [type]: value,
      error: [],
    }));
  };
  const handleCancel = () => {
    setState((prev) => ({
      ...prev,
      fullName: "",
      contact: "",
      email: "",
      password: "",
      ConfirmPassword: "",
      error: [],
      day: "",
      month: "",
      year: "",
    }));
  };
  return (
    <>
      <div className="form-box">
        <div className="card">
          <CustomInput
            label={"Full Name*"}
            error={state.error.includes("fullName")}
            errorMessage={
              state.fullName === ""
                ? "Provide full name"
                : "Avoid spaces and special characters"
            }
            name="fullName"
            value={state?.fullName}
            handleChange={(e) => handleChange(e)}
          />
          <CustomInput
            label={"Contact Name*"}
            error={state.error.includes("contact")}
            errorMessage={"Phone number is required"}
            name="contact"
            value={state?.contact}
            handleChange={(e) => handleContactChange(e)}
          />
          <CustomDatePicker
            day={state.day}
            month={state.month}
            year={state.year}
            handleDatePicker={(type, value) => handleDatePicker(type, value)}
            dayError={state.error.includes("day")}
            monthError={state.error.includes("month")}
            yearError={state.error.includes("year")}
          />
          <CustomInput
            label={"Email*"}
            error={state.error.includes("email")}
            errorMessage={
              state.email === ""
                ? "Email is required"
                : "Enter a valid email address"
            }
            name="email"
            value={state?.email}
            handleChange={(e) => handleChange(e)}
          />

          <CustomInput
            label={"Password*"}
            error={state.error.includes("password")}
            errorMessage={
              state.password.length < 8
                ? "Minimum length should be 8 characters"
                : "Must have Lower case (a-z), upper case (A-Z) and numbers (0-9)"
            }
            name="password"
            value={state?.password}
            handleChange={(e) => handleChange(e)}
            type={"password"}
          />
          <CustomInput
            label={"Confirm Password*"}
            error={state.error.includes("ConfirmPassword")}
            errorMessage={
              state.ConfirmPassword.length < 8
                ? "Minimum length should be 8 characters"
                : "The passwords do not match"
            }
            name="ConfirmPassword"
            value={state?.ConfirmPassword}
            handleChange={(e) => handleChange(e)}
            type={"password"}
          />
        </div>
      </div>
      <div className="btn-box">
        <div>
          <Button
            variant="outlined"
            className="Button"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            disabled={state.loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
