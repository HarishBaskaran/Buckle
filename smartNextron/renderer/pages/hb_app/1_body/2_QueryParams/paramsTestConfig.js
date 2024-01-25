import React, { useContext, useEffect } from "react";
import { paramsContext } from "../0_Context/3_Params";
import { queryTestDataConfigContext } from "../0_Context/6_QueryTestDataConfig";
import {
  dataTypeOptions,
  customOptions,
  customOptionsConfig,
} from "../data/options_schema";
import { options as multiOptions } from "../data/multi_options_schema";
import { exportImportContext } from "../0_Context/0_ExportImport";

class makeParamConfig {
  makerKeys(pathParams, queryParams) {
    let keys = [];

    pathParams?.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        keys.push(jsonObj.key);
      }
    });

    queryParams?.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        keys.push(jsonObj.key);
      }
    });

    // console.log({ keys: keys });
    return keys;
  }

  makerSingleTestConfig(pathParams, queryParams) {
    let keys = [];

    function addConfig(item) {
      let myObject = {};
      myObject["id"] = item;
      myObject["name"] = item;
      myObject["selected"] = false;
      myObject["dataType"] = dataTypeOptions;
      myObject["custom"] = customOptions;
      myObject["config"] = customOptionsConfig;
      return myObject;
    }

    pathParams?.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        keys.push(addConfig(jsonObj.key));
      }
    });

    queryParams?.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        keys.push(addConfig(jsonObj.key));
      }
    });

    // console.log({ singleOptions: keys });
    return keys;
  }

  makerMultiTestConfig(pathParams, queryParams) {
    let myArray = [];

    function addConfig(item) {
      let myObject = {};
      myObject["id"] = item;
      myObject["name"] = item;
      myObject["selected"] = false;
      var array = [];
      array.push(multiOptions);
      myObject["options"] = array;
      array = [];
      array.push(customOptionsConfig);
      myObject["config"] = array;
      return myObject;
    }

    pathParams?.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        myArray.push(addConfig(jsonObj.key));
      }
    });

    queryParams?.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        myArray.push(addConfig(jsonObj.key));
      }
    });

    // console.log({ multiOptions: myArray });

    return myArray;
  }

  makerType(pathParams, queryParams) {
    let myArray = [];

    function addConfig(item, fieldType) {
      let object = {
        fieldName: "",
        fieldType: "",
        oldFieldValue: "",
        newFieldValue: "",
        optionalField: false,
        uniqueField: false,
        status: 400,
        response: "",
      };
      object.fieldName = item;
      object.fieldType = fieldType;
      object.oldFieldValue = item;
      return object;
    }

    pathParams?.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        myArray.push(addConfig(jsonObj.key, typeof jsonObj.value));
      }
    });

    queryParams?.forEach((jsonObj) => {
      if (jsonObj.hasOwnProperty("key")) {
        myArray.push(addConfig(jsonObj.key, typeof jsonObj.value));
      }
    });

    // console.log({ Type: myArray });

    return myArray;
  }
}

const ParamsTestConfig = () => {
  const {
    queryParams,
    queryParamsFlag,
    setQueryParamsFlag,
    pathParams,
    pathParamsFlag,
    setPathParamsFlag,
  } = useContext(paramsContext);

  const {
    setQuerySingleTestConfig,
    setQueryParamType,
    setQueryParamKeys,
    setQueryMultiTestconfig,
  } = useContext(queryTestDataConfigContext);

  const { globalImportQueryFlag, setGlobalImportQueryFlag } =
    useContext(exportImportContext);

  useEffect(() => {
    setQueryParamKeys(new makeParamConfig().makerKeys(pathParams, queryParams));
    setQueryParamType(new makeParamConfig().makerType(pathParams, queryParams));
    if ((pathParamsFlag || queryParamsFlag) && !globalImportQueryFlag) {
      setQuerySingleTestConfig(
        new makeParamConfig().makerSingleTestConfig(pathParams, queryParams)
      );
      setQueryMultiTestconfig(
        new makeParamConfig().makerMultiTestConfig(pathParams, queryParams)
      );
    } else if (globalImportQueryFlag) {
      setGlobalImportQueryFlag(false);
    }
    setQueryParamsFlag(false);
    setPathParamsFlag(false);
  }, [pathParamsFlag, queryParamsFlag, globalImportQueryFlag]);
};

export default ParamsTestConfig;
