import React, { useEffect, useState, useContext } from "react";
import { collectionsContext } from "../0_Context/11_SideBarCollections";
import Button from "smart/pages/hb_components/button";
import { httpMethodContext } from "../0_Context/1_HttpMethod";
import { urlContext } from "../0_Context/2_Url";
import { headersContext } from "../0_Context/4_Headers";
import { jsonBodyContext } from "../0_Context/5_JsonBody";
import { testResultContext } from "../0_Context/10_TestRunner";
import { testQuerySummaryContext } from "../0_Context/9_TestQuerySummary";
import { testSummaryContext } from "../0_Context/9_TestSummary";
import { queryTestDataConfigContext } from "../0_Context/6_QueryTestDataConfig";
import { testDataConfigContext } from "../0_Context/6_TestDataConfig";
import { defaultCustomTestDataContext } from "../0_Context/7_DefaultCustomTestDataConfig";
import { exportImportContext } from "../0_Context/0_ExportImport";
import axios from "axios";
import { preRequestContext } from "../0_Context/12_PreRequest";

const CollectionHeader = () => {
  const {
    setGlobalImportHTTPMethodFlag,
    setGlobalImportSingleFlag,
    setGlobalImportMultiFlag,
    setGlobalImportQueryFlag,
    setGlobalImportQueryParamFlag,
  } = useContext(exportImportContext);

  const { HTTP_Method, setHTTP_Method } = useContext(httpMethodContext);
  const { url, setUrl } = useContext(urlContext);
  const { headers, setHeaders } = useContext(headersContext);
  const { positive, parsedPositiveData, setPositive, setParsedPositiveData } =
    useContext(jsonBodyContext);

  const { configEntries, setConfigEntries } = useContext(
    defaultCustomTestDataContext
  );

  const {
    singleTestConfig,
    setSingleTestConfig,
    multiTestConfig,
    setMultiTestconfig,
    multiHeaders,
    setMultiHeaders,
  } = useContext(testDataConfigContext);

  const {
    querySingleTestConfig,
    setQuerySingleTestConfig,
    queryMultiTestConfig,
    setQueryMultiTestconfig,
    queryMultiHeaders,
    setQueryMultiHeaders,
  } = useContext(queryTestDataConfigContext);

  const {
    changeSummary,
    setChangeSummary,
    multiChangeSummary,
    setMultiChangeSummary,
  } = useContext(testSummaryContext);

  const {
    changeQuerySummary,
    setChangeQuerySummary,
    multiChangeQuerySummary,
    setMultiChangeQuerySummary,
  } = useContext(testQuerySummaryContext);

  const { result, setResult } = useContext(testResultContext);

  const {
    folderName,
    setFolderName,
    requestName,
    setRequestName,
    requestClickFlag,
    setRequestClickFlag,
  } = useContext(collectionsContext);

  const { tableData, setTableData } = useContext(preRequestContext);

  const handleFileExport = () => {
    const collection = {};
    collection["HTTP_Method"] = HTTP_Method ? HTTP_Method : "";
    collection["url"] = url ? url : "";
    collection["headers"] = headers ? JSON.parse(headers) : {};
    collection["positive"] = positive ? JSON.parse(positive) : {};
    collection["parsedPositiveData"] = parsedPositiveData
      ? parsedPositiveData
      : {};

    collection["singleTestConfig"] = singleTestConfig ? singleTestConfig : [];
    collection["singleQueryTestConfig"] = querySingleTestConfig
      ? querySingleTestConfig
      : [];

    collection["multiTestConfig"] = multiTestConfig ? multiTestConfig : [];
    collection["multiQueryTestConfig"] = queryMultiTestConfig
      ? queryMultiTestConfig
      : [];

    collection["multiHeaders"] = multiHeaders ? multiHeaders : [];
    collection["queryMultiHeaders"] = queryMultiHeaders
      ? queryMultiHeaders
      : [];

    collection["configEntries"] = configEntries;
    collection["result"] = result ? result : [];
    collection["changeSummary"] = changeSummary ? changeSummary : {};
    collection["changeQuerySummary"] = changeQuerySummary
      ? changeQuerySummary
      : {};

    collection["multiChangeSummary"] = multiChangeSummary
      ? multiChangeSummary
      : {};
    collection["multiChangeQuerySummary"] = multiChangeQuerySummary
      ? multiChangeQuerySummary
      : {};

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

    collection["preRequest"] = updatedTableData;
    return collection;
  };

  const dirEndpoint = "http://localhost:8080/save";

  const exportData = async () => {
    try {
      const response = await axios.post(dirEndpoint, handleFileExport(), {
        params: {
          folderName: folderName,
          requestName: requestName,
        },
        metadata: {
          name: "exportData",
        },
      });

      //   console.log(response.data);
    } catch (error) {
      console.error("Error saving request:", error);
      // Do something else, such as displaying an error message
    }
  };

  const [data, setData] = useState(JSON.stringify({}));
  const [importedFlag, setImportedFlag] = useState(false);

  useEffect(() => {
    if (importedFlag && data) {
      setGlobalImportHTTPMethodFlag(true);
      setGlobalImportQueryParamFlag(true);
      setGlobalImportQueryFlag(true);
      setGlobalImportSingleFlag(true);
      setGlobalImportMultiFlag(true);
      setImportedFlag(false);

      const parsed_data = data;

      setHTTP_Method(parsed_data.HTTP_Method);
      setUrl(parsed_data.url);

      if (Object.keys(parsed_data.headers).length === 0) setHeaders("");
      else setHeaders(JSON.stringify(parsed_data.headers, null, 2));

      if (Object.keys(parsed_data.positive).length === 0) setPositive("");
      else setPositive(JSON.stringify(parsed_data.positive, null, 2));

      setParsedPositiveData(parsed_data.parsedPositiveData);

      setSingleTestConfig(parsed_data.singleTestConfig);
      setQuerySingleTestConfig(parsed_data.singleQueryTestConfig);

      setMultiTestconfig(parsed_data.multiTestConfig);
      setMultiHeaders(parsed_data.multiHeaders);
      setQueryMultiTestconfig(parsed_data.multiQueryTestConfig);
      setQueryMultiHeaders(parsed_data.queryMultiHeaders);
      setConfigEntries(parsed_data.configEntries);

      setChangeSummary(parsed_data.changeSummary);
      setChangeQuerySummary(parsed_data.changeQuerySummary);
      setMultiChangeSummary(parsed_data.multiChangeSummary);
      setMultiChangeQuerySummary(parsed_data.multiChangeQuerySummary);
      setResult(parsed_data.result);
      const hasJSONObjects =
        Array.isArray(parsed_data.preRequest) &&
        parsed_data.preRequest.some((item) => typeof item === "object");

      if (hasJSONObjects) {
        const res = parsed_data.preRequest.map((obj) => {
          const {
            sourceRequest: sourceRequest,
            sourceType: sourceType,
            sourceKey: sourceKey,
            destType: destinationType,
            destKey: destinationKey,
          } = obj;

          return [
            sourceRequest,
            sourceType,
            sourceKey,
            destinationType,
            destinationKey,
          ];
        });
        setTableData(res);
      } else {
        setTableData([]);
      }
    }
  }, [data]);

  const importData = async () => {
    await axios
      .get(dirEndpoint, {
        params: {
          folderName: folderName,
          requestName: requestName,
        },
        metadata: {
          name: "importData",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
        setImportedFlag(true);
        // Handle the response data
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
        // Handle the error
      });
  };

  const [render, setRender] = useState(false);

  const handleSave = () => {
    setRender(false);
    exportData();
  };

  useEffect(() => {
    if (requestClickFlag) {
      importData();
      setRequestClickFlag(false);
      setRender(false);
    }
  }, [requestClickFlag]);

  useEffect(() => {
    if (!render) {
      setRender(true);
    }
  }, [render]);

  return render ? (
    folderName ? (
      <div className="flex w-full">
        <p className="ml-[10px] mr-[35px]">
          {folderName} / {requestName}
        </p>
        <Button
          label="Save"
          size="small"
          type="primary_inverse"
          className="h-[33px] !m-0"
          onClick={() => handleSave()}
        />
      </div>
    ) : (
      <p className="italic">
        New Request - Kindly create new req before start / export and import
        this in new request
      </p>
    )
  ) : (
    <></>
  );
};

export default CollectionHeader;
