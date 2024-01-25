import React, { useState } from "react";

export const exportImportContext = React.createContext("");

const ExportImportContextProvider = ({ children }) => {
  const [globalImportHTTPMethodFlag, setGlobalImportHTTPMethodFlag] =
    useState(false);
  const [globalImportQueryParamFlag, setGlobalImportQueryParamFlag] =
    useState(false);
  const [globalImportQueryFlag, setGlobalImportQueryFlag] = useState(false);
  const [globalImportSingleFlag, setGlobalImportSingleFlag] = useState(false);
  const [globalImportMultiFlag, setGlobalImportMultiFlag] = useState(false);

  const contextValue = {
    globalImportHTTPMethodFlag,
    setGlobalImportHTTPMethodFlag,
    globalImportQueryParamFlag,
    setGlobalImportQueryParamFlag,
    globalImportQueryFlag,
    setGlobalImportQueryFlag,
    globalImportSingleFlag,
    setGlobalImportSingleFlag,
    globalImportMultiFlag,
    setGlobalImportMultiFlag,
  };

  // Return the provider with the values
  return (
    <exportImportContext.Provider value={contextValue}>
      {children}
    </exportImportContext.Provider>
  );
};

export default ExportImportContextProvider;
