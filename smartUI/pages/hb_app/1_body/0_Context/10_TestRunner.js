import React, { useState } from "react";

export const testResultContext = React.createContext("");

const TestResultContextProvider = ({ children }) => {
  const [result, setResult] = useState("");
  const [resultFlag, setResultFlag] = useState(false);

  const contextValue = {
    result,
    setResult,
    resultFlag,
    setResultFlag,
  };

  // Return the provider with the values
  return (
    <testResultContext.Provider value={contextValue}>
      {children}
    </testResultContext.Provider>
  );
};

export default TestResultContextProvider;
