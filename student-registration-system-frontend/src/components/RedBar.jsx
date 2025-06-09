import { Box, Typography } from "@mui/material";
const RedBar = ({ children }) => {
  return (
    <Box bgcolor="red" borderRadius="10px" sx={{ marginY: "12px" }}>
      <Typography color="white" sx={{ padding: "5px" }} align="center">
        {children}
      </Typography>
    </Box>
  );
};

export default RedBar;
