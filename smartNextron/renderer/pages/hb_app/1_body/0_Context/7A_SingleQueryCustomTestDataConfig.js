import React, { useState } from "react";

export const singleQueryCustomTestDataContext = React.createContext("");

const SingleQueryCustomTestDataContextProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [path, setPath] = useState({});
  const [option, setOption] = useState({});

  const contextValue = {
    modalIsOpen,
    setModalIsOpen,
    path,
    setPath,
    option,
    setOption,
  };

  // Return the provider with the values
  return (
    <singleQueryCustomTestDataContext.Provider value={contextValue}>
      {children}
    </singleQueryCustomTestDataContext.Provider>
  );
};

export default SingleQueryCustomTestDataContextProvider;
