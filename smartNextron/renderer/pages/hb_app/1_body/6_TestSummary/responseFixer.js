import PopupModal from "../../../hb_components/popup1";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../hb_components/button";
import Tooltip from "../../../hb_components/tooltip";
import { useEffect, useState } from "react";
import SampleRunner from "../10_TestRunner/sampleRunner";
import SummaryTable from "./renderSummary";

const ResponseFixer = () => {
  const [popupFlag, setPopupFlag] = useState(false);
  const [fileOutput, setFileOutput] = useState(false);

  const [table, setTable] = useState(false);

  const { handleProcessClick, response } = SampleRunner();

  const handlePopupSave = () => {};

  useEffect(() => {
    if (response.length > 0) {
      setFileOutput(false);
      console.log(response);
      setTable(true);
    }
  }, [response]);

  return (
    <PopupModal
      buttonLabel={"Run Validations"}
      flag={popupFlag}
      open={() => setPopupFlag(true)}
      close={() => {
        setFileOutput(false);
        setPopupFlag(false);
      }}
      save={() => {
        handlePopupSave();
        setFileOutput(false);
        setTable(false);
      }}
      contentWidth="w-[1250px]"
      header="Fix the Response Validations"
    >
      {fileOutput && !table ? (
        <div className="flex gap-3 items-center justify-center h-[150px]">
          <p className="pt-[7px]">
            Click X Button to Stop the Trigger or Wait for the Magic
          </p>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
            <Tooltip message={"Close"} position="right">
              <div
                className="mr-[10px] mt-[5px] ml-[5px] cursor-pointer"
                onClick={() => {
                  setFileOutput(false);
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-slate-400"
                />
              </div>
            </Tooltip>
          </Box>
        </div>
      ) : !fileOutput && !table ? (
        <div className="flex gap-3 items-center justify-center h-[150px]">
          <p className="pt-[7px]">Click Run Button to Initiate the Trigger</p>
          <Button
            label="Run"
            size="small"
            className="h-[33px] !py-0 !mt-[3px]"
            onClick={() => {
              setFileOutput(true);
              handleProcessClick();
            }}
          />
        </div>
      ) : !fileOutput && table ? (
        <div className="h-[500px] overflow-y-auto">
          <SummaryTable apiResponse={response} />
        </div>
      ) : (
        <></>
      )}
    </PopupModal>
  );
};

export default ResponseFixer;
