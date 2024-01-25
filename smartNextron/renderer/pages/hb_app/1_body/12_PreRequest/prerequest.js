import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../../../hb_components/dropdown_single";
import {
  destOptions,
  options,
  requestOptions,
} from "../data/preRequest_options_schema";
import Input from "../../../hb_components/input";
import Header from "../../../hb_components/header";
import TypeAhead from "../../../hb_components/typeahead";
import { preRequestContext } from "../0_Context/12_PreRequest";
import ProductTable from "../../../hb_components/table";
import PopupModal from "../../../hb_components/popup1";
import { collectionsContext } from "../0_Context/11_SideBarCollections";
import axios from "axios";

const PopupContent = (props) => {
  const [sourceRequest, setSourceRequest] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [sourceKey, setSourceKey] = useState("");

  const [destinationType, setDestinationType] = useState("");
  const [destinationKey, setDestinationKey] = useState("");

  const [render, setRender] = useState(true);
  const [sourceRequestOptions, setSourceRequestOptions] = useState([]);
  const [sourceTypeOptions, setSourceTypeOptions] = useState(options);
  const [destinationTypeOptions, setDestinationTypeOptions] =
    useState(destOptions);

  const { userName, folderName } = useContext(collectionsContext);

  const endpoint = "http://localhost:8082/directory";

  useEffect(() => {
    axios
      .get(endpoint, {
        params: {
          userName: userName,
          folderName: folderName,
        },
      })
      .then((response) => {
        // Handle the response
        const files = response.data;
        const convertedFiles = files.map((file, index) => ({
          value: file,
          label: file,
          selected: false,
        }));
        setSourceRequestOptions(convertedFiles);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (
      (sourceType !== "" &&
        sourceKey !== "" &&
        destinationType !== "" &&
        destinationKey !== "" &&
        props.popDataFlag === 2) ||
      props.popDataFlag == 5
    ) {
      // console.log(array);
      if (sourceType.label === "Environment") {
        sourceRequest = null;
      }

      if (
        (sourceType.label !== "Environment" &&
          (sourceRequest || sourceRequest !== "")) ||
        (sourceType.label === "Environment" && !sourceRequest)
      ) {
        let array = [];
        array.push(sourceRequest ? sourceRequest.label : "-_NA_-");
        array.push(sourceType.label);
        array.push(sourceKey);
        array.push(destinationType.label);
        array.push(destinationKey);
        props.setTableData(array);
        if (props.popDataFlag === 2) props.setPopDataFlag(3);
        if (props.popDataFlag === 5) props.setPopDataFlag(6);
      }
    }
  }, [
    sourceRequest,
    sourceType,
    sourceKey,
    destinationType,
    destinationKey,
    props.popDataFlag,
  ]);

  useEffect(() => {
    if (!render) {
      setRender(true);
    }
  }, [render]);

  useEffect(() => {
    if (props.popDataFlag == 1) {
      props.setPopDataFlag(2);
    }
    if (props.popDataFlag == 4) {
      if (props.fakeTableData.length === 5) {
        const [
          tableSourceRequest,
          tableSourceType,
          tableSourceKey,
          tableDestinationType,
          tableDestinationKey,
        ] = props.fakeTableData;

        setSourceType(tableSourceType);
        setSourceTypeOptions(
          sourceTypeOptions.map((item) => {
            if (item.label === tableSourceType) {
              return { ...item, selected: true };
            } else {
              return { ...item, selected: false };
            }
          })
        );

        setSourceRequest(tableSourceRequest);
        setSourceRequestOptions(
          sourceRequestOptions.map((item) => {
            if (item.label === tableSourceRequest) {
              return { ...item, selected: true };
            } else {
              return { ...item, selected: false };
            }
          })
        );

        setSourceKey(tableSourceKey);
        setDestinationType(tableDestinationType);
        setDestinationTypeOptions(
          destinationTypeOptions.map((item) => {
            if (item.label === tableDestinationType) {
              return { ...item, selected: true };
            } else {
              return { ...item, selected: false };
            }
          })
        );
        setDestinationKey(tableDestinationKey);
        setRender(false);
      }
    }
  }, [props.popDataFlag]);

  return render ? (
    <>
      <div className="mt-[20px]">
        <Header className="text-sky-600" label="Source Request Details" />
        <div className="flex flex-col mt-[20px]">
          <div className="flex mx-[20px]">
            <label className="text-gray-500 text-[14px] mt-[8px] mr-[15px]">
              Key Name
            </label>
            <Input
              className="w-[230px] mr-[50px]"
              setValue={setSourceKey}
              value={sourceKey}
            />

            <label className="text-gray-500 text-[14px] mt-[5px] mr-[30px]">
              Source Type
            </label>
            <Dropdown
              options={sourceTypeOptions}
              text="text-[12px]"
              width="w-[230px]"
              setValue={setSourceType}
            />
          </div>

          {sourceType.label !== "Environment" && (
            <div className="flex mt-[10px] ml-[20px]">
              <p className="text-gray-500 text-[14px] mt-[5px] mr-[27px]">
                Request
              </p>
              <TypeAhead
                options={sourceRequestOptions}
                text="text-[12px]"
                width="w-[230px]"
                className="mr-[60px]"
                setValue={setSourceRequest}
                value={sourceRequest}
              />
            </div>
          )}
        </div>

        <p className="my-[20px] border border-gray w-full"></p>
      </div>

      <div className="mt-[20px]">
        <Header className="text-sky-600" label="Destination Request Details" />
        <div className="flex flex-col mt-[20px]">
          <div className="flex mx-[20px]">
            <label className="text-gray-500 text-[14px] mt-[8px] mr-[15px]">
              Key Name
            </label>
            <Input
              className="w-[230px] mr-[30px]"
              setValue={setDestinationKey}
              value={destinationKey}
            />

            <label className="text-gray-500 text-[14px] mt-[5px] mr-[30px]">
              Destination Type
            </label>
            <Dropdown
              options={destinationTypeOptions}
              text="text-[12px]"
              width="w-[230px]"
              setValue={setDestinationType}
            />
          </div>
        </div>

        <p className="my-[20px] border border-gray w-full"></p>
      </div>
    </>
  ) : (
    <></>
  );
};

const PreRequest = () => {
  const { tableData, setTableData } = useContext(preRequestContext);

  const headers = [
    "Source Request",
    "Source Type",
    "Source Key",
    "Destination Type",
    "Destination Key",
    "Actions",
  ];

  const [popupFlag, setPopupFlag] = useState(false);
  const [editTableData, setEditTableData] = useState([]);
  const [fakeTableData, setFakeTableData] = useState([]);

  const [popDataFlag, setPopDataFlag] = useState(0);

  const handlePopupSave = () => {
    if (popDataFlag == 0) {
      setPopDataFlag(1);
    }
    if (popDataFlag == 4) {
      setPopDataFlag(5);
    }
  };

  useEffect(() => {
    if (popDataFlag == 3) {
      tableData.push(fakeTableData);
      setTableData(tableData);
      setPopupFlag(false);
      setPopDataFlag(0);
    }
    if (popDataFlag == 6) {
      const updatedArray = tableData.map((subarray) => {
        if (isSameArray(subarray, editTableData)) {
          return fakeTableData;
        }
        return subarray;
      });

      setTableData(updatedArray);
      setPopupFlag(false);
      setPopDataFlag(0);
    }
  }, [popDataFlag]);

  function isSameArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  const handleEditRow = (row) => {
    setEditTableData(row);
    setPopDataFlag(4);
    setPopupFlag(true);
  };

  const handleDeleteRow = (row) => {
    const newArray = tableData.filter(
      (subArray) => !isSameArray(subArray, row)
    );

    setTableData(newArray);
  };

  return (
    <>
      <div className="mb-[10px]">
        <PopupModal
          buttonLabel={"Add requisite"}
          flag={popupFlag}
          open={() => setPopupFlag(true)}
          close={() => setPopupFlag(false)}
          save={() => {
            handlePopupSave();
          }}
          height="h-[65vh]"
          width="w-[60%]"
          contentWidth="w-[750px]"
          header="CREATE NEW REQUISITE"
        >
          <PopupContent
            popDataFlag={popDataFlag}
            setPopDataFlag={setPopDataFlag}
            setTableData={setFakeTableData}
            fakeTableData={editTableData}
          />
        </PopupModal>
      </div>

      <ProductTable
        headers={headers}
        data={tableData}
        action={true}
        onEditClick={handleEditRow}
        onDeleteClick={handleDeleteRow}
      />
    </>
  );
};

export default PreRequest;
