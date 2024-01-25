import React, { useState } from "react";

export const testQuerySummaryContext = React.createContext("");

const TestQuerySummaryContextProvider = ({ children }) => {
  const [changeQuerySummary, setChangeQuerySummary] = useState([]);
  const [multiChangeQuerySummary, setMultiChangeQuerySummary] = useState([]);

  const contextValue = {
    changeQuerySummary,
    setChangeQuerySummary,
    multiChangeQuerySummary,
    setMultiChangeQuerySummary,
  };

  // Return the provider with the values
  return (
    <testQuerySummaryContext.Provider value={contextValue}>
      {children}
    </testQuerySummaryContext.Provider>
  );
};

export default TestQuerySummaryContextProvider;
