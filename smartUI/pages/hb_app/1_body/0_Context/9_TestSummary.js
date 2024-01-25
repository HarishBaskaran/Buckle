import React, { useState } from "react";

export const testSummaryContext = React.createContext("");

const TestSummaryContextProvider = ({ children }) => {
  const [changeSummary, setChangeSummary] = useState([]);
  const [multiChangeSummary, setMultiChangeSummary] = useState([]);

  const contextValue = {
    changeSummary,
    setChangeSummary,
    multiChangeSummary,
    setMultiChangeSummary,
  };

  // Return the provider with the values
  return (
    <testSummaryContext.Provider value={contextValue}>
      {children}
    </testSummaryContext.Provider>
  );
};

export default TestSummaryContextProvider;
