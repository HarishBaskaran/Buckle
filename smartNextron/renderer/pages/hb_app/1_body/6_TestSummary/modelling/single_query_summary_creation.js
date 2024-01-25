import React, { useEffect, useState, useContext } from "react";
import { defaultCustomTestDataContext } from "../../0_Context/7_DefaultCustomTestDataConfig";
import { queryTestDataConfigContext } from "../../0_Context/6_QueryTestDataConfig";
import { testQuerySummaryContext } from "../../0_Context/9_TestQuerySummary";
import {
  compareAndRetainResponseInSummary,
  mapChangeSummary,
} from "./summaryCreation";

const SingleQueryCreate = () => {
  const { changeQuerySummary, setChangeQuerySummary } = useContext(
    testQuerySummaryContext
  );

  const { configEntries } = useContext(defaultCustomTestDataContext);

  const { querySingleTestConfig, queryParamType } = useContext(
    queryTestDataConfigContext
  );

  useEffect(() => {
    if (querySingleTestConfig.length > 0) {
      let newConfig = mapChangeSummary(
        querySingleTestConfig,
        queryParamType,
        configEntries
      );

      let configuration = compareAndRetainResponseInSummary(
        changeQuerySummary,
        newConfig
      );
      setChangeQuerySummary(configuration);
    } else {
      setChangeQuerySummary([]);
    }
  }, [querySingleTestConfig]);

  return null;
};
export default SingleQueryCreate;
