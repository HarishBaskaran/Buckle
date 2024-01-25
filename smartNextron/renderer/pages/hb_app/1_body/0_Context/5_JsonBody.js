import React, { useState } from "react";

export const jsonBodyContext = React.createContext("");

const JSONBodyContextProvider = ({ children }) => {
  const [positive, setPositive] = useState("");

  const [parsedPositiveData, setParsedPositiveData] = useState("");

  const [parsedSingleFlag, setParsedSingleFlag] = useState(false);
  const [parsedMultiFlag, setParsedMultiFlag] = useState(false);

  const contextValue = {
    positive,
    setPositive,

    parsedPositiveData,
    setParsedPositiveData,

    parsedSingleFlag,
    setParsedSingleFlag,
    parsedMultiFlag,
    setParsedMultiFlag,
  };

  // Return the provider with the values
  return (
    <jsonBodyContext.Provider value={contextValue}>
      {children}
    </jsonBodyContext.Provider>
  );
};

export default JSONBodyContextProvider;
