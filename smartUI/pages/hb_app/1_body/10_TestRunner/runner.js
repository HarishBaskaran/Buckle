import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "smart/pages/hb_components/button";
import ExportImport from "../9_ExportImport/exportImport";
import { httpMethodContext } from "../0_Context/1_HttpMethod";
import { urlContext } from "../0_Context/2_Url";
import { headersContext } from "../0_Context/4_Headers";
import { jsonBodyContext } from "../0_Context/5_JsonBody";
import { testResultContext } from "../0_Context/10_TestRunner";
import Tooltip from "smart/pages/hb_components/tooltip";
import RefreshConfig from "../5_TestConfiguration/refresh";

const Runner = () => {
  const { HTTP_Method } = useContext(httpMethodContext);
  const { url } = useContext(urlContext);
  const { headers } = useContext(headersContext);
  const { positive } = useContext(jsonBodyContext);
  const { result, setResultFlag } = useContext(testResultContext);

  const [fileOutput, setFileOutput] = useState(false);
  const [fileDownload, setFileDownload] = useState(false);

  const endpoint = "http://localhost:8080/process"; //"http://localhost:3080/api/file";
  const header = { "Content-Type": "application/json" };

  function handleOutput() {
    let jsondata = [];

    result.singleBodyTestOutput.forEach(
      (item) => (jsondata = jsondata.concat(item))
    );
    result.multiBodyTestOutput.forEach(
      (item) => (jsondata = jsondata.concat(item))
    );

    return jsondata;
  }

  function handleQueryOutput() {
    let jsondata = [];

    result.singleQueryTestOutput.forEach(
      (item) => (jsondata = jsondata.concat(item))
    );
    result.multiQueryTestOutput.forEach(
      (item) => (jsondata = jsondata.concat(item))
    );

    return jsondata;
  }

  const handleProcessClick = () => {
    setFileDownload(false);

    const configuration = {
      maxContentLength: 10 * 1024 * 1024,
      maxBodyLength: 10 * 1024 * 1024,
    };

    try {
      axios
        .post(
          endpoint,
          {
            method: HTTP_Method["label"],
            url: url ? url : "",
            headers: headers ? JSON.parse(headers) : {},
            positive: positive ? JSON.parse(positive) : {},
            queryParamsOutput: result ? handleQueryOutput() : [],
            output: result ? handleOutput() : [],
          },
          configuration,
          { header }
        )
        .then((response) => {
          console.log(response.data);
          setFileOutput(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  let keepCheckingFile = true;
  let intervalId;

  const stopCheckingFile = () => {
    clearInterval(intervalId);
    keepCheckingFile = false;
    setFileOutput(false);
  };

  const checkFileExistance = () => {
    intervalId = setInterval(() => {
      if (keepCheckingFile) {
        axios
          .get("http://localhost:3080/checkFile", { type: "text/plain" })
          .then((response) => {
            const data = response.data;
            if (data.includes("doesnot")) {
              // retry after 1 second
            } else {
              clearInterval(intervalId);
              setFileOutput(false);
              setFileDownload(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, 1000);
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:8080/download", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "output.html");
      document.body.appendChild(link);
      link.click();
    } catch (err) {}
  };

  useEffect(() => {
    if (fileOutput) {
      checkFileExistance();
    }
  }, [fileOutput]);

  const [render, setRender] = useState(true);

  useEffect(() => {
    if (!render) {
      setInterval(() => {
        setRender(true);
      }, 20);
    }
  }, [render]);

  return render ? (
    <div className="ml-[5px] flex">
      <ExportImport />
      <Button
        label="Refresh"
        size="small"
        type="primary_inverse"
        className="h-[33px] !py-0 !mt-[3px]"
        onClick={() => setRender(false)}
      />
      <Button
        label="Run"
        size="small"
        className="h-[33px] !py-0 !mt-[3px]"
        onClick={() => handleProcessClick()}
      />
      {fileOutput ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
          <Tooltip message={"Close"} position="right">
            <div
              className="mr-[10px] mt-[5px] ml-[5px] cursor-pointer"
              onClick={stopCheckingFile}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-slate-400"
              />
            </div>
          </Tooltip>
        </Box>
      ) : (
        <></>
      )}
      {fileDownload ? (
        <Button
          label="Report"
          size="small"
          type="primary_inverse"
          className="h-[33px] !py-0 !mt-[3px]"
          onClick={() => handleDownload()}
        />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <RefreshConfig />
  );
};
export default Runner;
