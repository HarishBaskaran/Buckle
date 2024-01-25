import React, { useState, useContext, useEffect } from "react";
import { queryParamsContext } from "../0_Context/3_Query";
import { queryTestDataConfigContext } from "../0_Context/6_QueryTestDataConfig";
import {
  dataTypeOptions,
  customOptions,
  customOptionsConfig,
} from "../data/options_schema";
import { options as multiOptions } from "../data/multi_options_schema";
import { exportImportContext } from "../0_Context/0_ExportImport";
import SingleQueryCreate from "../6_TestSummary/modelling/single_query_summary_creation";
import MultiQueryCreation from "../6_TestSummary/modelling/multi_query_summary_creation";

class makeQueryParamConfig {
  makerKeys(queryParams) {
    let keys = [];

    queryParams.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        keys.push(jsonObj.key);
      }
    });

    return keys;
  }

  makerSingleTestConfig(queryParams) {
    let keys = [];

    queryParams.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        let myObject = {};
        myObject["id"] = jsonObj.key;
        myObject["name"] = jsonObj.key;
        myObject["selected"] = false;
        myObject["dataType"] = dataTypeOptions;
        myObject["custom"] = customOptions;
        myObject["config"] = customOptionsConfig;
        keys.push(myObject);
      }
    });

    return keys;
  }

  makerMultiTestConfig(queryParams) {
    let myArray = [];

    queryParams.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        let myObject = {};
        myObject["id"] = jsonObj.key;
        myObject["name"] = jsonObj.key;
        myObject["selected"] = false;
        var array = [];
        array.push(multiOptions);
        myObject["options"] = array;
        array = [];
        array.push(customOptionsConfig);
        myObject["config"] = array;
        myArray.push(myObject);
      }
    });

    return myArray;
  }

  makerQueryType(queryParams) {
    let myArray = [];
    queryParams.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        let object = {
          fieldName: "",
          fieldType: "",
          oldFieldValue: "",
          newFieldValue: "",
          optionalField: false,
          uniqueField: false,
          status: 400,
          response: {},
        };
        object.fieldName = jsonObj.key;
        object.fieldType = typeof jsonObj.value;
        object.oldFieldValue = jsonObj.value;
        myArray.push(object);
      }
    });
    return myArray;
  }
}

const TestConfig = () => {
  const { queryParams, queryParamsFlag, setQueryParamsFlag } =
    useContext(queryParamsContext);
  const {
    setQuerySingleTestConfig,
    setQueryParamType,
    setQueryParamKeys,
    setQueryMultiTestconfig,
  } = useContext(queryTestDataConfigContext);

  const { globalImportQueryFlag, setGlobalImportQueryFlag } =
    useContext(exportImportContext);

  useEffect(() => {
    setQueryParamKeys(new makeQueryParamConfig().makerKeys(queryParams));
    setQueryParamType(new makeQueryParamConfig().makerQueryType(queryParams));
    if (queryParamsFlag && !globalImportQueryFlag) {
      setQuerySingleTestConfig(
        new makeQueryParamConfig().makerSingleTestConfig(queryParams)
      );
      setQueryMultiTestconfig(
        new makeQueryParamConfig().makerMultiTestConfig(queryParams)
      );
    } else if (globalImportQueryFlag) {
      setGlobalImportQueryFlag(false);
    }
    setQueryParamsFlag(false);
  }, [queryParamsFlag, globalImportQueryFlag]);
};

export default TestConfig;
