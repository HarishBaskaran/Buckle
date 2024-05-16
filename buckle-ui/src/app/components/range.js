import React, { useEffect, useState } from "react";
import Tooltip from "./tooltip";

const Range = (props) => {
  const [rangeValue, setRangeValue] = useState(props.value ? props.value : 10);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  const handleRangeBlur = (event) => {
    props.setValue ? props.setValue(rangeValue) : "";
  };

  return (
    <Tooltip message={rangeValue} position="right">
      <input
        type="range"
        value={rangeValue}
        onChange={handleRangeChange}
        onBlur={handleRangeBlur}
        className={`my-[15px] ${
          props.className ? props.className : "w-full"
        } h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-sky-600`}
      />
    </Tooltip>
  );
};

export default Range;
