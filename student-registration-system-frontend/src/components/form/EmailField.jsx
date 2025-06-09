import { TextField } from "@mui/material";

const EmailField = ({
  placeholder,
  value,
  setValue,
  name,
  id,
  error,
  ...rest
}) => {
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <TextField
      error={!error ? true : false}
      type="email"
      id={id}
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={handleOnChange}
      autoComplete="true"
      fullWidth
      name={name}
      helperText={!error ? "Please enter a valid email address" : ""}
      sx={{
        mb: "10px",
      }}
      InputProps={{
        style: {
          borderRadius: "15px",
        },
      }}
      {...rest}
    />
  );
};

export default EmailField;
