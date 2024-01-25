import React, { useState } from "react";

export const urlContext = React.createContext("");

const UrlContextProvider = ({ children }) => {
  const [url, setUrl] = useState("");

  const contextValue = {
    url,
    setUrl,
  };

  // Return the provider with the values
  return (
    <urlContext.Provider value={contextValue}>{children}</urlContext.Provider>
  );
};

export default UrlContextProvider;
