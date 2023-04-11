import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
export default function CustomInput({
  label,
  error,
  errorMessage,
  name,
  value,
  handleChange,
  type,
}) {
  return (
    <div className="input-box">
      <InputLabel htmlFor={name + "-basic"} className="input-label">
        {label}
      </InputLabel>
      <TextField
        id={name + "-basic"}
        label={label}
        variant="outlined"
        size="small"
        error={error}
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        type={type ? type : "text"}
      />
      {error && <p className="error">{errorMessage}</p>}
    </div>
  );
}
