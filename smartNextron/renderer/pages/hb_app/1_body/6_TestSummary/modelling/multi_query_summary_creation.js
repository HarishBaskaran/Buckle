import React, { useEffect, useState, useContext } from "react";
import { defaultCustomTestDataContext } from "../../0_Context/7_DefaultCustomTestDataConfig";
import { testQuerySummaryContext } from "../../0_Context/9_TestQuerySummary";
import { queryTestDataConfigContext } from "../../0_Context/6_QueryTestDataConfig";
import {
  compareAndRetainResponseInMultiSummary,
  mapChangeMultiSummary,
} from "./summaryCreation";

const MultiQueryCreation = () => {
  const { multiChangeQuerySummary, setMultiChangeQuerySummary } = useContext(
    testQuerySummaryContext
  );
  const { configEntries } = useContext(defaultCustomTestDataContext);

  const { queryParamType, queryMultiTestConfig, queryMultiHeaders } =
    useContext(queryTestDataConfigContext);

  useEffect(() => {
    if (queryMultiTestConfig.length > 0) {
      let newConfig = mapChangeMultiSummary(
        queryMultiHeaders,
        "Query Params",
        queryMultiTestConfig,
        queryParamType,
        configEntries
      );

      let configuration = compareAndRetainResponseInMultiSummary(
        multiChangeQuerySummary,
        newConfig
      );

      setMultiChangeQuerySummary(configuration);
    }
  }, [queryMultiTestConfig]);

  return null;
};
export default MultiQueryCreation;
