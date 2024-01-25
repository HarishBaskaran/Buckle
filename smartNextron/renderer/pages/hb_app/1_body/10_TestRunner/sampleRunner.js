import { useContext, useState } from "react";

import axios from "axios";
import { httpMethodContext } from "../0_Context/1_HttpMethod";
import { urlContext } from "../0_Context/2_Url";
import { headersContext } from "../0_Context/4_Headers";
import { jsonBodyContext } from "../0_Context/5_JsonBody";
import { testResultContext } from "../0_Context/10_TestRunner";
import { preRequestContext } from "../0_Context/12_PreRequest";
import { paramsContext } from "../0_Context/3_Params";
import { collectionsContext } from "../0_Context/11_SideBarCollections";

const SampleRunner = () => {
  const { HTTP_Method } = useContext(httpMethodContext);
  const { url } = useContext(urlContext);
  const { headers } = useContext(headersContext);
  const { positive } = useContext(jsonBodyContext);
  const { result } = useContext(testResultContext);
  const { tableData } = useContext(preRequestContext);

  const { folderName, requestName } = useContext(collectionsContext);

  const [response, setResponse] = useState([]);

  const endpoint = "http://localhost:8082/sampleRun"; //"http://localhost:3080/api/file";
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
    const configuration = {
      maxContentLength: 10 * 1024 * 1024,
      maxBodyLength: 10 * 1024 * 1024,
    };

    const metadata = {
      name: "exportData",
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
          { metadata },
          configuration,
          {
            header,
          }
        )
        .then((response) => {
          setResponse(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return { handleProcessClick, response };
};

export default SampleRunner;
