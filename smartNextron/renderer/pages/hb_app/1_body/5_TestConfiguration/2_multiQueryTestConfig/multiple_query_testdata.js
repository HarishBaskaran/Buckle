import React, { useEffect, useState, useContext, useRef } from "react";

import { options } from "../../data/multi_options_schema";

import Header from "../../../../hb_components/header";
import Button from "../../../../hb_components/button";
import Close from "../../../../hb_components/close_button";
import Dropdown from "../../../../hb_components/dropdown_single";
import Custom from "./custom";
import { queryTestDataConfigContext } from "../../0_Context/6_QueryTestDataConfig";
import { customOptionsConfig } from "../../data/options_schema";
import MultiQueryCreation from "../../6_TestSummary/modelling/multi_query_summary_creation";
import Result from "../../7_TestResult/result";

const MultiQueryTestData = () => {
  const {
    queryParamKeys,
    queryMultiTestConfig,
    setQueryMultiTestconfig,
    queryMultiHeaders,
    setQueryMultiHeaders,
  } = useContext(queryTestDataConfigContext);

  const [render, setRender] = useState(true);

  // add a new empty column
  const addColumn = () => {
    setQueryMultiHeaders((headers) => [...headers, `TC ${headers.length}`]);

    const updatedConfig = queryMultiTestConfig.map((path) => {
      return Object.assign({}, path, {
        options: [...path.options, options],
        config: [...path.config, customOptionsConfig],
      });
    });

    setQueryMultiTestconfig(updatedConfig);
    setRender(false);
  };

  // remove a column by header
  const removeColumn = (header, colIndex) => {
    setQueryMultiHeaders(
      (headers) =>
        headers
          .filter((h) => h !== header) // remove the specified header
          .map((header, index) =>
            header.includes("Query Params") ? "Query Params" : `TC ${index}`
          ) // update the remaining headers
    );

    const updatedConfig = queryMultiTestConfig.map((path) => {
      const newOptions = [...path.options];
      newOptions.splice(colIndex - 1, 1);
      const newConfig = [...path.config];
      newConfig.splice(colIndex - 1, 1);
      return Object.assign(
        {},
        path,
        { options: newOptions },
        { config: newConfig }
      );
    });

    setQueryMultiTestconfig(updatedConfig);
    setRender(false);
  };

  useEffect(() => {
    if (!render)
      setInterval(() => {
        setRender(true);
      }, 20);
  }, [render]);

  const setValue = (selected, changedValues) => {
    const updatedConfig = queryMultiTestConfig.map((path, rowIndex) => {
      if (rowIndex === changedValues.row) {
        const updatedOptions = [
          ...path.options.slice(0, changedValues.col - 1),
          selected,
          ...path.options.slice(changedValues.col),
        ];

        return {
          ...path,
          options: updatedOptions,
        };
      }
      return path;
    });

    setQueryMultiTestconfig(updatedConfig);
    setRender(false);
  };

  const Model = () => {
    return (
      <>
        <div className="min-w-[70%] max-w-[70%]">
          <div className="flex justify-between mb-[10px]">
            <Header
              size="medium"
              label="Kindly input your data"
              className="!m-0 !pl-0"
            />
            <Button
              size="small"
              type="primary_inverse"
              className=""
              label="Add TestCase"
              onClick={() => addColumn()}
            />
          </div>
          <div
            id="myContainer"
            className="flex flex-col overflow-auto container"
          >
            <table id="myTable" className="border-collapse ">
              <thead>
                <tr>
                  {queryMultiHeaders?.map((header, index) => (
                    <th
                      key={index}
                      className={`${
                        header == "Query Params"
                          ? "sticky left-0 z-10 opacity-100 bg-sky-600 text-white font-bold "
                          : ""
                      } border border-gray-500 p-2 max-w-[250px]`}
                    >
                      <div className={`flex justify-between items-center`}>
                        <Header
                          size="small"
                          label={header}
                          className="!m-0 font-normal"
                        />
                        {header !== "Query Params" && ( // allow removing columns except for the first column
                          <Close onClick={() => removeColumn(header, index)} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryParamKeys?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {queryMultiHeaders?.map((header, colIndex) =>
                      header == "Query Params" ? (
                        <td
                          key={colIndex}
                          className="sticky left-0 z-10 bg-sky-500 text-white 
                      border border-gray-500 p-2 "
                        >
                          <p className="ml-[20px] text-sm">{row}</p>
                        </td>
                      ) : (
                        <td
                          key={`${rowIndex}-${colIndex}`}
                          className="border border-gray-500 p-2 "
                        >
                          {queryMultiTestConfig?.map((path) => {
                            if (path.name == row) {
                              return path.options.map((item, index) => {
                                if (index == colIndex - 1) {
                                  return (
                                    <div
                                      key={`${rowIndex}-${colIndex}-${path}`}
                                      className="flex"
                                    >
                                      <Dropdown
                                        options={item}
                                        changedValues={{
                                          row: rowIndex,
                                          col: colIndex,
                                        }}
                                        onChange={setValue}
                                        color={true}
                                        text="text-[12px]"
                                        width="w-[110px]"
                                        height="h-[20px]"
                                        className="mt-[3px] text-sm absolute"
                                      />
                                      {item.map((option) => {
                                        if (
                                          option.label == "Custom" &&
                                          option.selected == true
                                        ) {
                                          return (
                                            <Custom
                                              key={`${rowIndex}-${colIndex}-${path}`}
                                              path={path}
                                              index={index}
                                              type={option.label}
                                            />
                                          );
                                        }
                                      })}
                                    </div>
                                  );
                                }
                              });
                            }
                          })}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return render ? (
    <>
      <Model />
    </>
  ) : (
    <>
      <MultiQueryCreation />
      <Result />
    </>
  );
};

export default MultiQueryTestData;
