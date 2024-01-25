import React, { useEffect, useState, useContext } from "react";

import ImportIcon from "../../../hb_components/import_icon";
import ExportIcon from "../../../hb_components/export_icon";
import { exportImportContext } from "../0_Context/0_ExportImport";
import { httpMethodContext } from "../0_Context/1_HttpMethod";
import { urlContext } from "../0_Context/2_Url";
import { headersContext } from "../0_Context/4_Headers";
import { jsonBodyContext } from "../0_Context/5_JsonBody";
import { testSummaryContext } from "../0_Context/9_TestSummary";
import { testResultContext } from "../0_Context/10_TestRunner";
import { testDataConfigContext } from "../0_Context/6_TestDataConfig";
import { queryTestDataConfigContext } from "../0_Context/6_QueryTestDataConfig";
import { testQuerySummaryContext } from "../0_Context/9_TestQuerySummary";
import { defaultCustomTestDataContext } from "../0_Context/7_DefaultCustomTestDataConfig";
import { preRequestContext } from "../0_Context/12_PreRequest";
import { paramsContext } from "../0_Context/3_Params";

export default function ExportImport() {
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

  const { pathParams, setTempParams } = useContext(paramsContext);

  const [data, setData] = useState(JSON.stringify({}));
  const [importedFlag, setImportedFlag] = useState(false);

  const { tableData, setTableData } = useContext(preRequestContext);

  const handleFileExport = () => {
    const collection = {};
    collection["HTTP_Method"] = HTTP_Method ? HTTP_Method : "";
    collection["url"] = url ? url : "";
    collection["pathParams"] = pathParams ? pathParams : [];
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
          "Source Request": sourceRequest,
          "Source Type": sourceType,
          "Source Key": sourceKey,
          "Destination Type": destinationType,
          "Destination Key": destinationKey,
        };
      });
    }

    collection["preRequest"] = updatedTableData;

    return collection;
  };

  useEffect(() => {
    if (importedFlag) {
      setGlobalImportHTTPMethodFlag(true);
      setGlobalImportQueryParamFlag(true);
      setGlobalImportQueryFlag(true);
      setGlobalImportSingleFlag(true);
      setGlobalImportMultiFlag(true);
      setImportedFlag(false);

      const parsed_data = JSON.parse(data);
      setHTTP_Method(parsed_data.HTTP_Method);
      setTempParams(parsed_data.pathParams);
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
            "Source Request": sourceRequest,
            "Source Type": sourceType,
            "Source Key": sourceKey,
            "Destination Type": destinationType,
            "Destination Key": destinationKey,
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

  return (
    <div className="flex">
      <ImportIcon
        className="ml-[16px] mr-[6px] mt-[8px] w-[23px] h-[23px]"
        setData={setData}
        onClick={() => setImportedFlag(true)}
      />

      <ExportIcon
        className="mr-[18px] mt-[8px] w-[23px] h-[23px]"
        onClick={handleFileExport}
        stringify={true}
        fileName="collection.json"
      />
    </div>
  );
}
