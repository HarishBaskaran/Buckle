import { useState } from "react";
import PopupModal from "../../../hb_components/popup1";
import Authorization from "./authorization";
import axios from "axios";

const endpoint = "http://localhost:8082/authorization";

const createFile = async (data) => {
  try {
    const response = await axios.post(endpoint, data, {
      metadata: {
        name: "createEnvironment",
      },
    });
    console.log("CREATED environment");
  } catch (error) {
    console.error("CREATE - Error creating environment:", error);
  }
};

const importData = async ({ setData }) => {
  await axios
    .get(endpoint, {
      metadata: {
        name: "importData",
      },
    })
    .then((response) => {
      console.log(response.data);
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });
};

const AuthorizationWrapper = () => {
  const [popupFlag, setPopupFlag] = useState(false);
  const [data, setData] = useState([]);

  const handleClose = () => {
    createFile(data);
    setPopupFlag(false);
  };

  const handleOpen = () => {
    setData([]);
    importData({ setData });
    setPopupFlag(true);
  };

  return (
    <PopupModal
      buttonLabel={"Authorization"}
      labelClassName="mb-[5px]"
      flag={popupFlag}
      open={() => handleOpen()}
      close={() => handleClose()}
      height="h-[55vh]"
      contentWidth="w-[850px] h-[30vh]"
      header="Authorization"
    >
      <Authorization data={data} setData={setData} />
    </PopupModal>
  );
};

export default AuthorizationWrapper;
