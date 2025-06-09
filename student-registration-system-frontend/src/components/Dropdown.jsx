import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
const Dropdown = ({
  title,
  value,
  options,
  onChange,
  disable,
  width = 200,
  ...rest
}) => {
  return (
    <FormControl sx={{ mb: 1, mr: 2, minWidth: width }}>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        size="small"
        variant="outlined"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={title}
        value={value}
        onChange={onChange}
        disabled={disable}
        // sx={{ bgcolor: "white", borderRadius: "20px", color: "green" }}
        { ...rest}
        >
        {options.map((item) => {
          return (
            <MenuItem value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
