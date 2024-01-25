import React, { useEffect, useState, useContext } from "react";
import ResponseContent from "./summary/responseContent";
import TextArea from "../../../hb_components/textarea";
import Button from "../../../hb_components/button";
import { testQuerySummaryContext } from "../0_Context/9_TestQuerySummary";
import { testSummaryContext } from "../0_Context/9_TestSummary";

const SummaryTable = ({ apiResponse }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const {
    changeQuerySummary,
    setChangeQuerySummary,
    multiChangeQuerySummary,
    setMultiChangeQuerySummary,
  } = useContext(testQuerySummaryContext);
  const {
    changeSummary,
    setChangeSummary,
    multiChangeSummary,
    setMultiChangeSummary,
  } = useContext(testSummaryContext);

  const toggleRow = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the value
    }));
  };

  const defaultFormatComponent = (value) => {
    return <p className="pr-2 !text-left text-sm break-all">{value}</p>;
  };

  const keysToOmit = ["status", "response"];

  function compareObjects(object1, object2) {
    let isEqual = true;
    for (const key in object1) {
      if (object1.hasOwnProperty(key) && object2.hasOwnProperty(key)) {
        if (keysToOmit.includes(key)) {
          continue;
        }
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

  const handleBodyChange = (summary, response) => {
    let updatedChangeQuerySummary = changeQuerySummary?.map((obj) => {
      if (compareObjects(obj, summary)) obj.response = response;
      return obj;
    });
    setChangeQuerySummary(updatedChangeQuerySummary);
    let updatedChangeSummary = changeSummary?.map((obj) => {
      if (compareObjects(obj, summary)) {
        obj.response = response;
        console.log(response);
      }
      return obj;
    });
    setChangeSummary(updatedChangeSummary);
  };

  const handleStatusChange = (summary, status) => {
    let updatedChangeQuerySummary = changeQuerySummary?.map((obj) => {
      if (compareObjects(obj, summary)) obj.status = status;
      return obj;
    });
    setChangeQuerySummary(updatedChangeQuerySummary);
    let updatedChangeSummary = changeSummary?.map((obj) => {
      if (compareObjects(obj, summary)) obj.status = status;
      return obj;
    });
    setChangeSummary(updatedChangeSummary);
  };

  function compareArrays(array1, array2) {
    if (array1.length !== array2.length) {
      return false; // Arrays have different lengths
    }

    // Helper function to remove specific keys from an object
    function removeKeys(obj, keys) {
      const newObj = { ...obj };
      keys.forEach((key) => delete newObj[key]);
      return newObj;
    }

    const cleanedArray1 = array1.map((obj) =>
      removeKeys(obj, ["status", "response"])
    );
    const cleanedArray2 = array2.map((obj) =>
      removeKeys(obj, ["status", "response"])
    );

    const set1 = new Set(cleanedArray1.map((obj) => JSON.stringify(obj)));
    const set2 = new Set(cleanedArray2.map((obj) => JSON.stringify(obj)));

    // Check if the sets are equal
    if (set1.size !== set2.size) {
      return false; // Sets have different sizes
    }

    // Iterate over each JSON object in cleanedArray1 and check if it exists in cleanedArray2
    for (let obj of set1) {
      if (!set2.has(obj)) {
        return false; // JSON object in cleanedArray1 doesn't exist in cleanedArray2
      }
    }

    return true; // Arrays are equal after excluding "status" and "response" keys
  }

  const handleMultiStatusChange = (summary, status) => {
    let updatedQueryChangeSummary = multiChangeQuerySummary.map((obj) => {
      if (compareArrays(obj.tests, summary)) obj.status = status;
      return obj;
    });
    setMultiChangeQuerySummary(updatedQueryChangeSummary);
    let updatedChangeSummary = multiChangeSummary.map((obj) => {
      if (compareArrays(obj.tests, summary)) obj.status = status;
      return obj;
    });
    setMultiChangeSummary(updatedChangeSummary);
  };

  const handleMultiBodyChange = (summary, response) => {
    let updatedQueryChangeSummary = multiChangeQuerySummary.map((obj) => {
      if (compareArrays(obj.tests, summary)) obj.response = response;
      return obj;
    });
    setMultiChangeQuerySummary(updatedQueryChangeSummary);
    let updatedChangeSummary = multiChangeSummary.map((obj) => {
      if (compareArrays(obj.tests, summary)) obj.response = response;
      return obj;
    });
    setMultiChangeSummary(updatedChangeSummary);
  };

  const setResponseBody = (item) => {
    console.log("response clicked");
    if (item.changeSummary.length === 1) {
      handleBodyChange(item.changeSummary[0], item.testResult["body"]);
    } else {
      handleMultiBodyChange(item.changeSummary, item.testResult["body"]);
    }
  };

  const setResponseStatus = (item) => {
    console.log("status clicked");
    if (item.changeSummary.length === 1) {
      handleStatusChange(item.changeSummary[0], item.testResult["Status Code"]);
    } else {
      handleMultiStatusChange(
        item.changeSummary,
        item.testResult["Status Code"]
      );
    }
  };

  return (
    <div>
      <ul className="w-[100%]">
        <li key="summary-header" className="py-2 border-2 border-gray">
          <div className="ml-[20px] grid grid-cols-7">
            {defaultFormatComponent(`TC No`)}
            {defaultFormatComponent("PathName")}
            {defaultFormatComponent("oldFieldType")}
            {defaultFormatComponent("oldFieldValue")}
            {defaultFormatComponent("newFieldType")}
            {defaultFormatComponent("newFieldValue")}
            {defaultFormatComponent("Response code")}
          </div>
        </li>
        {apiResponse.map((item, index) => (
          <div key={index}>
            <li key={item.changeSummary} className="py-1 border-b border-gray">
              <div className="ml-[20px] grid grid-cols-7">
                {defaultFormatComponent(index + 1)}
                <div className="flex flex-col">
                  {Object.entries(item?.changeSummary).map(
                    (testcase, tcIdx) => {
                      return (
                        <div key={`${testcase[1].fieldName}-${tcIdx}`}>
                          {defaultFormatComponent(testcase[1].fieldName)}
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="flex flex-col">
                  {Object.entries(item?.changeSummary).map(
                    (testcase, tcIdx) => {
                      return (
                        <div key={`${testcase[1].fieldName}-${tcIdx}`}>
                          {defaultFormatComponent(testcase[1].oldFieldType)}
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="flex flex-col">
                  {Object.entries(item?.changeSummary).map(
                    (testcase, tcIdx) => {
                      return (
                        <div key={`${testcase[1].fieldName}-${tcIdx}`}>
                          {defaultFormatComponent(testcase[1].oldFieldValue)}
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="flex flex-col">
                  {Object.entries(item?.changeSummary).map(
                    (testcase, tcIdx) => {
                      return (
                        <div key={`${testcase[1].fieldName}-${tcIdx}`}>
                          {defaultFormatComponent(testcase[1].newFieldType)}
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="flex flex-col">
                  {Object.entries(item?.changeSummary).map(
                    (testcase, tcIdx) => {
                      return (
                        <div key={`${testcase[1].fieldName}-${tcIdx}`}>
                          {defaultFormatComponent(
                            testcase[1].newFieldValue === null
                              ? "null"
                              : testcase[1].newFieldValue
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleRow(index)}>
                    {expandedRows[index] ? "-" : "+"}
                  </button>
                </div>
              </div>
            </li>
            {expandedRows[index] && (
              <div>
                <li className="grid grid-cols-8">
                  <div className="flex border-2 border-gray-500">
                    <p className="mr-[5px]">Status</p>
                    <Button
                      label="Yes"
                      onClick={() => setResponseStatus(item)}
                    />
                  </div>
                  <div className="col-span-4 flex gap-2 border-2 border-gray-500">
                    <p>Response Body</p>
                    <Button label="Yes" onClick={() => setResponseBody(item)} />
                  </div>
                  <div className="col-span-3 flex gap-2 border-2 border-gray-500">
                    <p>Response Header</p>
                  </div>
                </li>
                <li className="grid grid-cols-8">
                  <input
                    type="text"
                    value={item.testResult["Status Code"]}
                    onChange={(e) => {
                      handleStatusChange(e, item?.changeSummary);
                    }}
                    className="pr-2 text-center text-sm border-b-2 border-sky-600"
                  />
                  <TextArea
                    className="col-span-4 max-h-[200px] overflow-y-auto"
                    value={JSON.stringify(item?.testResult["body"], null, 2)}
                    readOnly={true}
                  />
                  <TextArea
                    className="col-span-3 w-[500px] max-h-[200px] overflow-y-auto"
                    value={JSON.stringify(item?.testResult["headers"], null, 2)}
                    readOnly={true}
                  />
                </li>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};
export default SummaryTable;
