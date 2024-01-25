import React, { useEffect, useState, useContext } from "react";
import { jsonBodyContext } from "../../0_Context/5_JsonBody";
import { testDataConfigContext } from "../../0_Context/6_TestDataConfig";
import { testSummaryContext } from "../../0_Context/9_TestSummary";
import { defaultCustomTestDataContext } from "../../0_Context/7_DefaultCustomTestDataConfig";
import {
  compareAndRetainResponseInSummary,
  mapChangeSummary,
} from "./summaryCreation";

const SingleSummaryCreate = () => {
  const { parsedPositiveData } = useContext(jsonBodyContext);
  const { changeSummary, setChangeSummary } = useContext(testSummaryContext);
  const { configEntries } = useContext(defaultCustomTestDataContext);
  const { singleTestConfig } = useContext(testDataConfigContext);

  useEffect(() => {
    if (singleTestConfig?.length > 0) {
      let newConfig = mapChangeSummary(
        singleTestConfig,
        parsedPositiveData.environment,
        configEntries
      );

      let configuration = compareAndRetainResponseInSummary(
        changeSummary,
        newConfig
      );

      setChangeSummary(configuration);
    } else {
      setChangeSummary([]);
    }
  }, [singleTestConfig]);

  return null;
};
export default SingleSummaryCreate;
