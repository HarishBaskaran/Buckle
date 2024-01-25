import React, { useState } from "react";

export const queryParamsContext = React.createContext("");

const QueryParamsContextProvider = ({ children }) => {
  const [queryParams, setQueryParams] = useState([]);
  const [queryParamsFlag, setQueryParamsFlag] = useState([]);

  const contextValue = {
    queryParams,
    setQueryParams,
    queryParamsFlag,
    setQueryParamsFlag,
  };

  // Return the provider with the values
  return (
    <queryParamsContext.Provider value={contextValue}>
      {children}
    </queryParamsContext.Provider>
  );
};

export default QueryParamsContextProvider;
