import React, { useState } from "react";

export const multiCustomTestDataContext = React.createContext("");

const MultiCustomTestDataContextProvider = ({ children }) => {
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
    <multiCustomTestDataContext.Provider value={contextValue}>
      {children}
    </multiCustomTestDataContext.Provider>
  );
};

export default MultiCustomTestDataContextProvider;
