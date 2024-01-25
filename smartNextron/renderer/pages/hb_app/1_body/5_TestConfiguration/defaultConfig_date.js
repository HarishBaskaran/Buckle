import React, { useContext } from "react";

import Button from "../../../hb_components/button";
import Input from "../../../hb_components/inputNoChange";
import { singleQueryCustomTestDataContext } from "../0_Context/7A_SingleQueryCustomTestDataConfig";
import { queryTestDataConfigContext } from "../0_Context/6_QueryTestDataConfig";

const DefaultConfigDate = () => {
  let global_date = "";

  let flag_global_date = false;

  let { option } = useContext(singleQueryCustomTestDataContext);

  const {
    querySingleTestConfig,
    setQuerySingleTestConfig,
    setQuerySingleTestConfigFlag,
  } = useContext(queryTestDataConfigContext);

  const handleGlobalDateChange = (event) => {
    global_date = event.target.value;
    flag_global_date = true;
  };

  const handleGlobalDateSave = () => {
    let tempList = querySingleTestConfig.map((item) => {
      return {
        ...item,
        options: item.options.map((obj) => {
          if (obj.label === option.label) {
            return {
              ...obj,
              date: flag_global_date ? global_date : "",
              selected: true,
            };
          }
          return obj;
        }),
      };
    });
    setQuerySingleTestConfigFlag(true);
    setQuerySingleTestConfig(tempList);
  };

  const defaultGlobalCustomHeader = () => {
    return (
      <div className="flex justify-between">
        <h1 className="my-[20px] font-bold">Global Custom Configuration</h1>
        <Button
          size="small"
          type="primary_inverse"
          className="!py-0 !m-5"
          label="Save"
          onClick={() => handleGlobalDateSave()}
        />
      </div>
    );
  };

  const defaultGlobalCustomDateValue = () => {
    return (
      <>
        {defaultGlobalCustomHeader()}
        <div
          key="globalCustomDate"
          className="grid grid-cols-3 mb-[5px] container items-center"
        >
          <h6 className="uppercase text-sm">Date: </h6>
          <span className="text-sm break-all">{global_date}</span>
          <Input
            placeholder={"new val"}
            onChange={(event) => handleGlobalDateChange(event)}
          />
        </div>
      </>
    );
  };

  return defaultGlobalCustomDateValue();
};

export default DefaultConfigDate;
