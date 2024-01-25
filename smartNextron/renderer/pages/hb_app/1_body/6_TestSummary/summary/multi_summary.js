import React, { useEffect, useState, useContext } from "react";
import { testDataConfigContext } from "../../0_Context/6_TestDataConfig";
import { testSummaryContext } from "../../0_Context/9_TestSummary";
import ResponseContent from "./responseContent";

const MultiStatus = () => {
  const { multiChangeSummary, setMultiChangeSummary } =
    useContext(testSummaryContext);

  const { multiTestConfig } = useContext(testDataConfigContext);

  function compareArrays(array1, array2) {
    if (array1.length !== array2.length) {
      return false; // Arrays have different lengths
    }

    const set1 = new Set(array1.map((obj) => JSON.stringify(obj)));
    const set2 = new Set(array2.map((obj) => JSON.stringify(obj)));

    // Check if the sets are equal
    if (set1.size !== set2.size) {
      return false; // Sets have different sizes
    }

    // Iterate over each JSON object in array1 and check if it exists in array2
    for (let obj of set1) {
      if (!set2.has(obj)) {
        return false; // JSON object in array1 doesn't exist in array2
      }
    }

    return true; // Arrays are equal
  }

  const handleStatusChange = (e, summary) => {
    let updatedChangeSummary = multiChangeSummary.map((obj) => {
      if (compareArrays(obj.tests, summary.tests)) obj.status = e.target.value;
      return obj;
    });
    setMultiChangeSummary(updatedChangeSummary);
  };

  const handleResponseChange = (summary, value) => {
    let updatedChangeSummary = multiChangeSummary.map((obj) => {
      if (compareArrays(obj.tests, summary.tests)) obj.response = value;
      return obj;
    });
    setMultiChangeSummary(updatedChangeSummary);
  };

  const defaultFormatComponent = (value) => {
    return <p className="pr-2 !text-left text-sm break-all">{value}</p>;
  };

  return (
    <>
      {multiTestConfig ? (
        <ul className="w-[100%]">
          <li key="summary-header" className="py-2 border-2 border-gray">
            <div className="ml-[20px] grid grid-cols-7">
              {defaultFormatComponent(`TC - ${multiChangeSummary.length}`)}
              {defaultFormatComponent("PathName")}
              {defaultFormatComponent("oldFieldType")}
              {defaultFormatComponent("oldFieldValue")}
              {defaultFormatComponent("newFieldType")}
              {defaultFormatComponent("newFieldValue")}
              {defaultFormatComponent("Response code")}
            </div>
          </li>

          {multiChangeSummary &&
            multiChangeSummary.map((summary, index) => {
              return (
                <li
                  key={`${summary}-${index}`}
                  className="py-1 border-b border-gray "
                >
                  <div className="ml-[20px] grid grid-cols-7">
                    {defaultFormatComponent(index + 1)}
                    <div className="flex flex-col">
                      {Object.entries(summary.tests).map((testcase, tcIdx) => {
                        return (
                          <div key={`${testcase[1].fieldName}-${tcIdx}`}>
                            {defaultFormatComponent(testcase[1].fieldName)}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col">
                      {Object.entries(summary.tests).map((testcase, tcIdx) => {
                        return (
                          <div key={`${testcase[1].fieldName}-${tcIdx}`}>
                            {defaultFormatComponent(testcase[1].oldFieldType)}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col">
                      {Object.entries(summary.tests).map((testcase, tcIdx) => {
                        return (
                          <div key={`${testcase[1].fieldName}-${tcIdx}`}>
                            {defaultFormatComponent(testcase[1].oldFieldValue)}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col">
                      {Object.entries(summary.tests).map((testcase, tcIdx) => {
                        return (
                          <div key={`${testcase[1].fieldName}-${tcIdx}`}>
                            {defaultFormatComponent(testcase[1].newFieldType)}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col">
                      {Object.entries(summary.tests).map((testcase, tcIdx) => {
                        return (
                          <div key={`${testcase[1].fieldName}-${tcIdx}`}>
                            {" "}
                            {defaultFormatComponent(
                              testcase[1].newFieldValue === null
                                ? "null"
                                : testcase[1].newFieldValue
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={summary.status}
                        onChange={(e) => {
                          handleStatusChange(e, summary);
                        }}
                        className="pr-2 text-center text-sm w-[60%] border-b-2 border-sky-600"
                      />
                      <ResponseContent
                        value={summary.response}
                        onResponseChange={(value) =>
                          handleResponseChange(summary, value)
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
export default MultiStatus;
