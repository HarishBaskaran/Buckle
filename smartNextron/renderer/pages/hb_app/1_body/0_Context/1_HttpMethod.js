import React, { useState } from "react";

export const httpMethodContext = React.createContext("");

const HttpMethodContextProvider = ({ children }) => {
  const [HTTP_Method, setHTTP_Method] = useState("");
  const contextValue = {
    HTTP_Method,
    setHTTP_Method,
  };

  // Return the provider with the values
  return (
    <httpMethodContext.Provider value={contextValue}>
      {children}
    </httpMethodContext.Provider>
  );
};

export default HttpMethodContextProvider;
