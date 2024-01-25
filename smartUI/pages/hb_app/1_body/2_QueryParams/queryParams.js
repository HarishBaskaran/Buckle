import React, { useContext, useEffect, useState, useCallback } from "react";
import { urlContext } from "../0_Context/2_Url";
import { queryParamsContext } from "../0_Context/3_Query";
import TestConfig from "./queryTestConfig";
import { exportImportContext } from "../0_Context/0_ExportImport";

const convert = (url) => {
  const queryParam = Object.fromEntries(
    new URLSearchParams(url.split("?")[1]).entries()
  );

  return Object.entries(queryParam).map(([key, value]) => ({
    key,
    value,
  }));
};

const Query = () => {
  const { url, setUrl } = useContext(urlContext);
  const { queryParams, setQueryParams, setQueryParamsFlag } =
    useContext(queryParamsContext);

  const { globalImportQueryParamFlag, setGlobalImportQueryParamFlag } =
    useContext(exportImportContext);

  const [isUserInput, setIsUserInput] = useState(false);

  function handleInputChange(event, flag, idx) {
    const transformed = convert(url);

    Object.entries(transformed).map(([key, value], i) => {
      if (i == idx) {
        if (flag) value["key"] = event.target.value;
        else value["value"] = event.target.value;
      }
    });

    const param = transformed.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});

    setUrl(`${url.split("?")[0]}?${new URLSearchParams(param).toString()}`);
  }

  useEffect(() => {
    if (url.includes("?") && !isUserInput) {
      setQueryParams(convert(url));
      if (!globalImportQueryParamFlag) {
        setQueryParamsFlag(true);
      } else {
        setGlobalImportQueryParamFlag(false);
      }
    }
    if (!url.includes("?")) {
      setQueryParams([]);
      setQueryParamsFlag(true);
    }
  }, [url, isUserInput]);

  const handleUserFocus = useCallback(() => {
    setIsUserInput(true);
  }, [setIsUserInput]);

  const handleUserBlur = useCallback(() => {
    setIsUserInput(false);
  }, [setIsUserInput]);

  return (
    <>
      <div key="QueryParams Headers" className="flex">
        <p className="mt-2 ml-2 p-2 text-center text-sm font-bold text-sky-600 w-[30%] border border-sky-600">
          Key
        </p>
        <p className="mt-2 mr-2 p-2 text-center text-sm font-bold text-sky-600 w-[30%] border !border-l-0 border-sky-600">
          Value
        </p>
      </div>
      {queryParams?.map(({ key, value }, i) => {
        return (
          <div key={`${key}-${value}`} className="flex">
            <input
              type="text"
              defaultValue={key}
              onChange={(event) => {
                handleInputChange(event, true, i);
              }}
              onFocus={handleUserFocus}
              onBlur={handleUserBlur}
              className="ml-2 p-2 text-center text-sm w-[30%] border border-t-0 border-sky-600"
            />
            <input
              type="text"
              defaultValue={value}
              onChange={(event) => {
                handleInputChange(event, false, i);
              }}
              onFocus={handleUserFocus}
              onBlur={handleUserBlur}
              className="mr-2 p-2 text-center text-sm w-[30%] border border-t-0 !border-l-0 border-sky-600"
            />
          </div>
        );
      })}
      <TestConfig />
    </>
  );
};

export default Query;
