import React, { useState } from "react";

export const collectionsContext = React.createContext("");

const CollectionsContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [requestName, setRequestName] = useState("");
  const [requestClickFlag, setRequestClickFlag] = useState(false);

  const contextValue = {
    userName,
    setUserName,
    folderName,
    setFolderName,
    requestName,
    setRequestName,
    requestClickFlag,
    setRequestClickFlag,
  };

  // Return the provider with the values
  return (
    <collectionsContext.Provider value={contextValue}>
      {children}
    </collectionsContext.Provider>
  );
};

export default CollectionsContextProvider;
