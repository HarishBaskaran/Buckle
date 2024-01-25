import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../hb_components/button";
import ExportImport from "../9_ExportImport/exportImport";
import { httpMethodContext } from "../0_Context/1_HttpMethod";
import { urlContext } from "../0_Context/2_Url";
import { headersContext } from "../0_Context/4_Headers";
import { jsonBodyContext } from "../0_Context/5_JsonBody";
import { testResultContext } from "../0_Context/10_TestRunner";
import Tooltip from "../../../hb_components/tooltip";
import RefreshConfig from "../5_TestConfiguration/refresh";
import { preRequestContext } from "../0_Context/12_PreRequest";
import { paramsContext } from "../0_Context/3_Params";
import { collectionsContext } from "../0_Context/11_SideBarCollections";

const Runner = () => {
  const { HTTP_Method } = useContext(httpMethodContext);
  const { url } = useContext(urlContext);
  const { headers } = useContext(headersContext);
  const { positive } = useContext(jsonBodyContext);
  const { result, setResultFlag } = useContext(testResultContext);
  const { tableData, setTableData } = useContext(preRequestContext);

  const { folderName, requestName } = useContext(collectionsContext);

  const [fileOutput, setFileOutput] = useState(false);
  const [fileDownload, setFileDownload] = useState(false);

  const endpoint = "http://localhost:8082/process"; //"http://localhost:3080/api/file";
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

  const { pathParams } = useContext(paramsContext);
  const pathParamsRegex = /:(\w+)/g;

  const replacePathParam = (url, param, value) => {
    const regex = new RegExp(param, "g");
    return url.replace(regex, value);
  };

  function handleUrl() {
    let tempUrl = url;
    const parsedUrl = new URL(tempUrl);
    const path = parsedUrl.pathname;

    let tempPathParams = path
      ?.match(pathParamsRegex)
      ?.map((param) => param.slice(1));

    if (tempPathParams?.length > 0) {
      tempPathParams.forEach((parameter) => {
        let keyPathParam = ":" + parameter;
        const foundParam = pathParams.find(
          (param) => param.key === keyPathParam
        );
        if (foundParam) {
          tempUrl = replacePathParam(tempUrl, keyPathParam, foundParam.value);
        }
      });
    }
    return tempUrl;
  }

  function preRequestOutput() {
    let updatedTableData = [];
    if (tableData) {
      updatedTableData = tableData.map((subArray) => {
        const [
          sourceRequest,
          sourceType,
          sourceKey,
          destinationType,
          destinationKey,
        ] = subArray;

        return {
          sourceRequest: sourceRequest,
          sourceType: sourceType,
          sourceKey: sourceKey,
          destType: destinationType,
          destKey: destinationKey,
        };
      });
    }
    return updatedTableData;
  }

  const handleProcessClick = () => {
    setFileDownload(false);

    const configuration = {
      maxContentLength: 10 * 1024 * 1024,
      maxBodyLength: 10 * 1024 * 1024,
    };

    const metadata = {
      name: "exportData",
    };

    const params = {
      folderName: folderName ? folderName : "Collection-Request Run",
      requestName: requestName ? requestName : "Request Run",
    };

    try {
      axios
        .post(
          endpoint,
          {
            method: HTTP_Method["label"] ? HTTP_Method["label"] : HTTP_Method,
            url: url ? handleUrl() : "",
            headers: headers ? JSON.parse(headers) : {},
            positive: positive ? JSON.parse(positive) : {},
            queryParamsOutput: result ? handleQueryOutput() : [],
            output: result ? handleOutput() : [],
            preRequest: preRequestOutput(),
          },
          { metadata, params },
          configuration,
          {
            header,
          }
        )
        .then((response) => {
          stopCheckingFile();
          console.log(response.data);
        })
        .catch((error) => {
          stopCheckingFile();
          console.log(error);
        });
    } catch (err) {
      stopCheckingFile();
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
          .get("http://localhost:8082/checkFile", { type: "text/plain" })
          .then((response) => {
            const data = response.data;
            if (data.includes("doesnot")) {
              // retry after 1 second
            } else {
              clearInterval(intervalId);
              setFileOutput(false);
              // setFileDownload(true);
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
      const response = await axios.get("http://localhost:8082/download", {
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
        onClick={() => {
          handleProcessClick();
          setFileOutput(true);
        }}
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
