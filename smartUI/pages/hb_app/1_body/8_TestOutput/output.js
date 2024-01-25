import React, { useEffect, useState, useContext } from "react";
import { faker } from "@faker-js/faker";
import { envBody } from "../data/postman_env_schema";
import { exportStateAsJSON } from "../utils/exportStateAsJSON";
import { CopyToClipboard } from "../utils/copyToClipboard";
import Button from "smart/pages/hb_components/button";
import TextArea from "smart/pages/hb_components/textarea";
import { jsonBodyContext } from "../0_Context/5_JsonBody";
import { headersContext } from "../0_Context/4_Headers";
import { urlContext } from "../0_Context/2_Url";
import { httpMethodContext } from "../0_Context/1_HttpMethod";
import { testResultContext } from "../0_Context/10_TestRunner";

export default function Output() {
  const { HTTP_Method } = useContext(httpMethodContext);
  const { url } = useContext(urlContext);
  const { headers } = useContext(headersContext);
  const { positive, parsedPositiveData } = useContext(jsonBodyContext);
  const { result } = useContext(testResultContext);

  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(result);
  }, [result]);

  const JSONPaths_Formatter = (json) => {
    try {
      var output = json;
      var string = "";
      output.forEach((element) => {
        string = string + element + "\n";
      });
      setOutput(string);
    } catch (e) {}
  };

  const handle_Positive_JSONPaths_Click = () => {
    JSONPaths_Formatter(parsedPositiveData.jsonPaths);
  };

  const handleEnvClick = (json) => {
    try {
      var array = [];

      for (let i = 0; i < json.jsonPaths.length; i++) {
        var objects = {
          key: "",
          value: null,
          type: "default",
          enabled: true,
        };

        var element = json.jsonPaths[i];
        var path = "";
        if (element.charAt(0) === "$" && element.charAt(1) === ".")
          path = element.substring(2);
        else path = element.substring(1);

        let value = path.replace("[", "");
        value = value.replace("]", "");
        value = value.replace(".", "__");
        value = value.replace(/'/g, "__");

        objects["value"] = json.environment[i];
        objects["key"] = value;

        array.push(objects);
      }
      envBody["values"] = array;
      envBody["id"] = faker.datatype.uuid();

      setOutput(JSON.stringify(envBody, null, 2));
    } catch (e) {}
  };

  const handle_Positive_Env_Click = () => {
    handleEnvClick(parsedPositiveData);
  };

  const headerComponent = (headerName) => {
    return <h1 className="my-[5px] text-sm">{headerName}</h1>;
  };

  const buttons1 = (label, value) => {
    return (
      <Button
        size="small"
        type="primary_link"
        className="ml-[20px] !px-0 text-left"
        label={label}
        onClick={() => setOutput(value)}
      />
    );
  };

  const buttons2 = (label, value) => {
    return (
      <Button
        size="small"
        type="primary_link"
        className="ml-[20px] !px-0 text-left"
        label={label}
        onClick={value}
      />
    );
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col">
          <div className="flex mb-[20px]">
            <Button
              size="small"
              type="primary_inverse"
              className=""
              label="Export"
              onClick={() => exportStateAsJSON(output, "output.json")}
            />
            <Button
              size="small"
              type="primary_inverse"
              className=""
              label="Copy"
              onClick={() => CopyToClipboard(output)}
            />
          </div>
          {headerComponent("Test Output")}
          {buttons1("Full Output", JSON.stringify(result, null, 2))}
          {buttons1("Single Query Output", result?.singleQuery?.join("\n"))}
          {buttons1("Multi Query Output", result?.multiQuery?.join("\n"))}
          {buttons1(
            "Single Body Output",
            JSON.stringify(result?.singleBody, null, 2)
          )}
          {buttons1(
            "Multi Body Output",
            JSON.stringify(result?.multiBody, null, 2)
          )}

          {headerComponent("Headers")}
          {buttons1(
            "Method",
            HTTP_Method ? JSON.stringify(HTTP_Method, null, 2) : ""
          )}
          {buttons1("Url", url)}
          {buttons1("Headers", headers)}

          {headerComponent("Positive Payloads")}
          {buttons1("Positive", positive)}
          {buttons2("JSON Paths", handle_Positive_JSONPaths_Click)}
          {buttons1("Parsed Body", JSON.stringify(parsedPositiveData, null, 2))}
          {buttons1(
            "Postman Body",
            parsedPositiveData?.body
              ? JSON.stringify(parsedPositiveData.body, null, 2)
              : ""
          )}
          {buttons2("Postman Env.", handle_Positive_Env_Click)}
        </div>

        <TextArea
          size="small"
          className="mx-[40px] w-[80%] h-[70vh]"
          name="getOutput"
          placeholder="Get your outputs as JSON"
          defaultValue={output}
          readOnly={true}
        />
      </div>
    </>
  );
}
