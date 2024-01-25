import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { urlContext } from "../0_Context/2_Url";
import { paramsContext } from "../0_Context/3_Params";
import Header from "../../../hb_components/header";

const PathParam = () => {
  const { url, setUrl } = useContext(urlContext);
  const {
    pathParams,
    setPathParams,
    pathParamsFlag,
    setPathParamsFlag,
    tempParams,
    setTempParams,
  } = useContext(paramsContext);

  const pathParamsRegex = /:(\w+)/g;
  let tempPathParams;

  const [isUserInput, setIsUserInput] = useState(false);

  function handleInputChange(event, idx) {
    // console.log("inside input");
    tempPathParams = pathParams;
    Object.entries(tempPathParams).map(([key, value], i) => {
      if (i == idx) {
        value["value"] = event.target.value;
      }
    });

    const param = tempPathParams.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});

    setTempParams(param);
    setIsUserInput(false);
  }

  useEffect(() => {
    // console.log("inside useEffect");
    if (!isUserInput) {
      // console.log("inside useEffect if condition", isUserInput);
      tempPathParams = [];
      try {
        if (!url || !url.length > 0) return;
        const parsedUrl = new URL(url);
        const path = parsedUrl.pathname;

        tempPathParams = path
          ?.match(pathParamsRegex)
          ?.map((param) => param.slice(1));

        if (tempPathParams?.length > 0) {
          let pathParamsArray = tempPathParams.map((parameter) => {
            // console.log({ parameter: parameter });
            if (tempParams) {
              // console.log(tempParams);

              let foundParamValue = "";
              for (const paramKey in tempParams) {
                if (paramKey === ":" + parameter) {
                  foundParamValue = tempParams[paramKey];
                  break;
                }
              }

              return {
                key: ":" + parameter,
                value: foundParamValue,
              };
            } else {
              return {
                key: ":" + parameter,
                value: "",
              };
            }
          });
          // console.log({ tempPathParams: tempPathParams });
          // console.log({ pathParamsArray: pathParamsArray });
          setPathParams(pathParamsArray);
          setPathParamsFlag(true);
        }
      } catch (error) {
        console.log("error", error);
        // setPathParams(tempPathParams);
        // setPathParamsFlag(true);
      }
    }
  }, [url, isUserInput]);

  // useEffect(() => {
  //   console.log(pathParams);
  // }, [pathParams]);

  const handleUserFocus = useCallback(() => {
    setIsUserInput(true);
  }, [setIsUserInput]);

  return (
    <>
      <Header className="text-sky-600" label="Path Param Details:" />
      <div key="QueryParams Headers" className="flex">
        <p className="mt-2 ml-2 p-2 text-center text-sm font-bold text-sky-600 w-[30%] border border-sky-600">
          Key
        </p>
        <p className="mt-2 mr-2 p-2 text-center text-sm font-bold text-sky-600 w-[30%] border !border-l-0 border-sky-600">
          Value
        </p>
      </div>
      {/* {console.log("rendered")} */}
      {pathParams?.map(({ key, value }, i) => {
        return (
          <div key={`${key}-${value}`} className="flex">
            <p className="ml-2 p-2 text-center text-sm w-[30%] border border-t-0 border-sky-600">
              {key}
            </p>
            <input
              type="text"
              defaultValue={value}
              // onChange={(event) => {
              //   handleInputChange(event, i);
              // }}
              onFocus={handleUserFocus}
              onBlur={(event) => {
                handleInputChange(event, i);
              }}
              className="mr-2 p-2 text-center text-sm w-[30%] border border-t-0 !border-l-0 border-sky-600"
            />
          </div>
        );
      })}
    </>
  );
};

export default PathParam;
