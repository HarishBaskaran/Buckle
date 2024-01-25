import React, { useEffect, useContext } from "react";
import { jsonBodyContext } from "../../0_Context/5_JsonBody";
import { testDataConfigContext } from "../../0_Context/6_TestDataConfig";
import { testSummaryContext } from "../../0_Context/9_TestSummary";
import { defaultCustomTestDataContext } from "../../0_Context/7_DefaultCustomTestDataConfig";
import {
  compareAndRetainResponseInMultiSummary,
  mapChangeMultiSummary,
} from "./summaryCreation";

const MultiStatusCreation = () => {
  const { parsedPositiveData } = useContext(jsonBodyContext);

  const { multiChangeSummary, setMultiChangeSummary } =
    useContext(testSummaryContext);

  const { configEntries } = useContext(defaultCustomTestDataContext);

  const { multiTestConfig, multiHeaders } = useContext(testDataConfigContext);

  useEffect(() => {
    let newConfig = mapChangeMultiSummary(
      multiHeaders,
      "JSON Paths",
      multiTestConfig,
      parsedPositiveData.environment,
      configEntries
    );

    let configuration = compareAndRetainResponseInMultiSummary(
      multiChangeSummary,
      newConfig
    );

    setMultiChangeSummary(configuration);
  }, [multiTestConfig]);

  useEffect(() => {
    console.log(multiChangeSummary);
  }, [multiChangeSummary]);

  return null;
};
export default MultiStatusCreation;
