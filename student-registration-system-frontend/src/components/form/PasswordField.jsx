import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({ value, setValue, placeholder, id, name, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <TextField
      error={!error ? true : false}
      id={id}
      type={showPassword ? "text" : "password"}
      value={value}
      name={name}
      onChange={handleOnChange}
      placeholder={placeholder}
      fullWidth
      helperText={
        !error
          ? "Must contain at least 1 uppercase, 1 lowercase, and 1 numeric character. Minimum 8 characters."
          : ""
      }
      sx={{
        mb: "10px",
      }}
      required
      InputProps={{
        style: {
          borderRadius: "15px",
        },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default PasswordField;
