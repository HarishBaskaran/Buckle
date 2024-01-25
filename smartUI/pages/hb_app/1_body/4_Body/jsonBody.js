import React, { useEffect, useState, useContext } from "react";
import { jsonBodyContext } from "../0_Context/5_JsonBody";
import MakerExport from "./makebody";
import { checkJSON } from "../utils/check_json";
import Header from "smart/pages/hb_components/header";
import Button from "smart/pages/hb_components/button";
import Alert from "smart/pages/hb_components/alert";
import TextArea from "smart/pages/hb_components/textarea";

const JsonBody = () => {
  const {
    positive,
    setPositive,
    setParsedPositiveData,
    setParsedSingleFlag,
    setParsedMultiFlag,
  } = useContext(jsonBodyContext);

  const [positiveErrorCheckFlag, setPositiveErrorCheckFlag] = useState(false);

  const [alertOutput, setAlertOutput] = useState(false);
  const [alertOutputFlag, setAlertOutputFlag] = useState(false);
  const [alertSuccessFlag, setAlertSuccessFlag] = useState(false);

  function status(text, success) {
    setAlertOutput(text);
    setAlertOutputFlag(true);
    setAlertSuccessFlag(success);
  }

  const handleFormatClick = () => {
    try {
      setPositive(JSON.stringify(JSON.parse(positive), null, 2));
    } catch (err) {
      status("The JSON is incorrect for format", false);
    }
  };

  useEffect(() => {
    checkJSON(positive, setPositiveErrorCheckFlag);
    if (null === positive || "" === positive || {} === positive) {
    } else {
      try {
        setParsedPositiveData(MakerExport({ instance: positive }));
        setParsedSingleFlag(true);
        setParsedMultiFlag(true);
      } catch (err) {}
    }
  }, [positive]);

  return (
    <>
      <div className="flex">
        <Button
          size="small"
          type="primary_inverse"
          label="Format"
          onClick={handleFormatClick}
        />

        <Alert
          outputFlag={alertOutputFlag}
          setOutputFlag={setAlertOutputFlag}
          successFlag={alertSuccessFlag}
          setSuccessFlag={setAlertSuccessFlag}
          message={alertOutput}
          className=""
        />
      </div>

      <Header label="Body JSON" />
      <TextArea
        size="small"
        className="mt-[10px] w-[90%] h-[70vh]"
        error={positiveErrorCheckFlag}
        name="getPositiveContent"
        placeholder="Paste your Positive as JSON here"
        value={positive}
        setValue={setPositive}
      />
    </>
  );
};

export default JsonBody;
