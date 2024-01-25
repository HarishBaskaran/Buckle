import React, { useEffect, useState, useContext, useRef } from "react";
import PopupModal from "../../../../hb_components/popup1";
import TextArea from "../../../../hb_components/textarea";

const ResponseContent = ({ value, onResponseChange }) => {
  const [popupFlag, setPopupFlag] = useState(false);
  const [responseValue, setResponseValue] = useState(
    value ? JSON.stringify(value, null, 2) : ""
  );

  const handleResponseChange = (event) => {
    const newValue = event ? event?.target.value : "";
    setResponseValue(newValue);
    onResponseChange(newValue);
  };

  const handlePopupSave = async () => {
    setPopupFlag(false);
  };

  return (
    <PopupModal
      // logo={faFilePen}
      buttonLabel="content"
      logoClassName=" pr-[10px]"
      flag={popupFlag}
      open={() => setPopupFlag(true)}
      close={() => setPopupFlag(false)}
      save={() => {
        handlePopupSave();
      }}
      height="h-[400px]"
      width="w-[45%]"
      header="Validation Details"
    >
      <div className="flex flex-col gap-2 justify-between">
        <p className="mt-[5px] text-gray-500">Response Content</p>
        <TextArea
          className="w-[500px] max-h-[200px] overflow-y-auto"
          value={responseValue}
          setValue={() => setResponseValue()}
          onChange={() => handleResponseChange()}
        />
      </div>
    </PopupModal>
  );
};

export default ResponseContent;
