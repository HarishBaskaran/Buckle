import React, { useEffect, useState, useContext } from "react";
import Input from "smart/pages/hb_components/inputNoChange";
import Button from "smart/pages/hb_components/button";
import { config } from "../data/config_schema";
import Result from "../7_TestResult/result";
import { defaultCustomTestDataContext } from "../0_Context/7_DefaultCustomTestDataConfig";
import ConfigUpdate from "../6_TestSummary/modelling/configUpdation";

const DefaultConfig = () => {
  const [render, setRender] = useState(false);

  let { configEntries, setConfigEntries, setConfigFlag } = useContext(
    defaultCustomTestDataContext
  );

  let save = false;

  const handleChange = (event, key) => {
    save = true;
    const newValue = event.target.value;
    configEntries = configEntries.map(([configKey, configValue]) => {
      if (configKey === key) {
        if (typeof newValue === "string" && key === "string") {
          return [configKey, newValue];
        } else {
          if (Number.isInteger(parseInt(newValue)) && key === "integer") {
            return [configKey, newValue];
          } else if (newValue.includes(".") && key === "float") {
            return [configKey, newValue];
          }
        }
      }
      return [configKey, configValue];
    });
  };

  const handleModalClose = () => {
    if (save) {
      setConfigEntries(configEntries);
      setRender(true);
      setConfigFlag(true);
      save = false;
    }
  };

  useEffect(() => {
    setRender(false);
  }, [configEntries]);

  const defaultHeader = () => {
    return (
      <div className="flex justify-between">
        <h1 className="mb-[20px] font-bold"> Default Configuration</h1>
        <Button
          size="small"
          type="primary_inverse"
          className="!py-0 !mb-5 border border-sky-600"
          label="Save"
          onClick={() => handleModalClose()}
        />
      </div>
    );
  };

  const defaultValue = ([key, value]) => {
    return (
      <div
        key={`${key}-${value}`}
        className="grid grid-cols-3 mb-[5px] container items-center"
      >
        <h6 className="uppercase text-sm">{key}: </h6>
        <span className="text-sm break-all">{value}</span>
        <Input
          placeholder={"new val"}
          onChange={(event) => handleChange(event, key)}
        />
      </div>
    );
  };

  const Model = () => {
    return (
      <div className="ml-[20px] mt-[5px] pl-[20px] border-l-2">
        {defaultHeader()}
        {configEntries
          ? configEntries.map(defaultValue)
          : Object.entries(config).map(defaultValue)}
      </div>
    );
  };

  return render ? (
    <p></p>
  ) : (
    <>
      <Model />
      <ConfigUpdate />
      <Result />
    </>
  );
};

export default DefaultConfig;
