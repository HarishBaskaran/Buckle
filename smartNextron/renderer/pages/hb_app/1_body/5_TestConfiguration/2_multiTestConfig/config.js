import React, { useEffect, useState, useContext } from "react";

import Result from "../../7_TestResult/result";
import Button from "../../../../hb_components/button";
import { testDataConfigContext } from "../../0_Context/6_TestDataConfig";
import { multiCustomTestDataContext } from "../../0_Context/7B_MultiCustomTestDataConfig";
import Input from "../../../../hb_components/inputNoChange";
import {
  customOptionsConfig,
  dateOptions,
  dateTypeOptions,
  textTypeOptions,
} from "../../data/options_schema";
import { createCustomArray } from "../../utils/check_type";
import { faker } from "@faker-js/faker";
import {
  createDate,
  returnBoundary,
  returnConfig,
  returnDate,
  returnEmail,
  returnTimestamp,
  returnValue,
} from "../valuesUtils";

import moment from "moment/moment";
import PopupModal from "../../../../hb_components/popup";
import Delete from "../../../../hb_components/delete_button";
import CheckBox from "../../../../hb_components/checkbox";
import Dropdown from "../../../../hb_components/dropdown_single";
import FloatingFilled from "../../../../hb_components/input_floating_NoChange";
import Switch from "../../../../hb_components/switch";

const MultiConfig = () => {
  const [render, setRender] = useState(false);
  const [customRender, setcustomRender] = useState(false);

  let { modalIsOpen, setModalIsOpen, path, index } = useContext(
    multiCustomTestDataContext
  );

  let { multiTestConfig, setMultiTestconfig } = useContext(
    testDataConfigContext
  );

  const handleCustomModalClose = () => {
    handleCustomValueSave();
    setModalIsOpen(false);
  };

  const handleCustomModalSave = () => {
    handleCustomValueSave();
    setcustomRender(true);
    setRender(true);
  };

  useEffect(() => {
    if (customRender) {
      setcustomRender(false);
      setRender(false);
    }
  }, [customRender]);

  const [popupFlag, setPopupFlag] = useState(false);

  const handlePopupClick = () => {
    setPopupFlag(true);
  };

  const handlePopupClose = () => {
    setPopupFlag(false);
    handleCustomModalSave();
  };

  const handlePopupSave = () => {
    handleCustomModalSave();
  };

  const customHeader = () => {
    return (
      <div className="flex justify-between mt-[10px] w-full">
        <div className="flex ">
          <h1 className="mb-[10px] font-bold">Multi Custom Configuration</h1>

          <PopupModal
            flag={popupFlag}
            open={() => handlePopupClick()}
            close={() => handlePopupClose()}
            save={() => handlePopupSave()}
            height="h-[550px]"
            width="w-[60%]"
            header={`Custom Configuration of Path: ${path.name} - TC ${
              index + 1
            }`}
          >
            {customValue()}
          </PopupModal>
        </div>

        <Button
          size="small"
          type="primary_inverse"
          className="!py-0 !mb-5 border border-sky-600"
          label="Close"
          onClick={() => handleCustomModalClose()}
        />
      </div>
    );
  };

  const handleSelectUnique = (event, configOption) => {
    const updatedMultiTestConfig = multiTestConfig.map((multiPath) => {
      if (multiPath.name == path.name) {
        return {
          ...multiPath,
          config: multiPath.config.map((option, optionIndex) => {
            if (optionIndex == index) {
              return option.map((obj) => {
                if (configOption.label === obj.label) {
                  return {
                    ...obj,
                    unique: event.target.checked,
                  };
                }
                return { ...obj };
              });
            }
            return option;
          }),
        };
      }
      return multiPath;
    });

    configuration = customOptionsConfig.map((item) => ({ ...item }));
    setMultiTestconfig(updatedMultiTestConfig);
  };

  const handleCustomDeleteChange = (configOption) => {
    const updatedMultiTestConfig = multiTestConfig.map((multiPath) => {
      if (multiPath.name == path.name) {
        return {
          ...multiPath,
          config: multiPath.config.map((option, optionIndex) => {
            if (optionIndex == index) {
              return option.map((obj) => {
                if (configOption.label === obj.label) {
                  return {
                    ...obj,
                    value: "",
                    selected: false,
                  };
                }
                return { ...obj };
              });
            }
            return option;
          }),
        };
      }
      return multiPath;
    });

    configuration = customOptionsConfig.map((item) => ({ ...item }));
    setMultiTestconfig(updatedMultiTestConfig);
  };

  const handleCustomValueSave = () => {
    const updatedMultiTestConfig = multiTestConfig.map((multiPath) => {
      if (multiPath.name == path.name) {
        return {
          ...multiPath,
          config: multiPath.config.map((option, optionIndex) => {
            if (optionIndex == index) {
              return option.map((obj) => {
                return returnConfig(configuration, obj);
              });
            }
            return option;
          }),
        };
      }
      return multiPath;
    });

    configuration = customOptionsConfig.map((item) => ({ ...item }));
    setMultiTestconfig(updatedMultiTestConfig);
  };

  let configuration = customOptionsConfig.map((item) => ({ ...item }));

  const handleCustomValueChange = (selected, event, type) => {
    configuration = configuration.map((config) => {
      if (config.label == type && type == "Custom") {
        config.value = createCustomArray(event.target.value);
        config.selected = true;
      } else if (config.label == type && type == "UUID") {
        config.value = faker.datatype.uuid().toString();
        config.selected = true;
      } else if (config.label == event && event == "Date") {
        config.selected = true;
        config.selectors.type = createDate(selected);
        let date = returnDate(config.selectors.type);
        if (config.selectors.formatFlag) {
          date = moment(date, "DD/MM/YYYY").format(config.selectors.format);
        }
        config.value = date;
      } else if (config.label == "Date" && event == "DateFormat") {
        config.selected = true;
        selected.map((selected_date) => {
          if (selected_date.selected) {
            config.selectors.format = selected_date.label;
            config.selectors.formatFlag = true;
          }
        });
      } else if (config.label == event && event == "Email") {
        selected.map((selected_email) => {
          if (selected_email.selected) {
            config.selectors.format = selected_email.label;
            config.selectors.formatFlag = true;
          }
        });

        config.selected = true;
      } else if (config.label == "Email" && type == "EmailRange") {
        let email = returnEmail(config.selectors.format, event.target?.value);
        config.selectors.range = event.target?.value;
        config.selected = true;
        config.value = email;
      } else if (config.label == event && event == "Minimum") {
        selected.map((selected_email) => {
          if (selected_email.selected) {
            config.selectors.format = selected_email.label;
            config.selectors.formatFlag = true;
          }
        });

        config.selected = true;
      } else if (config.label == "Minimum" && type == "MinimumRange") {
        let email = returnBoundary(
          config.selectors.format,
          event.target?.value
        );
        config.selectors.range = event.target?.value;
        config.selected = true;
        config.value = email;
      } else if (config.label == event && event == "Maximum") {
        selected.map((selected_email) => {
          if (selected_email.selected) {
            config.selectors.format = selected_email.label;
            config.selectors.formatFlag = true;
          }
        });

        config.selected = true;
      } else if (config.label == "Maximum" && type == "MaximumRange") {
        let email = returnBoundary(
          config.selectors.format,
          event.target?.value
        );
        config.selectors.range = event.target?.value;
        config.selected = true;
        config.value = email;
      } else if (config.label == "Pattern" && type == "PatternPrefix") {
        config.selectors.prefix = event.target?.value;
        config.value = event.target?.value;
        config.selected = true;
        if (
          config.selectors.formatFlag &&
          config.selectors.range != "" &&
          config.selectors.timestamp == true
        )
          config.value =
            event.target?.value +
            returnBoundary(config.selectors.format, config.selectors.range) +
            returnTimestamp();
        else if (config.selectors.timestamp == true)
          config.value = event.target?.value + returnTimestamp();
      } else if (config.label == "Pattern" && event == "PatternFormat") {
        selected.map((selected_email) => {
          if (selected_email.selected) {
            config.selectors.format = selected_email.label;
            config.selectors.formatFlag = true;
          }
        });

        config.selected = true;

        if (
          config.selectors.prefix != "" &&
          config.selectors.range != "" &&
          config.selectors.timestamp == true
        )
          config.value =
            config.selectors.prefix +
            returnBoundary(config.selectors.format, config.selectors.range) +
            returnTimestamp();
      } else if (config.label == "Pattern" && type == "PatternRange") {
        let email = returnBoundary(
          config.selectors.format,
          event.target?.value
        );
        config.selectors.range = event.target?.value;
        config.selected = true;
        config.value = email;
        if (config.selectors.prefix != "" && config.selectors.timestamp == true)
          config.value = config.selectors.prefix + email + returnTimestamp();
        else if (config.selectors.prefix != "")
          config.value = config.selectors.prefix + email;
        else if (config.selectors.timestamp == true)
          config.value = config.selectors.prefix + email + returnTimestamp();
      } else if (config.label == "Pattern" && type == "PatternCheck") {
        config.selectors.timestamp = event.target?.checked;
        config.selected = true;
        if (
          config.selectors.prefix != "" &&
          config.selectors.formatFlag == true
        )
          config.value =
            config.selectors.prefix +
            returnBoundary(config.selectors.format, config.selectors.range) +
            returnTimestamp();
        else if (config.selectors.prefix != "")
          config.value = config.selectors.prefix + returnTimestamp();
      }

      return config;
    });
  };

  const customValue = () => {
    return multiTestConfig.map((multiPath) => {
      if (multiPath.name === path.name) {
        return multiPath.config.map((option, optionIndex) => {
          if (optionIndex === index) {
            return option.map((configOption) => {
              return (
                <div key={`${path.id}-${configOption.label}`}>
                  <div className="grid grid-cols-5 gap-3 mb-[5px] container items-center">
                    <div
                      key={`${path.id}-${configOption.label}-start`}
                      className="flex"
                    >
                      {/* <Delete
                        onClick={() => handleCustomDeleteChange(configOption)}
                        className="mt-[6px]"
                      />
                      <CheckBox
                        onChange={(e) => {
                          handleSelectUnique(e, configOption);
                        }}
                        checked={configOption.unique}
                        className="mt-[5px] mx-[10px]"
                      /> */}
                      <h6 className="uppercase mt-[5px] text-sm">
                        {configOption.label}
                      </h6>
                    </div>
                    <p
                      key={`${path.id}-${configOption.label}-label`}
                      className="col-span-2 text-sm break-all"
                    >
                      {JSON.stringify(configOption.value)}
                    </p>
                    {configOption.label === "Pattern" && (
                      <div key={`${path.id}-${configOption.label}-empty`}></div>
                    )}
                    <div
                      key={`${path.id}-${configOption.label}-config`}
                      className="col-span-2"
                    >
                      {configOption.label === "Custom" ? (
                        <Input
                          placeholder={"new val"}
                          onChange={(event) => {
                            handleCustomValueChange(
                              null,
                              event,
                              configOption.label
                            );
                          }}
                          className="w-[210px]"
                        />
                      ) : configOption.label === "UUID" ? (
                        <div className="flex gap-1">
                          <Button
                            size="small"
                            type="primary_inverse"
                            className="border border-sky-600 !m-0"
                            label={"Generate"}
                            onClick={(event) => {
                              handleCustomValueChange(
                                null,
                                event,
                                configOption.label
                              );
                            }}
                          />
                        </div>
                      ) : configOption.label === "Date" ? (
                        <div className="flex gap-1">
                          <Dropdown
                            options={dateTypeOptions}
                            changedValues={("noEvent", "DateFormat")}
                            onChange={handleCustomValueChange}
                            color={true}
                            text="text-[12px]"
                            width="w-[130px]"
                            height="h-[20px]"
                            className="mt-[3px] text-sm absolute"
                          />
                          <Dropdown
                            options={dateOptions}
                            changedValues={("noEvent", configOption.label)}
                            onChange={handleCustomValueChange}
                            color={true}
                            text="text-[12px]"
                            width="w-[110px]"
                            height="h-[20px]"
                            className="mt-[3px] text-sm absolute"
                          />
                        </div>
                      ) : configOption.label === "Pattern" ? (
                        <div className="flex gap-1 w-[600px]">
                          <FloatingFilled
                            label="Prefix"
                            onChange={(event) =>
                              handleCustomValueChange(
                                [],
                                event,
                                "PatternPrefix"
                              )
                            }
                            className="w-[120px]"
                          />
                          <Dropdown
                            options={textTypeOptions}
                            changedValues={("noEvent", "PatternFormat")}
                            onChange={handleCustomValueChange}
                            color={true}
                            text="text-[12px]"
                            width="w-[200px]"
                            height="h-[20px]"
                            className="mt-[3px] text-sm absolute"
                          />

                          <FloatingFilled
                            label="Range"
                            onChange={(event) =>
                              handleCustomValueChange([], event, "PatternRange")
                            }
                            className="w-[120px]"
                          />

                          <Switch
                            label="Timestamp"
                            onChange={(event) =>
                              handleCustomValueChange([], event, "PatternCheck")
                            }
                          />
                        </div>
                      ) : configOption.label === "Email" ? (
                        <div className="flex gap-1">
                          <Dropdown
                            options={textTypeOptions}
                            changedValues={("noEvent", "Email")}
                            onChange={handleCustomValueChange}
                            color={true}
                            text="text-[12px]"
                            width="w-[270px]"
                            height="h-[20px]"
                            className="mt-[3px] text-sm absolute"
                          />

                          <FloatingFilled
                            label={"Range"}
                            onChange={(event) => {
                              handleCustomValueChange([], event, "EmailRange");
                            }}
                            className="w-[110px]"
                          />
                          <p className="mt-[10px]">@test.com</p>
                        </div>
                      ) : configOption.label === "Minimum" ? (
                        <div className="flex gap-1">
                          <Dropdown
                            options={textTypeOptions}
                            changedValues={("noEvent", "Minimum")}
                            onChange={handleCustomValueChange}
                            color={true}
                            text="text-[12px]"
                            width="w-[270px]"
                            height="h-[20px]"
                            className="mt-[3px] text-sm absolute"
                          />

                          <FloatingFilled
                            label={"Range"}
                            onChange={(event) => {
                              handleCustomValueChange(
                                [],
                                event,
                                "MinimumRange"
                              );
                            }}
                            className="w-[110px]"
                          />
                        </div>
                      ) : configOption.label === "Maximum" ? (
                        <div className="flex gap-1">
                          <Dropdown
                            options={textTypeOptions}
                            changedValues={("noEvent", "Maximum")}
                            onChange={handleCustomValueChange}
                            color={true}
                            text="text-[12px]"
                            width="w-[270px]"
                            height="h-[20px]"
                            className="mt-[3px] text-sm absolute"
                          />

                          <FloatingFilled
                            label={"Range"}
                            onChange={(event) => {
                              handleCustomValueChange(
                                [],
                                event,
                                "MaximumRange"
                              );
                            }}
                            className="w-[110px]"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              );
            });
          }
          return null; // Add this line to handle other cases
        });
      }
      return null; // Add this line to handle other cases
    });
  };

  const showValue = () => {
    return multiTestConfig.map((multiPath) => {
      if (multiPath.name === path.name) {
        return multiPath.config.map((option, optionIndex) => {
          if (optionIndex === index) {
            return option.map((configOption) => {
              return (
                <div
                  className="grid grid-cols-2 mb-[5px] container items-center"
                  key={configOption.label}
                >
                  <div className="flex  items-center">
                    <Delete
                      onClick={() => handleCustomDeleteChange(configOption)}
                      className="mt-[6px]"
                    />
                    <CheckBox
                      onChange={(e) => {
                        handleSelectUnique(e, configOption);
                      }}
                      checked={configOption.unique}
                      className="mt-[10px] mx-[10px]"
                    />
                    <h6 className="uppercase text-sm mt-[10px]">
                      {configOption.label}
                    </h6>
                  </div>
                  <span className="text-sm break-all mt-[10px]">
                    {JSON.stringify(configOption.value)}
                  </span>
                </div>
              );
            });
          }
          return null; // Add this line to handle other cases
        });
      }
      return null; // Add this line to handle other cases
    });
  };

  const Model = () => {
    return (
      <div className="ml-[20px] pl-[20px] border-l-2 ">
        {modalIsOpen ? (
          <div className="flex flex-col justify-between mt-[20px]">
            {customHeader()}
            <p>
              Path: {path.name} - TC {index + 1}
            </p>

            {showValue()}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return render ? (
    <p></p>
  ) : (
    <>
      <Model />
      <Result />
    </>
  );
};

export default MultiConfig;
