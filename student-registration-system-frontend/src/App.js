import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import router from "./routers/router";
import SnackBarProvider from "./context/snackBarContext";
import AlertSnackbar from "./components/SnackBar";
import theme from "./Themes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <RouterProvider router={router} />
        <AlertSnackbar />
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
