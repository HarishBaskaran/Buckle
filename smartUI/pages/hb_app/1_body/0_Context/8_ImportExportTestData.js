import React, { useState, useEffect } from "react";

export const importExportTestDataContext = React.createContext("");

const ImportExportTestDataContextProvider = ({ children }) => {
  const [importFlag, setImportFlag] = useState(false);
  const [importedTestConfig, setImportedTestConfig] = useState([]);

  useEffect(() => {
    setImportFlag(false);
  }, []);

  const contextValue = {
    importFlag,
    setImportFlag,
    importedTestConfig,
    setImportedTestConfig,
  };

  // Return the provider with the values
  return (
    <importExportTestDataContext.Provider value={contextValue}>
      {children}
    </importExportTestDataContext.Provider>
  );
};

export default ImportExportTestDataContextProvider;
