import { useContext, useEffect, useState } from "react";
import PopupModal from "../../../hb_components/popup1";
import axios from "axios";
import TextArea from "../../../hb_components/textarea";
import Button from "../../../hb_components/button";
import { paramsContext } from "../0_Context/3_Params";
import { testResultContext } from "../0_Context/10_TestRunner";
import { testQuerySummaryContext } from "../0_Context/9_TestQuerySummary";
import { testSummaryContext } from "../0_Context/9_TestSummary";
import { queryTestDataConfigContext } from "../0_Context/6_QueryTestDataConfig";
import { testDataConfigContext } from "../0_Context/6_TestDataConfig";
import { defaultCustomTestDataContext } from "../0_Context/7_DefaultCustomTestDataConfig";
import { jsonBodyContext } from "../0_Context/5_JsonBody";
import { headersContext } from "../0_Context/4_Headers";
import { urlContext } from "../0_Context/2_Url";
import { httpMethodContext } from "../0_Context/1_HttpMethod";
import { exportImportContext } from "../0_Context/0_ExportImport";
import { preRequestContext } from "../0_Context/12_PreRequest";

const CurlWrapper = () => {
  const {
    setGlobalImportHTTPMethodFlag,
    setGlobalImportSingleFlag,
    setGlobalImportMultiFlag,
    setGlobalImportQueryFlag,
    setGlobalImportQueryParamFlag,
  } = useContext(exportImportContext);

  const { setHTTP_Method } = useContext(httpMethodContext);
  const { setUrl } = useContext(urlContext);
  const { setHeaders } = useContext(headersContext);
  const { setPositive, setParsedPositiveData } = useContext(jsonBodyContext);

  const { setConfigEntries } = useContext(defaultCustomTestDataContext);

  const { setSingleTestConfig, setMultiTestconfig, setMultiHeaders } =
    useContext(testDataConfigContext);

  const {
    setQuerySingleTestConfig,
    setQueryMultiTestconfig,
    setQueryMultiHeaders,
  } = useContext(queryTestDataConfigContext);

  const { setChangeSummary, setMultiChangeSummary } =
    useContext(testSummaryContext);

  const { setChangeQuerySummary, setMultiChangeQuerySummary } = useContext(
    testQuerySummaryContext
  );

  const { setResult } = useContext(testResultContext);
  const { setTempParams } = useContext(paramsContext);
  const { setTableData } = useContext(preRequestContext);

  const importData = (response) => {
    const parsed_data = response.data;
    console.log(parsed_data);

    console.log({
      url: parsed_data.url,
      method: parsed_data.method,
      headers: parsed_data.headers,
      headerType: typeof parsed_data.headers,
      data: parsed_data.data,
      dataType: typeof parsed_data.data,
    });

    setGlobalImportHTTPMethodFlag(true);

    setHTTP_Method(parsed_data.method);
    setTempParams([]);
    setUrl(parsed_data.url);

    if (Object.keys(parsed_data.headers).length === 0) setHeaders("");
    else setHeaders(JSON.stringify(parsed_data.headers, null, 2));

    if (Object.keys(parsed_data.data).length === 0) setPositive("");
    else setPositive(parsed_data.data);

    setSingleTestConfig([]);
    setQuerySingleTestConfig([]);

    setMultiTestconfig([]);
    setQueryMultiTestconfig([]);

    setMultiHeaders(["JSON Paths"]);
    setQueryMultiHeaders(["Query Params"]);

    setChangeSummary([]);
    setChangeQuerySummary([]);
    setMultiChangeSummary([]);
    setMultiChangeQuerySummary([]);
    setResult([]);

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
  };

  const endpoint = "http://localhost:8082/curl";
  const createFile = async (data) => {
    try {
      const response = await axios.post(endpoint, data, {
        metadata: {
          name: "CurlConvert",
        },
      });
      console.log("Curl converted");
      importData(response);
    } catch (error) {
      console.error("CURL - Error in Curl conversion:", error);
    }
  };

  const [popupFlag, setPopupFlag] = useState(false);
  const [data, setData] = useState([]);

  return (
    <PopupModal
      buttonLabel={"Curl"}
      labelClassName="mb-[5px]"
      flag={popupFlag}
      open={() => setPopupFlag(true)}
      close={() => setPopupFlag(false)}
      save={() => {
        createFile(data);
        setPopupFlag(false);
      }}
      height="h-[55vh]"
      contentWidth="w-[850px] h-[30vh]"
      header="Convert Curl"
    >
      <div className="flex gap-5">
        <TextArea
          className="w-[650px] overflow-y-auto"
          value={data}
          setValue={setData}
        />
      </div>
    </PopupModal>
  );
};

export default CurlWrapper;
