import React, { useState } from "react";

export const preRequestContext = React.createContext("");

const PreRequestContextProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);

  const contextValue = {
    tableData,
    setTableData,
  };

  // Return the provider with the values
  return (
    <preRequestContext.Provider value={contextValue}>
      {children}
    </preRequestContext.Provider>
  );
};

export default PreRequestContextProvider;
