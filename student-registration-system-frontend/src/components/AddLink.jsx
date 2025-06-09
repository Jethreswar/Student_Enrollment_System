import { TextField } from "@mui/material";
const AddLink = ({ name, value, onChange }) => {
  return (
    <TextField
      name={name}
      margin="normal"
      type="text"
      variant="outlined"
      value={value}
      onChange={onChange}
      fullWidth
      autoComplete="true"
      InputProps={{
        style: {
          borderRadius: "15px",
        },
      }}
    />
  );
};

export default AddLink;
