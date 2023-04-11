import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function CustomDatePicker({
  day,
  month,
  year,
  handleDatePicker,
  dayError,
  monthError,
  yearError,
}) {
  var currentYear = new Date().getFullYear();
  const monthValue = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "December",
  ];
  return (
    <div className="date-box">
      <div className="date-select-box">
        <InputLabel htmlFor="outlined-basic" className="input-label">
          Day*
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Year"
          className="select-box"
          size="small"
          error={dayError}
          value={day}
          onChange={(e) => {
            handleDatePicker("day", e.target.value);
          }}
        >
          {[...Array(31).keys()].map((number, index) => (
            <MenuItem value={number + 1}>{number + 1}</MenuItem>
          ))}
        </Select>
        {dayError && <p className="error">{"Provide Day"}</p>}
      </div>
      <div className="date-select-box">
        <InputLabel htmlFor="outlined-basic" className="input-label">
          Month*
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          className="select-box"
          size="small"
          error={monthError}
          value={month}
          onChange={(e) => {
            handleDatePicker("month", e.target.value);
          }}
        >
          {monthValue.map((monthName, index) => (
            <MenuItem value={index + 1}>{monthName}</MenuItem>
          ))}
        </Select>
        {monthError && <p className="error">{"Provide Month"}</p>}
      </div>
      <div className="date-select-box">
        <InputLabel htmlFor="outlined-basic" className="input-label">
          Year*
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          className="select-box"
          size="small"
          value={year}
          error={yearError}
          onChange={(e) => {
            handleDatePicker("year", e.target.value);
          }}
        >
          {[...Array(100).keys()].map((yearValue, index) => (
            <MenuItem value={currentYear - yearValue}>
              {currentYear - yearValue}
            </MenuItem>
          ))}
        </Select>
        {yearError && <p className="error">{"Provide Year"}</p>}
      </div>
    </div>
  );
}
