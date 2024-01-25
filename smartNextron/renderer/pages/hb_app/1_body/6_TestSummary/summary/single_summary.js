import React, { useEffect, useState, useContext } from "react";
import { jsonBodyContext } from "../../0_Context/5_JsonBody";
import { testDataConfigContext } from "../../0_Context/6_TestDataConfig";
import { testSummaryContext } from "../../0_Context/9_TestSummary";
import { defaultCustomTestDataContext } from "../../0_Context/7_DefaultCustomTestDataConfig";
import ResponseContent from "./responseContent";

const SingleStatus = () => {
  const { changeSummary, setChangeSummary } = useContext(testSummaryContext);

  const { singleTestConfig } = useContext(testDataConfigContext);

  const defaultFormatComponent = (value) => {
    return <p className="pr-2 !text-left text-sm break-all">{value}</p>;
  };

  function compareObjects(object1, object2) {
    let isEqual = true;
    for (const key in object1) {
      if (object1.hasOwnProperty(key) && object2.hasOwnProperty(key)) {
        if (object1[key] !== object2[key]) {
          isEqual = false;
          break;
        }
      } else {
        isEqual = false;
        break;
      }
    }
    return isEqual;
  }

  const handleStatusChange = (e, summary) => {
    let updatedChangeSummary = changeSummary.map((obj) => {
      if (compareObjects(obj, summary)) obj.status = e.target.value;
      return obj;
    });
    setChangeSummary(updatedChangeSummary);
  };

  const handleResponseChange = (summary, value) => {
    let updatedChangeSummary = changeSummary.map((obj) => {
      if (compareObjects(obj, summary)) obj.response = value;
      return obj;
    });
    setChangeSummary(updatedChangeSummary);
  };

  return (
    <>
      {singleTestConfig ? (
        <ul className="w-[100%]">
          <li key="summary-header" className="py-2 border-2 border-gray">
            <div className="ml-[20px] grid grid-cols-7">
              {defaultFormatComponent(`TC - ${changeSummary.length}`)}
              {defaultFormatComponent("PathName")}
              {defaultFormatComponent("oldFieldType")}
              {defaultFormatComponent("oldFieldValue")}
              {defaultFormatComponent("newFieldType")}
              {defaultFormatComponent("newFieldValue")}
              {defaultFormatComponent("Response code")}
            </div>
          </li>
          {changeSummary &&
            Object.entries(changeSummary).map((summary, index) => {
              return (
                <li key={summary} className="py-1 border-b border-gray ">
                  <div className="ml-[20px] grid grid-cols-7">
                    {defaultFormatComponent(index + 1)}
                    {defaultFormatComponent(summary[1].fieldName)}
                    {defaultFormatComponent(summary[1].oldFieldType)}
                    {defaultFormatComponent(summary[1].oldFieldValue)}
                    {defaultFormatComponent(summary[1].newFieldType)}
                    {defaultFormatComponent(
                      summary[1].newFieldValue === null
                        ? "null"
                        : summary[1].newFieldValue
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={summary[1].status}
                        onChange={(e) => {
                          handleStatusChange(e, summary[1]);
                        }}
                        className="pr-2 text-center text-sm w-[60%] border-b-2 border-sky-600"
                      />
                      <ResponseContent
                        value={summary[1].response}
                        onResponseChange={(value) =>
                          handleResponseChange(summary[1], value)
                        }
                      />
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};
export default SingleStatus;
