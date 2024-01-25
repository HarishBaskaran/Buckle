import React, { useEffect, useState, useContext } from "react";
import { queryTestDataConfigContext } from "../0_Context/6_QueryTestDataConfig";
import SingleQueryCreate from "../6_TestSummary/modelling/single_query_summary_creation";
import Result from "../7_TestResult/result";
import { faker } from "@faker-js/faker";
import {
  createDate,
  returnBoundary,
  returnDate,
  returnEmail,
} from "./valuesUtils";
import moment from "moment/moment";
import { testDataConfigContext } from "../0_Context/6_TestDataConfig";
import SingleSummaryCreate from "../6_TestSummary/modelling/single_summary_creation";
import MultiStatusCreation from "../6_TestSummary/modelling/multi_summary_creation";
import MultiQueryCreation from "../6_TestSummary/modelling/multi_query_summary_creation";

const RefreshConfig = () => {
  const {
    querySingleTestConfig,
    setQuerySingleTestConfig,
    queryMultiTestConfig,
    setQueryMultiTestconfig,
  } = useContext(queryTestDataConfigContext);

  const {
    singleTestConfig,
    setSingleTestConfig,
    multiTestConfig,
    setMultiTestconfig,
  } = useContext(testDataConfigContext);

  function configuration(config) {
    switch (config.label) {
      case "UUID":
        return faker.datatype.uuid().toString();
      case "Custom":
        return config.value;
      case "Email":
        return config.selectors.range > 0
          ? returnEmail(config.selectors.format, config.selectors.range)
          : "";
      case "Date":
        let date = returnDate(config.selectors.type);
        if (config.selectors.formatFlag) {
          date = moment(date, "DD/MM/YYYY").format(config.selectors.format);
        }
        return date;
      case "Minimum":
        return config.selectors.range > 0
          ? returnBoundary(config.selectors.format, config.selectors.range)
          : "";
      case "Maximum":
        return config.selectors.range > 0
          ? returnBoundary(config.selectors.format, config.selectors.range)
          : "";
      case "Pattern":
        let value =
          config.selectors.prefix != ""
            ? config.selectors.prefix
            : "" + config.selectors.range > 0
            ? returnBoundary(config.selectors.format, config.selectors.range)
            : "" + config.selectors.timestamp
            ? returnTimestamp()
            : "";
        return value;
    }
  }

  const handleCustomChange = (testConfig, setTestConfig) => {
    let tempList = "";
    if (testConfig) {
      tempList = testConfig?.map((item) => {
        return {
          ...item,
          custom: item.custom.map((custom) => {
            if (custom.unique) {
              let updatedValue = custom.value;
              item.config.forEach((config) => {
                if (config.label === custom.label && config.selected) {
                  updatedValue = configuration(config);
                }
              });

              return {
                ...custom,
                value: updatedValue,
              };
            }
            return { ...custom };
          }),
        };
      });
      setTestConfig(tempList);
    }
  };

  const handleMultiCustomChange = (testConfig, setTestConfig) => {
    if (testConfig) {
      let tempList = testConfig.map((item) => {
        return {
          ...item,
          config: item.config.map((config) => {
            return config.map((testcase) => {
              if (testcase.unique) {
                return {
                  ...testcase,
                  value: configuration(testcase),
                };
              }
              return { ...testcase };
            });
          }),
        };
      });

      setTestConfig(tempList);
    }
  };

  useEffect(() => {
    handleCustomChange(querySingleTestConfig, setQuerySingleTestConfig);
    handleCustomChange(singleTestConfig, setSingleTestConfig);
    handleMultiCustomChange(queryMultiTestConfig, setQueryMultiTestconfig);
    handleMultiCustomChange(multiTestConfig, setMultiTestconfig);
  }, []);

  return (
    <>
      <SingleQueryCreate />
      <SingleSummaryCreate />
      <MultiQueryCreation />
      <MultiStatusCreation />
      <Result />
    </>
  );
};

export default RefreshConfig;
