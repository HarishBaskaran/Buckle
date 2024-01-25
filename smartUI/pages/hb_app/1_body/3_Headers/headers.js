import React, { useEffect, useState, useContext } from "react";
import { headersContext } from "../0_Context/4_Headers";
import Button from "smart/pages/hb_components/button";
import TextArea from "smart/pages/hb_components/textarea";
import Alert from "smart/pages/hb_components/alert";
import { checkJSON } from "../utils/check_json";
import Header from "smart/pages/hb_components/header";

const Headers = () => {
  const { headers, setHeaders } = useContext(headersContext);

  const [headerErrorCheckFlag, setHeaderErrorCheckFlag] = useState(false);
  const [alertOutputMessage, setAlertOutputMessage] = useState(false);
  const [alertOutputFlag, setAlertOutputFlag] = useState(false);
  const [alertSuccessFlag, setAlertSuccessFlag] = useState(false);

  useEffect(() => {
    checkJSON(headers, setHeaderErrorCheckFlag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers]);

  const handleFormatClick = () => {
    try {
      setHeaders(JSON.stringify(JSON.parse(headers), null, 2));
    } catch (err) {
      setAlertOutputMessage("The Headers JSON is incorrect for parsing");
      setAlertOutputFlag(true);
    }
  };

  const handleConvertClick = () => {
    const newHeader = {};
    try {
      JSON.parse(headers).header.forEach((item) => {
        newHeader[item.key] = item.value;
      });
      setHeaders(JSON.stringify(newHeader, null, 2));
    } catch (err) {
      setAlertOutputMessage("The Headers JSON is incorrect for converting");
      setAlertOutputFlag(true);
    }
  };

  return (
    <>
      <div className="flex">
        <Button
          size="small"
          type="primary_inverse"
          label="Format"
          onClick={handleFormatClick}
        />

        <Button
          size="small"
          type="primary_inverse"
          label="Convert"
          onClick={handleConvertClick}
        />

        <Alert
          outputFlag={alertOutputFlag}
          setOutputFlag={setAlertOutputFlag}
          successFlag={alertSuccessFlag}
          setSuccessFlag={setAlertSuccessFlag}
          message={alertOutputMessage}
          className=""
        />
      </div>

      <Header label="Header JSON" />
      <TextArea
        size="small"
        className="mt-[10px] w-[90%] h-[70vh]"
        error={headerErrorCheckFlag}
        name="getHeaderContent"
        placeholder="Paste your Headers as JSON here"
        value={headers}
        setValue={setHeaders}
      />
    </>
  );
};

export default Headers;
