import { createContext } from "react";
import { useState } from "react";

const snankBarContext = createContext(null);

const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sx, setSx] = useState(null);

  const displaySnackBar = (open, message, sx = {}) => {
    setOpen(open);
    setMessage(message);
    setSx(sx);
  };

  const contextValue = {
    open,
    setOpen,
    message,
    sx,
    displaySnackBar,
  };
  return (
    <snankBarContext.Provider value={contextValue}>
      {children}
    </snankBarContext.Provider>
  );
};

export default SnackBarProvider;
export { snankBarContext };
