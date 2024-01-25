import React, { useEffect, useState, useContext, useRef } from "react";

import { options } from "../../data/multi_options_schema";

import Header from "smart/pages/hb_components/header";
import Button from "smart/pages/hb_components/button";
import Close from "smart/pages/hb_components/close_button";
import Dropdown from "smart/pages/hb_components/dropdown_single";

import { jsonBodyContext } from "../../0_Context/5_JsonBody";
import { testDataConfigContext } from "../../0_Context/6_TestDataConfig";
import Custom from "./custom";
import { customOptionsConfig } from "../../data/options_schema";
import MultiStatusCreation from "../../6_TestSummary/modelling/multi_summary_creation";
import Result from "../../7_TestResult/result";
import { exportImportContext } from "../../0_Context/0_ExportImport";

const MultiTestData = () => {
  const { parsedPositiveData, parsedMultiFlag, setParsedMultiFlag } =
    useContext(jsonBodyContext);

  const {
    multiJsonPaths,
    setMultiJsonPaths,
    multiTestConfig,
    setMultiTestconfig,
    multiHeaders,
    setMultiHeaders,
  } = useContext(testDataConfigContext);

  const { globalImportMultiFlag, setGlobalImportMultiFlag } =
    useContext(exportImportContext);

  const [render, setRender] = useState(true);

  useEffect(() => {
    if (parsedMultiFlag && !globalImportMultiFlag) {
      setMultiTestconfig(parsedPositiveData.multiTestData);
      setMultiJsonPaths(parsedPositiveData.jsonPaths);
      setParsedMultiFlag(false);
    }
    if (parsedMultiFlag && globalImportMultiFlag) {
      setMultiJsonPaths(parsedPositiveData.jsonPaths);
      setGlobalImportMultiFlag(false);
      setParsedMultiFlag(false);
    }
  }, [parsedMultiFlag, globalImportMultiFlag]);

  // add a new empty column
  const addColumn = () => {
    setMultiHeaders((headers) => [...headers, `TC ${headers.length}`]);

    const updatedConfig = multiTestConfig.map((path) => {
      return Object.assign({}, path, {
        options: [...path.options, options],
        config: [...path.config, customOptionsConfig],
      });
    });

    setMultiTestconfig(updatedConfig);
  };

  // remove a column by header
  const removeColumn = (header, colIndex) => {
    setMultiHeaders(
      (headers) =>
        headers
          .filter((h) => h !== header) // remove the specified header
          .map((header, index) =>
            header.includes("JSON Paths") ? "JSON Paths" : `TC ${index}`
          ) // update the remaining headers
    );

    const updatedConfig = multiTestConfig.map((path) => {
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

    setMultiTestconfig(updatedConfig);
    setRender(false);
  };

  useEffect(() => {
    if (!render)
      setInterval(() => {
        setRender(true);
      }, 20);
  }, [render]);

  const setValue = (selected, changedValues) => {
    const updatedConfig = multiTestConfig.map((path, rowIndex) => {
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

    setMultiTestconfig(updatedConfig);
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
          <div id="myContainer" className="flex flex-col overflow-auto">
            <table id="myTable" className="table-fixed border-collapse">
              <thead>
                <tr>
                  {multiHeaders?.map((header, index) => (
                    <th
                      key={index}
                      className={`${
                        header == "JSON Paths"
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
                        {header !== "JSON Paths" && ( // allow removing columns except for the first column
                          <Close onClick={() => removeColumn(header, index)} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {multiJsonPaths?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {multiHeaders?.map((header, colIndex) =>
                      header == "JSON Paths" ? (
                        <td
                          key={colIndex}
                          className="sticky left-0 z-10 bg-sky-500 text-white 
                      border border-gray-500 p-2 "
                        >
                          <p className="text-sm">{row}</p>
                        </td>
                      ) : (
                        <td
                          key={`${rowIndex}-${colIndex}`}
                          className="border border-gray-500 p-2 "
                        >
                          {multiTestConfig?.map((path) => {
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
      <MultiStatusCreation />
      <Result />
    </>
  ) : (
    <></>
  );
};

export default MultiTestData;
