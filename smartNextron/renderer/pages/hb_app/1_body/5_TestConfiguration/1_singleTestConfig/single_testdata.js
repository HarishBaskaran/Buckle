import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { dataTypeOptions } from "../../data/options_schema";
import { compareArrays } from "../../utils/compare_arrays";
import { jsonBodyContext } from "../../0_Context/5_JsonBody";
import { testDataConfigContext } from "../../0_Context/6_TestDataConfig";

import Custom from "./custom";
import CheckBox from "../../../../hb_components/checkbox";
import SingleSummaryCreate from "../../6_TestSummary/modelling/single_summary_creation";
import Result from "../../7_TestResult/result";
import { exportImportContext } from "../../0_Context/0_ExportImport";

const SingleTestData = () => {
  const { parsedPositiveData, parsedSingleFlag, setParsedSingleFlag } =
    useContext(jsonBodyContext);

  const { singleTestConfig, setSingleTestConfig } = useContext(
    testDataConfigContext
  );

  const { globalImportSingleFlag, setGlobalImportSingleFlag } =
    useContext(exportImportContext);

  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedBulkOptions, setSelectedBulkOptions] = useState([]);

  const handleBulkOptions = (selected) => {
    let compare = compareArrays(selectedBulkOptions, selected);

    let tempList = singleTestConfig.map((item) => {
      if (item.selected) {
        const updatedOptions = item.dataType.map((obj) => ({
          ...obj,
          selected:
            compare.deleted.length >= 1
              ? compare.deleted.every(
                  (deletedItem) => obj.label !== deletedItem.label
                ) && obj.selected
              : compare.added.length === 1
              ? obj.label === compare.added[0].label || obj.selected
              : obj.selected,
        }));
        return { ...item, dataType: updatedOptions };
      }
      return item;
    });

    setSingleTestConfig(tempList);
    setSelectedBulkOptions(selected);
  };

  const handleIndividualOptions = (e, path, option) => {
    let tempList = singleTestConfig.map((item) => {
      if (item.id === path.id) {
        return {
          ...item,
          dataType: item.dataType.map((obj) => {
            if (obj.label === option.label) {
              return {
                ...obj,
                selected: e.target.checked,
              };
            }
            return obj;
          }),
        };
      }
      return item;
    });

    setSingleTestConfig(tempList);
  };

  const handleSelectAll = (e) => {
    let tempList = singleTestConfig;
    tempList.map((user) => (user.selected = e.target.checked));

    setSingleTestConfig(tempList);
    setSelectAllChecked(e.target.checked);
    setSelectedRows(singleTestConfig.filter((e) => e.selected));
  };

  const handleSelectRow = (e, item) => {
    let tempList = singleTestConfig;
    tempList.map((user) => {
      if (user.id === item.name) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = singleTestConfig.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    setSelectAllChecked(totalItems === totalCheckedItems);
    setSelectedRows(singleTestConfig.filter((e) => e.selected));
    setSingleTestConfig(tempList);
  };

  const renderOptions = (path) => {
    return path.dataType.map((option) => (
      <li key={`${path.id}-${option.label}`}>
        <div className="flex mt-[7px]">
          <CheckBox
            onChange={(e) => handleIndividualOptions(e, path, option)}
            checked={option.selected}
            className="ml-[14px]"
          />
          <p className="ml-[2px] !text-left text-sm">{option.label}</p>
        </div>
      </li>
    ));
  };

  const renderPaths = (path) => {
    return (
      <li
        key={path.name}
        className="flex justify-between !text-left rounded-md px-2 border-b border-gray"
      >
        <div className="flex justify-between items-center">
          <CheckBox
            onChange={(e) => handleSelectRow(e, path)}
            checked={path.selected}
          />

          <p className="px-2 !text-left text-sm">{path.name}</p>
        </div>
        <ul className="list-none flex flex-row">
          {renderOptions(path)}
          <li key={`custom-${path.id}`} className="mb-[5px]">
            <Custom path={path} />
          </li>
        </ul>
      </li>
    );
  };

  useEffect(() => {
    if (parsedSingleFlag && !globalImportSingleFlag) {
      setSingleTestConfig(parsedPositiveData?.testData);
      setParsedSingleFlag(false);
    }
    if (parsedSingleFlag && globalImportSingleFlag) {
      setGlobalImportSingleFlag(false);
      setParsedSingleFlag(false);
    }
  }, [parsedSingleFlag, globalImportSingleFlag]);

  return (
    <div className="min-w-[70%] max-w-[70%]">
      <div className="flex items-center justify-between mb-[20px]">
        <h1 className="text-l font-bold">Kindly input your data</h1>
      </div>
      <div className="flex justify-between mt-[10px]">
        <div className="flex flex-col">
          <p className="text-[12px]">
            {selectedRows.length} JsonPaths selected
          </p>
          <div className="flex items-center pl-[7px]">
            <CheckBox
              onChange={(e) => handleSelectAll(e)}
              checked={selectAllChecked}
              className=""
              disabled={singleTestConfig ? false : true}
            />
            <label className="pl-[5px] text-sm">Select All</label>
          </div>
        </div>
        {singleTestConfig ? (
          <Select
            id="selectbox"
            instanceId="selectbox"
            isMulti
            options={dataTypeOptions}
            onChange={handleBulkOptions}
            value={selectedBulkOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select data"
          />
        ) : (
          <></>
        )}
      </div>
      {singleTestConfig ? (
        <>
          <ul className="list-none mt-[20px]">
            {singleTestConfig.map(renderPaths)}
          </ul>
          <SingleSummaryCreate />
          <Result />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SingleTestData;
