import React, { useEffect, useState, useContext, useRef } from "react";
import Header from "../../../hb_components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus,
  faEllipsis,
  faTrash,
  faPen,
  faCodeFork,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PopupModal from "../../../hb_components/popup1";
import Input from "../../../hb_components/input";
import { collectionsContext } from "../0_Context/11_SideBarCollections";
import Tooltip from "../../../hb_components/tooltip";

const FolderMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  let width = props.width ? props.width : "w-[30px]";
  let height = props.height ? props.height : "h-[15px]";
  let text = props.text ? props.text : "text-sm";

  const dropdownRef = useRef(null);

  // it will close the select when clicked outside.
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const [popupFlag, setPopupFlag] = useState(false);
  const [runPopupFlag, setRunPopupFlag] = useState(false);
  const [deletePopupFlag, setDeletePopupFlag] = useState(false);
  const [renamePopupFlag, setRenamePopupFlag] = useState(false);
  const [fileName, setFileName] = useState("");

  const handlePopupSave = async () => {
    await createFile(fileName, props.folderName);
    setFileName("");
    RetrieveFile(props.setCollections);
    setPopupFlag(false);
    setIsOpen(false);
  };

  const handlePopupRun = async () => {
    await runCollection(props.folderName);
    setRunPopupFlag(false);
    setIsOpen(false);
  };

  const handleDeletePopupSave = async () => {
    await deleteDirectory(props.folderName);
    RetrieveFile(props.setCollections);
    setDeletePopupFlag(false);
    setIsOpen(false);
  };

  const handleRenamePopupSave = async () => {
    await renameDirectory(props.folderName, fileName);
    setFileName("");
    RetrieveFile(props.setCollections);
    setRenamePopupFlag(false);
    setIsOpen(false);
  };

  const handleDownloadFolderPopupSave = async () => {
    try {
      const params = {
        folderName: props.folderName,
      };

      const queryString = new URLSearchParams(params).toString();
      const url = `http://localhost:8082/download-folder?${queryString}`;

      const response = await fetch(url, {
        method: "GET",
        responseType: "blob", // Set the response type to 'blob'
      });

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "downloaded-folder.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the Blob URL to free up memory
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      // Handle download error
    }
    setPopupFlag(false);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative flex flex-col rounded-lg ${width} ${props.className}`}
    >
      <FontAwesomeIcon
        icon={faEllipsis}
        className="mt-[5px] w-[15px] h-[15px] text-sky-600 hover:cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />

      {isOpen && (
        <div
          className="absolute opacity-100 bg-sky-400 border-[1px] border-gray-400 mt-[2px] z-30
          flex flex-col items-start rounded-lg p-1 w-[200px] text-black"
        >
          <PopupModal
            logo={faFolderPlus}
            logoLabel=" Add New Request"
            logoClassName="text-white "
            labelClassName=" hover:text-white hover:cursor-pointer"
            flag={popupFlag}
            open={() => setPopupFlag(true)}
            close={() => setPopupFlag(false)}
            save={() => {
              handlePopupSave();
            }}
            height="h-[200px]"
            width="w-[30%]"
            header="New Request"
          >
            <div className="mt-[25px] flex gap-5 justify-between">
              <p className="mt-[5px]">Request Name</p>
              <Input
                className="w-[210px]"
                value={fileName}
                setValue={setFileName}
              />
            </div>
          </PopupModal>

          <PopupModal
            logo={faFolderPlus}
            logoLabel=" Run Folder"
            logoClassName="text-white "
            labelClassName=" hover:text-white hover:cursor-pointer"
            flag={runPopupFlag}
            open={() => setRunPopupFlag(true)}
            close={() => setRunPopupFlag(false)}
            save={() => {
              handlePopupRun();
            }}
            saveLabel="Run"
            height="h-[200px]"
            width="w-[30%]"
            header="Folder Runner"
          >
            <div className="mt-[25px] flex gap-5 justify-between">
              <p className="mt-[5px]">
                Do You want to Run folder named - {props.folderName}
              </p>
            </div>
          </PopupModal>

          <PopupModal
            logo={faPen}
            logoLabel="Rename Folder"
            logoClassName="text-white "
            labelClassName=" hover:text-white hover:cursor-pointer"
            flag={renamePopupFlag}
            open={() => setRenamePopupFlag(true)}
            close={() => setRenamePopupFlag(false)}
            save={() => {
              handleRenamePopupSave();
            }}
            height="h-[200px]"
            width="w-[30%]"
            header="Rename Folder"
          >
            <p>Old Folder Name - {props.folderName}</p>
            <div className="flex gap-5 justify-between">
              <p className="mt-[5px]">New Folder Name</p>
              <Input
                className="w-[210px]"
                value={fileName}
                setValue={setFileName}
              />
            </div>
          </PopupModal>

          {/* <PopupModal
            logo={faFolderPlus}
            logoLabel=" Download Folder"
            logoClassName="text-white "
            labelClassName=" hover:text-white hover:cursor-pointer"
            flag={popupFlag}
            open={() => setPopupFlag(true)}
            close={() => setPopupFlag(false)}
            save={() => {
              handleDownloadFolderPopupSave();
            }}
            height="h-[200px]"
            width="w-[30%]"
            header="Download Folder"
          >
            <div className="mt-[25px] flex gap-5 justify-between">
              <p className="mt-[5px]">
                Are you sure to download the folder : {props.folderName}
              </p>
            </div>
          </PopupModal> */}

          <PopupModal
            logo={faTrash}
            logoLabel="Delete Folder"
            logoClassName="text-white "
            labelClassName=" hover:text-white hover:cursor-pointer"
            flag={deletePopupFlag}
            open={() => setDeletePopupFlag(true)}
            close={() => setDeletePopupFlag(false)}
            save={() => {
              handleDeletePopupSave();
            }}
            height="h-[200px]"
            width="w-[30%]"
            header="Delete Folder"
          >
            <div className="mt-[25px] flex gap-5 justify-between">
              <p className="mt-[5px]">
                Are you sure to delete the folder : {props.folderName}
              </p>
            </div>
          </PopupModal>
        </div>
      )}
    </div>
  );
};

const FolderItem = ({ collectionName, setCollections }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex flex-row justify-between w-full hover:text-sky-600 hover:border-l-2 
      hover:border-sky-600 hover:cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="mx-2 text-[14px] font-600 hover:text-sky-600 hover:cursor-pointer w-full">
        {collectionName}
      </p>
      {isHovered && (
        <FolderMenu
          folderName={collectionName}
          setCollections={setCollections}
        />
      )}
    </div>
  );
};

const RequestMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  let width = props.width ? props.width : "w-[30px]";
  let height = props.height ? props.height : "h-[15px]";
  let text = props.text ? props.text : "text-sm";

  const dropdownRef = useRef(null);

  // it will close the select when clicked outside.
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const [deletePopupFlag, setDeletePopupFlag] = useState(false);
  const [renamePopupFlag, setRenamePopupFlag] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDeletePopupSave = async () => {
    await deleteFile(props.requestName, props.folderName);
    RetrieveFile(props.setCollections);
    setDeletePopupFlag(false);
    setIsOpen(false);
  };

  const handleRenamePopupSave = async () => {
    await renameFile(props.requestName, fileName, props.folderName);
    setFileName("");
    RetrieveFile(props.setCollections);
    setRenamePopupFlag(false);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative flex flex-col rounded-lg ${width} ${props.className}`}
    >
      <FontAwesomeIcon
        icon={faEllipsis}
        className="mt-[5px] w-[15px] h-[15px] text-sky-600 hover:cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />

      {isOpen && (
        <div
          className="absolute opacity-100 bg-sky-400 border-[1px] border-gray-400 mt-[2px] z-30
            flex flex-col items-start rounded-lg p-1 w-[200px] text-black"
        >
          <PopupModal
            logo={faPen}
            logoLabel="Rename Request"
            logoClassName="text-white "
            labelClassName=" hover:text-white hover:cursor-pointer"
            flag={renamePopupFlag}
            open={() => setRenamePopupFlag(true)}
            close={() => setRenamePopupFlag(false)}
            save={() => {
              handleRenamePopupSave();
            }}
            height="h-[200px]"
            width="w-[30%]"
            header="Rename Request"
          >
            <p>Old Request Name - {props.requestName}</p>
            <div className="flex gap-5 justify-between">
              <p className="mt-[5px]">New Request Name</p>
              <Input
                className="w-[210px]"
                value={fileName}
                setValue={setFileName}
              />
            </div>
          </PopupModal>

          <PopupModal
            logo={faTrash}
            logoLabel="Delete Request"
            logoClassName="text-white "
            labelClassName=" hover:text-white hover:cursor-pointer"
            flag={deletePopupFlag}
            open={() => setDeletePopupFlag(true)}
            close={() => setDeletePopupFlag(false)}
            save={() => {
              handleDeletePopupSave();
            }}
            height="h-[200px]"
            width="w-[30%]"
            header="Delete Request"
          >
            <div className="mt-[25px] flex gap-5 justify-between">
              <p className="mt-[5px]">
                Are you sure to delete the request : {props.requestName}
              </p>
            </div>
          </PopupModal>
        </div>
      )}
    </div>
  );
};

const RequestItem = ({ folderName, requestName, setCollections }) => {
  const { setFolderName, setRequestName, setRequestClickFlag } =
    useContext(collectionsContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex flex-row justify-between w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p
        className="ml-[10px] text-[12px] mr-4 hover:text-sky-600 hover:cursor-pointer w-full"
        onClick={() => {
          setFolderName(folderName);
          setRequestName(requestName);
          setRequestClickFlag(true);
        }}
      >
        {requestName.length <= 20
          ? requestName
          : requestName.substring(0, 17) + "..."}
      </p>

      {isHovered && (
        <RequestMenu
          folderName={folderName}
          requestName={requestName}
          setCollections={setCollections}
        />
      )}
    </div>
  );
};

function CollectionsComponent({ collections, setCollections }) {
  const sortedKeys = Object.keys(collections).sort(); // Sort the keys alphabetically

  return (
    <div className="mt-[10px] ml-[10px]">
      {sortedKeys.map((collectionName) => (
        <div key={collectionName} className="mb-[15px]">
          <FolderItem
            key={collectionName}
            collectionName={collectionName}
            setCollections={setCollections}
          />

          {collections[collectionName]
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort the content based on name
            .map((file) => (
              <div
                key={file.name}
                className="hover:text-sky-600 hover:border-l-2 hover:border-sky-600 
                hover:cursor-pointer flex justify-between"
              >
                <RequestItem
                  requestName={file.name}
                  folderName={collectionName}
                  setCollections={setCollections}
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

const runnerEndpoint = "http://localhost:8082/runCollection";

const runCollection = async (folderName) => {
  const response = await axios.post(runnerEndpoint, null, {
    params: {
      folderName: folderName,
    },
    metadata: {
      name: "runCollection",
    },
  });

  console.error(response.data);
};

const endpoint = "http://localhost:8082/files";

const createFile = async (fileName, folderName) => {
  try {
    const response = await axios.post(endpoint, null, {
      params: {
        fileName: fileName,
        folderName: folderName,
      },
      metadata: {
        name: "createFile",
      },
    });

    if (response.data === "File created successfully") {
      console.log("CREATE - File created successfully");
    } else if (response.data === "File already exists") {
      console.log("CREATE - File already exists");
    } else {
      console.log("CREATE - Failed to create file");
    }
  } catch (error) {
    console.error("CREATE - Error creating file:", error);
  }
};

const RetrieveFile = async (setCollections) => {
  axios
    .get(endpoint, {
      headers: {
        "X-Request-Name": "RetrieveFile",
      },
    })
    .then((response) => {
      setCollections(response.data);
      //   console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching collections:", error);
    });
};

const renameFile = async (oldFileName, newFileName, folderName) => {
  try {
    const response = await axios.put(endpoint, null, {
      params: {
        oldFileName: oldFileName,
        newFileName: newFileName,
        folderName: folderName,
      },
      metadata: {
        name: "renameFile",
      },
    });

    // Handle the response based on the returned message
    if (response.data === "File renamed successfully") {
      console.log("RENAME - File renamed successfully");
      // Do something else, such as updating the UI
    } else if (response.data === "Failed to rename file") {
      console.log("RENAME - Failed to rename file");
      // Do something else, such as displaying an error message
    } else {
      console.log("RENAME - File does not exist");
      // Do something else, such as displaying an error message
    }
  } catch (error) {
    console.error("RENAME - Error renaming file:", error);
    // Do something else, such as displaying an error message
  }
};

const deleteFile = async (fileName, folderName) => {
  try {
    const response = await axios.delete(endpoint, {
      params: {
        fileName: fileName,
        folderName: folderName,
      },
      metadata: {
        name: "deleteFile",
      },
    });

    // Handle the response based on the returned message
    if (response.data === "File deleted successfully") {
      console.log("DELETE - File deleted successfully");
      // Do something else, such as updating the UI
    } else if (response.data === "Failed to delete file") {
      console.log("DELETE - Failed to delete file");
      // Do something else, such as displaying an error message
    } else {
      console.log("DELETE - File does not exist");
      // Do something else, such as displaying an error message
    }
  } catch (error) {
    console.error("DELETE - Error deleting file:", error);
    // Do something else, such as displaying an error message
  }
};

const dirEndpoint = "http://localhost:8082/directory";

const createDirectory = async (folderName) => {
  try {
    const response = await axios.post(dirEndpoint, null, {
      params: {
        folderName: folderName,
      },
      metadata: {
        name: "createDirectory",
      },
    });

    // Handle the response based on the returned message
    if (response.data === "Directory created successfully") {
      console.log("Directory created successfully");
      // Do something else, such as updating the UI
    } else {
      console.log("Failed to create directory");
      // Do something else, such as displaying an error message
    }
  } catch (error) {
    console.error("Error creating directory:", error);
    // Do something else, such as displaying an error message
  }
};

const deleteDirectory = async (folderName) => {
  try {
    const response = await axios.delete(dirEndpoint, {
      params: {
        folderName: folderName,
      },
      metadata: {
        name: "deleteDirectory",
      },
    });

    // Handle the response based on the returned message
    if (response.data === "Directory deleted successfully") {
      console.log("Directory deleted successfully");
      // Do something else, such as updating the UI
    } else if (response.data === "Directory does not exist") {
      console.log("Directory does not exist");
      // Do something else, such as displaying an error message
    } else {
      console.log("Failed to delete directory");
      // Do something else, such as displaying an error message
    }
  } catch (error) {
    console.error("Error deleting directory:", error);
    // Do something else, such as displaying an error message
  }
};

const renameDirectory = async (oldFolderName, newFolderName) => {
  try {
    const response = await axios.put(dirEndpoint, null, {
      params: {
        oldFolderName: oldFolderName,
        newFolderName: newFolderName,
      },
      metadata: {
        name: "renameDirectory",
      },
    });

    // Handle the response based on the returned message
    if (response.data === "Directory renamed successfully") {
      console.log("Directory renamed successfully");
      // Do something else, such as updating the UI
    } else if (response.data === "Directory does not exist") {
      console.log("Directory does not exist");
      // Do something else, such as displaying an error message
    } else {
      console.log("Failed to rename directory");
      // Do something else, such as displaying an error message
    }
  } catch (error) {
    console.error("Error renaming directory:", error);
    // Do something else, such as displaying an error message
  }
};

const setDirectoryPath = async (folderName) => {
  try {
    const response = await axios.patch(dirEndpoint, null, {
      params: {
        folderPath: folderName,
      },
      metadata: {
        name: "setDirectoryPath",
      },
    });

    console.log("Directory folderPath set successfully" + response.data);
  } catch (error) {
    console.error("Error setting directory path:", error);
    // Do something else, such as displaying an error message
  }
};

const SideBar = () => {
  const [collections, setCollections] = useState({});

  useEffect(() => {
    RetrieveFile(setCollections);
  }, []);

  const [directoryPathName, setDirectoryPathName] = useState("");
  const [directoryName, setDirectoryName] = useState("");
  const [popupPathFlag, setPopupPathFlag] = useState(false);
  const [popupFlag, setPopupFlag] = useState(false);

  const handlePopupSave = async () => {
    await createDirectory(directoryName);
    RetrieveFile(setCollections);
    setDirectoryName("");
    setPopupFlag(false);
  };
  const handlePopupPathSave = async () => {
    await setDirectoryPath(directoryPathName);
    RetrieveFile(setCollections);
    setDirectoryName("");
    setPopupPathFlag(false);
  };

  const handleDownload = () => {
    axios({
      url: "http://localhost:8082/download",
      method: "GET",
      responseType: "blob", // Important: Set the response type to 'blob'
    })
      .then((response) => {
        // Create a temporary URL object to generate a downloadable link
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element and simulate a click to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.html");
        document.body.appendChild(link);
        link.click();

        // Cleanup the temporary URL object
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div className="flex flex-col w-[15%] border border-2 border-solid border-green ml-[15px]">
      <div className="flex justify-between">
        <Header label="Collections" />
        <div className="flex">
          <PopupModal
            logo={faCodeFork}
            logoClassName="mt-[20px] pt-[13px] pr-[10px]"
            flag={popupPathFlag}
            open={() => setPopupPathFlag(true)}
            close={() => setPopupPathFlag(false)}
            save={() => {
              handlePopupPathSave();
            }}
            height="h-[200px]"
            width="w-[30%]"
            header="Git Folder Path"
          >
            <div className="mt-[25px] flex gap-5 justify-between">
              <p className="mt-[5px]">Git Folder Path</p>
              <Input
                className="w-[210px]"
                value={directoryPathName}
                setValue={setDirectoryPathName}
              />
            </div>
          </PopupModal>
          <PopupModal
            logo={faFolderPlus}
            logoClassName="mt-[20px] pt-[13px] pr-[20px]"
            flag={popupFlag}
            open={() => setPopupFlag(true)}
            close={() => setPopupFlag(false)}
            save={() => {
              handlePopupSave();
            }}
            height="h-[200px]"
            width="w-[30%]"
            header="New Folder"
          >
            <div className="mt-[25px] flex gap-5 justify-between">
              <p className="mt-[5px]">Folder Name</p>
              <Input
                className="w-[210px]"
                value={directoryName}
                setValue={setDirectoryName}
              />
            </div>
          </PopupModal>
          <FontAwesomeIcon
            onClick={handleDownload}
            icon={faDownload}
            className={`text-sky-600 mt-[16px] mr-[10px] w-[15px] h-[15px] cursor-pointer`}
          />
        </div>
      </div>
      <p className="border-b-2 mt-[10px]"></p>
      <CollectionsComponent
        collections={collections}
        setCollections={setCollections}
      />
    </div>
  );
};
export default SideBar;
