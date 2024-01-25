import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { dataTypeOptions } from "../../data/options_schema";
import { compareArrays } from "../../utils/compare_arrays";
import Custom from "./custom";
import CheckBox from "../../../../hb_components/checkbox";
import { queryTestDataConfigContext } from "../../0_Context/6_QueryTestDataConfig";
import SingleQueryCreate from "../../6_TestSummary/modelling/single_query_summary_creation";
import Result from "../../7_TestResult/result";

const SingleQueryTestData = () => {
  const { querySingleTestConfig, setQuerySingleTestConfig } = useContext(
    queryTestDataConfigContext
  );

  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedBulkOptions, setSelectedBulkOptions] = useState([]);

  // selectedBulkOptions, setSelectedBulkOptions, querySingleTestConfig, setQuerySingleTestConfig
  const handleBulkOptions = (selected) => {
    let compare = compareArrays(selectedBulkOptions, selected);

    let tempList = querySingleTestConfig.map((item) => {
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

    setQuerySingleTestConfig(tempList);
    setSelectedBulkOptions(selected);
  };

  // querySingleTestConfig, setQuerySingleTestConfig
  const handleIndividualOptions = (e, path, option) => {
    const tempList = querySingleTestConfig.map((item) =>
      item.id === path.id
        ? {
            ...item,
            dataType: item.dataType.map((obj) =>
              obj.label === option.label
                ? { ...obj, selected: e.target.checked }
                : obj
            ),
          }
        : item
    );

    setQuerySingleTestConfig(tempList);
  };

  // setSelectAllChecked, setSelectedRows, querySingleTestConfig, setQuerySingleTestConfig
  const handleSelectAll = (e) => {
    let tempList = querySingleTestConfig;
    tempList.map((user) => (user.selected = e.target.checked));

    setQuerySingleTestConfig(tempList);
    setSelectAllChecked(e.target.checked);
    setSelectedRows(querySingleTestConfig.filter((e) => e.selected));
  };

  // setSelectAllChecked, setSelectedRows, querySingleTestConfig, setQuerySingleTestConfig
  const handleSelectRow = (e, item) => {
    let tempList = querySingleTestConfig;
    tempList.map((user) => {
      if (user.id === item.name) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = querySingleTestConfig.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    setSelectAllChecked(totalItems === totalCheckedItems);
    setQuerySingleTestConfig(tempList);
    setSelectedRows(querySingleTestConfig.filter((e) => e.selected));
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

  const [render, setRender] = useState(true);

  useEffect(() => {
    setRender(false);
  }, [querySingleTestConfig]);

  useEffect(() => {
    setRender(true);
  }, [render]);

  const Model = () => {
    return (
      <div className="min-w-[70%] max-w-[70%]">
        <div className="flex items-center justify-between mb-[20px]">
          <h1 className="text-l font-bold">Kindly input your data</h1>
        </div>
        <div className="flex justify-between mt-[10px]">
          <div className="flex flex-col">
            <p className="text-[12px]">
              {selectedRows.length} QueryParams selected
            </p>
            <div className="flex items-center pl-[7px]">
              <CheckBox
                onChange={(e) => handleSelectAll(e)}
                checked={selectAllChecked}
                className=""
                disabled={querySingleTestConfig ? false : true}
              />
              <label className="pl-[5px] text-sm">Select All</label>
            </div>
          </div>
          {querySingleTestConfig ? (
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
        {querySingleTestConfig ? (
          <ul className="list-none mt-[20px]">
            {querySingleTestConfig.map(renderPaths)}
          </ul>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return render ? (
    <Model />
  ) : (
    <>
      <SingleQueryCreate />
      <Result />
    </>
  );
};

export default SingleQueryTestData;
