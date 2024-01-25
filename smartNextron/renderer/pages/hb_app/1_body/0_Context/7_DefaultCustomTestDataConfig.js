import React, { useState, useEffect } from "react";
import { config } from "../data/config_schema";

export const defaultCustomTestDataContext = React.createContext("");

const DefaultCustomTestDataContextProvider = ({ children }) => {
  let [configEntries, setConfigEntries] = React.useState(
    Object.entries(config)
  );
  const [configFlag, setConfigFlag] = useState(false);

  useEffect(() => {
    setConfigEntries(Object.entries(config));
  }, []);

  const contextValue = {
    configEntries,
    setConfigEntries,
    configFlag,
    setConfigFlag,
  };

  // Return the provider with the values
  return (
    <defaultCustomTestDataContext.Provider value={contextValue}>
      {children}
    </defaultCustomTestDataContext.Provider>
  );
};

export default DefaultCustomTestDataContextProvider;
