import React, { useState, useContext, useEffect } from "react";
import SingleStatus from "./summary/single_summary";
import MultiStatus from "./summary/multi_summary";
import { testSummaryContext } from "../0_Context/9_TestSummary";
import SingleQueryStatus from "./summary/single_query_summary";
import Toggle4 from "../../../hb_components/toggle4";
import { testQuerySummaryContext } from "../0_Context/9_TestQuerySummary";
import MultiQueryStatus from "./summary/multi_query_summary";
import ResponseFixer from "./responseFixer";

const Status = () => {
  const [flag, setFlag] = useState(1);

  const { changeSummary, multiChangeSummary } = useContext(testSummaryContext);
  const { changeQuerySummary, multiChangeQuerySummary } = useContext(
    testQuerySummaryContext
  );

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(
      changeQuerySummary?.length +
        multiChangeQuerySummary?.length +
        changeSummary?.length +
        multiChangeSummary?.length
    );
  }, [
    changeQuerySummary,
    multiChangeQuerySummary,
    changeSummary,
    multiChangeSummary,
  ]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <Toggle4
          className="w-[45%]"
          flag={flag}
          setFlag={setFlag}
          first="Query-Single"
          second="Query-Multi"
          third="Body-Single"
          fourth="Body-Multi"
        />
        <p className="mr-[300px]">Total TestCases Count - {count}</p>
        <ResponseFixer />
      </div>
      {flag == 0 ? <SingleQueryStatus /> : <></>}
      {flag == 1 ? <MultiQueryStatus /> : <></>}
      {flag == 2 ? <SingleStatus /> : <></>}
      {flag == 3 ? <MultiStatus /> : <></>}
    </div>
  );
};
export default Status;
