import React, { useState } from "react";

export const paramsContext = React.createContext("");

const ParamsContextProvider = ({ children }) => {
  const [queryParams, setQueryParams] = useState([]);
  const [queryParamsFlag, setQueryParamsFlag] = useState(false);

  const [pathParams, setPathParams] = useState([]);
  const [tempParams, setTempParams] = useState([]);
  const [pathParamsFlag, setPathParamsFlag] = useState(false);

  const contextValue = {
    queryParams,
    setQueryParams,
    queryParamsFlag,
    setQueryParamsFlag,
    pathParams,
    setPathParams,
    tempParams,
    setTempParams,
    pathParamsFlag,
    setPathParamsFlag,
  };

  // Return the provider with the values
  return (
    <paramsContext.Provider value={contextValue}>
      {children}
    </paramsContext.Provider>
  );
};

export default ParamsContextProvider;
