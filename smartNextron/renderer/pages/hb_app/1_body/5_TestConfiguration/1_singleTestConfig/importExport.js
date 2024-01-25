import React, { useEffect, useState, useContext } from "react";
import Alert from "../../../../hb_components/alert";
import Import from "../../../../hb_components/import";
import Export from "../../../../hb_components/export";
import { testDataConfigContext } from "../../0_Context/6_TestDataConfig";
import { importExportTestDataContext } from "../../0_Context/8_ImportExportTestData";

const FileWorks = () => {
  const { singleTestConfig } = useContext(testDataConfigContext);
  const { setImportedTestConfig, setImportFlag } = useContext(
    importExportTestDataContext
  );

  const [data, setData] = useState([]);
  const [importedFlag, setImportedFlag] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileExport = () => {
    const result = {};
    singleTestConfig.forEach((path) =>
      path.options.forEach((option) => {
        if (option.selected) {
          result[path.id] = result[path.id] || [];
          if (option.label == "Custom") {
            let value = [];
            if (option.value.length > 0) value.push(option.value);
            if (option.unique.length > 0) value.push(option.unique);
            if (option.date.length > 0) value.push(option.date);
            result[path.id].push(value);
          } else {
            result[path.id].push(option.value);
          }
        }
      })
    );
    return result;
  };

  const handleFileImport = (data) => {
    let dataObjects = [];

    data = JSON.parse(data);

    for (const key in data) {
      const object = Object.assign(
        {},
        {
          id: "",
          name: "",
          selected: false,
          options: [],
        }
      );
      object["id"] = key;
      object["name"] = key;
      // add options to the new array
      object.options.push({
        value: "unique",
        label: "Unique",
        selected: false,
      });
      object.options.push({
        value: "string",
        label: "String",
        selected: false,
      });
      object.options.push({
        value: "integer",
        label: "Integer",
        selected: false,
      });
      object.options.push({
        value: "float",
        label: "Float",
        selected: false,
      });
      object.options.push({
        value: "null",
        label: "Null",
        selected: false,
      });
      object.options.push({
        value: "",
        label: "Optional",
        selected: false,
      });
      object.options.push({
        value: [],
        unique: "",
        date: "",
        email: "",
        boundary: {
          default: "",
          min: "",
          max: "",
          pattern: "",
        },
        label: "Custom",
        selected: false,
      });

      for (const value of data[key]) {
        if (typeof value === "string") {
          if (value == "string") {
            object.options.forEach((opt) => {
              if (opt.label == "String") {
                opt.selected = true;
              }
            });
          } else if (value == "float") {
            object.options.forEach((opt) => {
              if (opt.label == "Float") {
                opt.selected = true;
              }
            });
          } else if (value == "integer") {
            object.options.forEach((opt) => {
              if (opt.label == "Integer") {
                opt.selected = true;
              }
            });
          } else if (value == "null") {
            object.options.forEach((opt) => {
              if (opt.label == "Null") {
                opt.selected = true;
              }
            });
          } else if (value == "") {
            object.options.forEach((opt) => {
              if (opt.label == "Optional") {
                opt.selected = true;
              }
            });
          } else if (value == "unique") {
            object.options.forEach((opt) => {
              if (opt.label == "Unique") {
                opt.selected = true;
              }
            });
          }
        } else {
          object.options.forEach((opt) => {
            if (opt.label == "Custom") {
              opt.selected = true;
              const regex = /[\W_]/g;
              for (const segments of value) {
                if (typeof segments === "string") {
                  if (regex.test(segments)) {
                    opt.date = segments;
                  } else {
                    opt.unique = segments;
                  }
                } else {
                  opt.value = segments;
                }
              }
            }
          });
        }
      }

      dataObjects.push(object);
    }
    return dataObjects;
  };

  useEffect(() => {
    if (importedFlag) {
      try {
        setImportedTestConfig(handleFileImport(data));
        setError(false);
        setImportFlag(true);
      } catch (err) {
        setError(true);
      }
    }
    setImportedFlag(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="flex">
      <Alert
        outputFlag={error}
        setOutputFlag={setError}
        successFlag={success}
        setSuccessFlag={setSuccess}
        message="The imported testConfig is not good"
        className="mr-[10px]"
      />

      <Import
        size="small"
        type="primary_inverse"
        className=" mr-[6px] mt-[6px] w-[22px] h-[22px] cursor-pointer"
        setData={setData}
        onClick={() => setImportedFlag(true)}
      />

      <Export
        size="small"
        type="primary_inverse"
        className="mr-[6px] mt-[4px] w-[25px] h-[25px]"
        onClick={handleFileExport}
        stringify={true}
        fileName="testdata.json"
      />
    </div>
  );
};

export default FileWorks;
