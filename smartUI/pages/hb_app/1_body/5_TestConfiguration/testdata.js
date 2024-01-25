import React, { useEffect, useState, useContext } from "react";
import { jsonBodyContext } from "../0_Context/5_JsonBody";
import SingleTestData from "./1_singleTestConfig/single_testdata";
import MultiTestData from "./2_multiTestConfig/multiple_testdata";
import DefaultConfig from "./defaultConfig";
import Toggle2 from "smart/pages/hb_components/toggle2";
import SingleQueryTestData from "./1_singleQueryTestConfig/single_query_testdata";
import QueryConfig from "./1_singleQueryTestConfig/config";
import MultiQueryTestData from "./2_multiQueryTestConfig/multiple_query_testdata";
import MultiQueryConfig from "./2_multiQueryTestConfig/config";
import Config from "./1_singleTestConfig/config";
import MultiConfig from "./2_multiTestConfig/config";

const TestData = () => {
  const [query, setQuery] = useState(false);
  const [single, setSingle] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <Toggle2
          className="w-[20%]"
          flag={query}
          setFlag={setQuery}
          left="Query"
          right="JSON Body"
        />

        <Toggle2
          className="w-[15%]"
          flag={single}
          setFlag={setSingle}
          left="single"
          right="multiple"
        />
      </div>

      {query ? (
        single ? (
          <div className="flex w-full">
            <SingleQueryTestData />
            <div className="flex flex-col w-full">
              <DefaultConfig />
              <QueryConfig />
            </div>
          </div>
        ) : (
          <div className="flex w-full">
            <MultiQueryTestData />
            <div className="flex flex-col w-full">
              <DefaultConfig />
              <MultiQueryConfig />
            </div>
          </div>
        )
      ) : single ? (
        <div className="flex w-full">
          <SingleTestData />
          <div className="flex flex-col w-full">
            <DefaultConfig />
            <Config />
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full">
          <MultiTestData />
          <div className="flex flex-col">
            <DefaultConfig />
            <MultiConfig />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestData;
