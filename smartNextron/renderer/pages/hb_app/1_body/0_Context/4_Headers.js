import React, { useState } from "react";

export const headersContext = React.createContext("");

const HeadersContextProvider = ({ children }) => {
  const [headers, setHeaders] = useState("");

  const contextValue = {
    headers,
    setHeaders,
  };

  // Return the provider with the values
  return (
    <headersContext.Provider value={contextValue}>
      {children}
    </headersContext.Provider>
  );
};

export default HeadersContextProvider;
