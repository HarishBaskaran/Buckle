import Runner from "../10_TestRunner/runner";
import HttpMethodDetails from "../1_MethodUrl/httpMethod";
import UrlDetails from "../1_MethodUrl/url";
import CollectionHeader from "../11_SideBar/collectionHeader";
import { useState } from "react";

const MethodUrl = () => {
  return (
    <div className="flex flex-col gap-2 mx-[20px] mb-[10px]">
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

const MethodUrl1 = () => {
  const [width, setWidth] = useState("1%");

  const handleDividerDrag = (event) => {
    const newWidth = `${(event.clientX / window.innerWidth) * 100}%`;
    setWidth(newWidth);
  };

  return (
    <div className="flex flex-row items-stretch h-screen overflow-hidden">
      <div
        className="w-1 bg-gray-300 cursor-col-resize select-none"
        style={{ width }}
        onMouseDown={() =>
          document.addEventListener("mousemove", handleDividerDrag)
        }
        onMouseUp={() =>
          document.removeEventListener("mousemove", handleDividerDrag)
        }
      ></div>
      <div className="flex-1 overflow-auto">
        {/* Your content for the left pane goes here */}
        <div className="h-full bg-gray-100 p-4">
          <h2>Left Pane</h2>
          {/* Add your content here */}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {/* Your content for the right pane goes here */}
        <div className="h-full bg-white p-4">
          <h2>Right Pane</h2>
          {/* Add your content here */}
        </div>
      </div>
    </div>
  );
};

export default MethodUrl;
