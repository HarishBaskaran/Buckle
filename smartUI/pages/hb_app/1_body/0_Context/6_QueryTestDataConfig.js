import React, { useState } from "react";

export const queryTestDataConfigContext = React.createContext("");

const QueryTestDataContextProvider = ({ children }) => {
  const [querySingleTestConfig, setQuerySingleTestConfig] = useState([]);

  const [queryParamType, setQueryParamType] = useState([]);
  const [queryParamKeys, setQueryParamKeys] = useState([]);
  const [queryMultiTestConfig, setQueryMultiTestconfig] = useState([]);
  const [queryMultiHeaders, setQueryMultiHeaders] = useState([
    "Query Params",
    "TC 1",
  ]); // headers for the columns

  const contextValue = {
    querySingleTestConfig,
    setQuerySingleTestConfig,

    queryParamType,
    setQueryParamType,
    queryParamKeys,
    setQueryParamKeys,
    queryMultiTestConfig,
    setQueryMultiTestconfig,
    queryMultiHeaders,
    setQueryMultiHeaders,
  };

  // Return the provider with the values
  return (
    <queryTestDataConfigContext.Provider value={contextValue}>
      {children}
    </queryTestDataConfigContext.Provider>
  );
};

export default QueryTestDataContextProvider;
