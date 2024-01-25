import React, { useState, useEffect, useContext } from "react";
import { httpMethodContext } from "../0_Context/1_HttpMethod";
import { exportImportContext } from "../0_Context/0_ExportImport";
import { methods } from "../data/httpMethodsOptions";
import Dropdown from "smart/pages/hb_components/dropdown_single";

const HttpMethodDetails = () => {
  const { HTTP_Method, setHTTP_Method } = useContext(httpMethodContext);
  const { globalImportHTTPMethodFlag, setGlobalImportHTTPMethodFlag } =
    useContext(exportImportContext);
  const [options, setOptions] = useState(methods);

  useEffect(() => {
    if (globalImportHTTPMethodFlag && HTTP_Method && Object.keys(HTTP_Method)) {
      setOptions(
        options.map((item) => {
          if (item.label === HTTP_Method.label) {
            return { ...item, selected: true };
          } else {
            return { ...item, selected: false };
          }
        })
      );
      setGlobalImportHTTPMethodFlag(false);
    }
  }, [globalImportHTTPMethodFlag]);

  return (
    <Dropdown
      options={options}
      setOptions={setOptions}
      setValue={setHTTP_Method}
      width={"w-[140px]"}
      height={"h-[37px]"}
      className="mt-[3px]"
    />
  );
};

export default HttpMethodDetails;
