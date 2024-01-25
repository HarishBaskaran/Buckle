import React, { useState } from "react";

export const multiQueryCustomTestDataContext = React.createContext("");

const MultiQueryCustomTestDataContextProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [path, setPath] = useState({});
  const [index, setIndex] = useState({});
  const [type, setType] = useState({});

  const contextValue = {
    modalIsOpen,
    setModalIsOpen,
    path,
    setPath,
    type,
    setType,
    index,
    setIndex,
  };

  // Return the provider with the values
  return (
    <multiQueryCustomTestDataContext.Provider value={contextValue}>
      {children}
    </multiQueryCustomTestDataContext.Provider>
  );
};

export default MultiQueryCustomTestDataContextProvider;
