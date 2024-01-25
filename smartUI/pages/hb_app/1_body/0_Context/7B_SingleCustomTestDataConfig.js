import React, { useState } from "react";

export const singleCustomTestDataContext = React.createContext("");

const SingleCustomTestDataContextProvider = ({ children }) => {
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
    <singleCustomTestDataContext.Provider value={contextValue}>
      {children}
    </singleCustomTestDataContext.Provider>
  );
};

export default SingleCustomTestDataContextProvider;
