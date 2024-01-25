import React, { useState } from "react";

export const testDataConfigContext = React.createContext("");

const TestDataContextProvider = ({ children }) => {
  const [singleTestConfig, setSingleTestConfig] = useState([]);

  const [multiJsonPaths, setMultiJsonPaths] = useState([]);
  const [multiTestConfig, setMultiTestconfig] = useState([]);
  const [multiHeaders, setMultiHeaders] = useState(["JSON Paths", "TC 1"]); // headers for the columns

  const contextValue = {
    singleTestConfig,
    setSingleTestConfig,
    multiJsonPaths,
    setMultiJsonPaths,
    multiHeaders,
    setMultiHeaders,
    multiTestConfig,
    setMultiTestconfig,
  };

  // Return the provider with the values
  return (
    <testDataConfigContext.Provider value={contextValue}>
      {children}
    </testDataConfigContext.Provider>
  );
};

export default TestDataContextProvider;
