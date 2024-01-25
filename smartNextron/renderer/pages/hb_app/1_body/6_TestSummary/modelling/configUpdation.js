import React, { useEffect, useState, useContext } from "react";
import { defaultCustomTestDataContext } from "../../0_Context/7_DefaultCustomTestDataConfig";
import { testQuerySummaryContext } from "../../0_Context/9_TestQuerySummary";
import {
  mapConfigChangesInChangeMultiSummary,
  mapConfigChangesInChangeSummary,
} from "./summaryCreation";
import { testSummaryContext } from "../../0_Context/9_TestSummary";

const ConfigUpdate = () => {
  const {
    changeSummary,
    setChangeSummary,
    multiChangeSummary,
    setMultiChangeSummary,
  } = useContext(testSummaryContext);
  const {
    changeQuerySummary,
    setChangeQuerySummary,
    multiChangeQuerySummary,
    setMultiChangeQuerySummary,
  } = useContext(testQuerySummaryContext);

  const { configEntries, configFlag, setConfigFlag } = useContext(
    defaultCustomTestDataContext
  );

  useEffect(() => {
    if (configFlag) {
      setChangeSummary(
        mapConfigChangesInChangeSummary(changeSummary, configEntries)
      );
      setChangeQuerySummary(
        mapConfigChangesInChangeSummary(changeQuerySummary, configEntries)
      );
      setMultiChangeSummary(
        mapConfigChangesInChangeMultiSummary(multiChangeSummary, configEntries)
      );
      setMultiChangeQuerySummary(
        mapConfigChangesInChangeMultiSummary(
          multiChangeQuerySummary,
          configEntries
        )
      );
      setConfigFlag(false);
    }
  }, [configEntries]);

  return null;
};
export default ConfigUpdate;
