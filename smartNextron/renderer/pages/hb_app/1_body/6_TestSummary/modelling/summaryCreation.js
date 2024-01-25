export function getConfigEntriesValue(configEntries, type) {
  var value = "";
  configEntries.forEach((k, v) => {
    if (k[0] == type) {
      value = k[1];
    }
  });
  if (type == "null") return null;
  if (type == "optional") return "";
  return value;
}

export function mapConfigChangesInChangeSummary(changeSummary, configEntries) {
  let changes = changeSummary?.map((summary) => {
    let type = summary.newFieldType.toLowerCase();
    if (type === "optional" || type === "null" || type.includes("c-"))
      return summary;
    return {
      ...summary,
      newFieldValue: getConfigEntriesValue(
        configEntries,
        summary.newFieldType.toLowerCase()
      ).toString(),
    };
  });

  return changes;
}

export function mapConfigChangesInChangeMultiSummary(
  changeSummary,
  configEntries
) {
  let changes = changeSummary?.map((summary) => {
    return {
      ...summary,
      tests: summary.tests?.map((testcase) => {
        let type = testcase.newFieldType.toLowerCase();
        if (type === "optional" || type === "null" || type.includes("c-"))
          return testcase;
        return {
          ...testcase,
          newFieldValue: getConfigEntriesValue(
            configEntries,
            testcase.newFieldType.toLowerCase()
          ).toString(),
        };
      }),
    };
  });

  return changes;
}

function createChangeSummaryObject(summary, newFieldType, newFieldValue) {
  let object = {};
  object["fieldName"] = summary.fieldName;
  object["oldFieldType"] = summary.fieldType;
  object["oldFieldValue"] = summary.oldFieldValue;
  object["newFieldType"] = newFieldType;
  object["newFieldValue"] = newFieldValue;
  object["status"] = 400;
  object["response"] = "";
  return object;
}

export function compareAndRetainResponseInSummary(oldConfig, newConfig) {
  let configuration = newConfig.map((newconfig) => {
    let status = "";
    let response = "";
    let flag = false;

    oldConfig.map((oldconfig) => {
      if (!flag) {
        const keys1 = Object.keys(newconfig);
        const keys2 = Object.keys(oldconfig);

        const allKeys = new Set([...keys1, ...keys2]);

        let compare_flag = true;

        allKeys.forEach((key) => {
          if (key !== "status" && key !== "response") {
            const value1 = newconfig[key];
            const value2 = oldconfig[key];

            if (value1 === value2) {
            } else {
              compare_flag = false;
            }
          }
        });

        if (compare_flag) {
          status = oldconfig.status;
          response = oldconfig.response;
          flag = true;
        }
      }
    });

    if (flag)
      return {
        ...newconfig,
        status: status,
        response: response,
      };
    else return { ...newconfig };
  });
  return configuration;
}

export function compareAndRetainResponseInMultiSummary(oldConfig, newConfig) {
  let configuration = newConfig.map((newconfig) => {
    let status = "";
    let response = "";
    let flag = false;

    oldConfig.map((oldconfig) => {
      if (
        !flag &&
        JSON.stringify(newconfig.tests) === JSON.stringify(oldconfig.tests)
      ) {
        flag = true;
        status = oldconfig.status;
        response = oldconfig.response;
      }
    });

    if (flag)
      return {
        ...newconfig,
        status: status,
        response: response,
      };
    else return { ...newconfig };
  });
  return configuration;
}

export function mapChangeSummary(testConfig, positiveData, configEntries) {
  let changeSum = [];
  testConfig?.map((path) => {
    positiveData.map((summary) => {
      if (summary.fieldName === path.name) {
        path.dataType.map((option) => {
          if (option.selected === true) {
            let value = getConfigEntriesValue(configEntries, option.value);
            value === null ? null : value;

            let object = createChangeSummaryObject(
              summary,
              option.label,
              value
            );

            changeSum.push(object);
          }
        });
        path.custom.map((option) => {
          if (option.selected === true) {
            if (option.label === "Custom" && option.value.length > 0) {
              for (let i = 0; i < option.value.length; i++) {
                let value = option.value[i];
                value === null ? null : value;

                let object = createChangeSummaryObject(
                  summary,
                  "C-" + typeof option.value[i],
                  value
                );

                changeSum.push(object);
              }
            } else {
              let value = option.value;
              value === null ? null : value;

              let object = createChangeSummaryObject(
                summary,
                "C-" + option.label,
                value
              );

              changeSum.push(object);
            }
          }
        });
      }
    });
  });

  return changeSum;
}

function generateCombinations(
  combinations,
  keys,
  data,
  currentCombination = {}
) {
  if (keys.length === 0) {
    // Base case: all keys processed, add the combination to the list
    combinations.push(Object.values(currentCombination));
    return;
  }

  const currentKey = keys[0];
  const remainingKeys = keys.slice(1);

  data[currentKey].forEach((value) => {
    const updatedCombination = { ...currentCombination, [currentKey]: value };
    generateCombinations(combinations, remainingKeys, data, updatedCombination);
  });
}

export function mapChangeMultiSummary(
  multiHeader,
  expectionHeader,
  testConfig,
  positiveData,
  configEntries
) {
  let counter = 0;
  let multiChanges = [];
  let combinations = [];

  multiHeader.forEach((header) => {
    if (header == expectionHeader) {
      return;
    }

    let summary = [];
    let customSummary = {};
    let customFlag = 0;

    testConfig?.forEach((path) => {
      positiveData.map((envData) => {
        if (envData.fieldName === path.name) {
          path.options.forEach((option, index) => {
            if (index == counter) {
              option.forEach((testcase) => {
                if (
                  testcase.selected &&
                  testcase.label !== "Custom" &&
                  testcase.label !== "Select..."
                ) {
                  let object = {};
                  object["fieldName"] = path.name;
                  object["oldFieldType"] = envData.fieldType;
                  object["oldFieldValue"] = envData.oldFieldValue;
                  object["newFieldType"] = testcase.label;
                  let value = getConfigEntriesValue(
                    configEntries,
                    testcase.value
                  );
                  object["newFieldValue"] = value === null ? null : value;

                  summary.push(object);
                } else if (testcase.selected && testcase.label === "Custom")
                  customFlag = 1;
              });
            }
          });
          combinations = [];
          let changesum = [];

          if (customFlag == 1)
            path.config.forEach((option, index) => {
              if (index == counter) {
                option.forEach((testcase) => {
                  if (testcase.selected)
                    if (
                      testcase.label === "Custom" &&
                      testcase.value.length > 0
                    ) {
                      for (let i = 0; i < testcase.value.length; i++) {
                        let object = {};
                        object["fieldName"] = path.name;
                        object["oldFieldType"] = envData.fieldType;
                        object["oldFieldValue"] = envData.oldFieldValue;
                        object["newFieldType"] =
                          "C-" + typeof testcase.value[i];
                        let value = testcase.value[i];
                        object["newFieldValue"] = value === null ? null : value;
                        customFlag = 2;
                        changesum.push(object);
                      }
                    } else {
                      let object = {};
                      object["fieldName"] = path.name;
                      object["oldFieldType"] = envData.fieldType;
                      object["oldFieldValue"] = envData.oldFieldValue;
                      object["newFieldType"] = "C-" + testcase.label;
                      object["newFieldValue"] = testcase.value;
                      customFlag = 2;
                      changesum.push(object);
                    }
                });
              }
            });

          if (changesum.length > 0) customSummary[path.name] = changesum;
        }
      });
    });

    generateCombinations(
      combinations,
      Object.keys(customSummary),
      customSummary
    );

    if (customFlag == 2 && combinations.length > 0) {
      for (let i = 0; i < combinations.length; i++) {
        let array = [];
        if (summary.length > 0)
          for (let i = 0; i < summary.length; i++) {
            array.push(summary[i]);
          }
        combinations[i].map((item) => array.push(item));
        let object = {};
        object["tests"] = array;
        object["status"] = 400;
        object["response"] = "";
        multiChanges.push(object);
      }
    } else if (summary.length > 0) {
      let object = {};
      object["tests"] = summary;
      object["status"] = 400;
      object["response"] = "";
      multiChanges.push(object);
    }
    counter++;
  });

  return multiChanges;
}

export default function defaultExport() {}
