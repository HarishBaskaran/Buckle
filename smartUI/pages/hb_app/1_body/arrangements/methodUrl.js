import Button from "smart/pages/hb_components/button";
import Runner from "../10_TestRunner/runner";
import HttpMethodDetails from "../1_MethodUrl/httpMethod";
import UrlDetails from "../1_MethodUrl/url";
import Result from "../7_TestResult/result";
import CollectionHeader from "../11_SideBar/collectionHeader";

const MethodUrl = () => {
  return (
    <div className="flex flex-col gap-2 ml-[20px] mt-[20px] mb-[10px]">
      <CollectionHeader />
      <p className="flex border-t-2 border-gray "> </p>
      <div className="flex ">
        <HttpMethodDetails />
        <UrlDetails />
        <Runner />
      </div>
    </div>
  );
};

export default MethodUrl;
