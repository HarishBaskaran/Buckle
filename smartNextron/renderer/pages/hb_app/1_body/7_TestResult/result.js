import React, { useEffect, useState, useContext } from "react";
import ReplacerExport from "../4_Body/replacer";
import { jsonBodyContext } from "../0_Context/5_JsonBody";
import { testResultContext } from "../0_Context/10_TestRunner";
import { urlContext } from "../0_Context/2_Url";
import { testSummaryContext } from "../0_Context/9_TestSummary";
import { testQuerySummaryContext } from "../0_Context/9_TestQuerySummary";
import { CheckType } from "../utils/check_type";
import { paramsContext } from "../0_Context/3_Params";

const Result = () => {
  const { positive } = useContext(jsonBodyContext);
  const { url } = useContext(urlContext);

  const { setResult, resultFlag, setResultFlag } =
    useContext(testResultContext);

  const { pathParams } = useContext(paramsContext);
  const pathParamsRegex = /:(\w+)/g;

  const { changeSummary, multiChangeSummary } = useContext(testSummaryContext);
  const { changeQuerySummary, multiChangeQuerySummary } = useContext(
    testQuerySummaryContext
  );

  const [render, setRender] = useState(false);

  function singleBodySummary(array, output) {
    changeSummary.forEach((item) => {
      var json = "";
      var path = "";
      var element = item.fieldName;

      if (element.charAt(0) === "$" && element.charAt(1) === ".")
        path = element.substring(2);
      else path = element.substring(1);

      json = ReplacerExport(
        json == "" ? positive : json,
        String(path),
        String(item.newFieldValue),
        CheckType(item.newFieldValue).toLowerCase()
      );

      array.push(JSON.parse(json));
      let object = {};
      object["entity"] = JSON.parse(json);
      object["changeSummary"] = [item];
      object["statusCode"] = item.status;
      output.push(object);
    });
  }

  function multiBodyFromSummary(multiArray, output) {
    multiChangeSummary.forEach((item) => {
      var json = "";
      item.tests.forEach((tests) => {
        var path = "";
        var element = tests.fieldName;

        if (element.charAt(0) === "$" && element.charAt(1) === ".")
          path = element.substring(2);
        else path = element.substring(1);

        json = ReplacerExport(
          json == "" ? positive : json,
          String(path),
          String(tests.newFieldValue),
          CheckType(tests.newFieldValue).toLowerCase()
        );
      });

      let answer = JSON.parse(json);
      multiArray.push(answer);

      let object = {};
      object["entity"] = answer;
      object["changeSummary"] = item.tests;
      object["statusCode"] = item.status;
      output.push(object);
    });
  }

  const replacePathParam = (url, param, value) => {
    const regex = new RegExp(param, "g");
    return url.replace(regex, value);
  };

  function SingleQueryFromSummary(multiArray, output) {
    changeQuerySummary.forEach((item) => {
      let tempUrl = url;
      if (item.fieldName.startsWith(":")) {
        // console.log(item.fieldName);
        tempUrl = replacePathParam(tempUrl, item.fieldName, item.newFieldValue);

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
              tempUrl = replacePathParam(
                tempUrl,
                keyPathParam,
                foundParam.value
              );
            }
          });
        }

        multiArray.push(`${tempUrl}`);

        let object = {};
        object["entity"] = `${tempUrl}`;
        object["changeSummary"] = [item];
        object["statusCode"] = item.status;
        object["response"] = item.response;
        output.push(object);
      } else {
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
              tempUrl = replacePathParam(
                tempUrl,
                keyPathParam,
                foundParam.value
              );
            }
          });
        }

        let queryParam = Object.fromEntries(
          new URLSearchParams(tempUrl.split("?")[1]).entries()
        );

        queryParam[item.fieldName] = item.newFieldValue;

        multiArray.push(
          `${tempUrl.split("?")[0]}?${new URLSearchParams(
            queryParam
          ).toString()}`
        );

        let object = {};
        object["entity"] = `${tempUrl.split("?")[0]}?${new URLSearchParams(
          queryParam
        ).toString()}`;
        object["changeSummary"] = [item];
        object["statusCode"] = item.status;
        object["response"] = item.response;
        output.push(object);
      }
    });
  }

  function MultiQueryFromSummary(multiArray, output) {
    multiChangeQuerySummary.forEach((item) => {
      let tempUrl = url;

      let queryParam = Object.fromEntries(
        new URLSearchParams(tempUrl.split("?")[1]).entries()
      );
      item.tests.forEach((tests) => {
        if (tests.fieldName.startsWith(":")) {
          tempUrl = replacePathParam(
            tempUrl,
            tests.fieldName,
            tests.newFieldValue
          );
        } else {
          queryParam[tests.fieldName] = tests.newFieldValue;
        }
      });

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

      multiArray.push(
        `${tempUrl.split("?")[0]}?${new URLSearchParams(queryParam).toString()}`
      );
      let object = {};
      object["entity"] = `${tempUrl.split("?")[0]}?${new URLSearchParams(
        queryParam
      ).toString()}`;
      object["changeSummary"] = item.tests;
      object["statusCode"] = item.status;
      output.push(object);
    });
  }

  const prepareOutputData = () => {
    let array = [];
    let output = [];
    let object = {};

    singleBodySummary(array, output);
    object["singleBody"] = array;
    object["singleBodyTestOutput"] = output;

    array = [];
    output = [];
    multiBodyFromSummary(array, output);
    object["multiBody"] = array;
    object["multiBodyTestOutput"] = output;

    array = [];
    output = [];
    SingleQueryFromSummary(array, output);
    object["singleQuery"] = array;
    object["singleQueryTestOutput"] = output;

    array = [];
    output = [];
    MultiQueryFromSummary(array, output);
    object["multiQuery"] = array;
    object["multiQueryTestOutput"] = output;

    setResult(object);
    setRender(true);
  };

  useEffect(() => {
    prepareOutputData();
  }, [
    changeSummary,
    multiChangeSummary,
    changeQuerySummary,
    multiChangeQuerySummary,
  ]);

  useEffect(() => {
    if (render) {
      // prepareOutputData();
      setRender(false);
    }
    if (resultFlag) {
      prepareOutputData();
      setResultFlag(false);
    }
  }, [render, resultFlag]);
};

export default Result;
