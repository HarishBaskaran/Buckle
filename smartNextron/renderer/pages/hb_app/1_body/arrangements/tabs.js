import React from "react";
import { Tab, TabContainer } from "../../../hb_components/tab";
import Query from "../2_QueryParams/queryParams";
import Headers from "../3_Headers/headers";
import JsonBody from "../4_Body/jsonBody";
import TestData from "../5_TestConfiguration/testdata";
import Result from "../7_TestResult/result";
import Output from "../8_TestOutput/output";
import Status from "../6_TestSummary/summary";
import PreRequest from "../12_PreRequest/prerequest";
import PathParam from "../2_QueryParams/pathParams";
import JsonTreeComponent from "../jsonTreeComponent";

const Tabs = () => {
  return (
    <TabContainer
      size="small"
      className="mx-[20px] mt-[15px] w-[95%]"
      firstTab={2}
    >
      <Tab label="PARAMS">
        <Query />
        <PathParam />
      </Tab>
      <Tab label="HEADERS">
        <Headers />
      </Tab>
      <Tab label="BODY">
        <JsonBody />
      </Tab>
      <Tab label="PRE REQUISITES">
        <PreRequest />
      </Tab>
      <Tab label="TEST CONFIG">
        <TestData />
        <Result />
      </Tab>
      <Tab label="TEST SUMMARY">
        <Status />
      </Tab>
      <Tab label="OUTPUT">
        <Output />
      </Tab>
      <Tab label="JSON tree">
        <JsonTreeComponent />
      </Tab>
    </TabContainer>
  );
};

export default Tabs;
