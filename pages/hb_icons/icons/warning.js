import React from "react";

const Warning = (props) => {
  const height = props.height ? props.height : 20;
  const width = props.width ? props.width : 20;
  const style = props.color ? { fill: props.color } : { fill: "black" };

  return (
    <svg
      height={height}
      viewBox="0 0 20 20"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <circle
        cx="10"
        cy="14"
        r="1"
        stroke={props.color ? props.color : "black"}
      />
      <circle
        cx="10"
        cy="10"
        fill="none"
        r="9"
        stroke={props.color ? props.color : "black"}
        stroke-width="1.1"
      />
      <path d="m10.97 7.72c-.12 1.82-.41 3.57-.41 3.57-.05.58-.29.71-.57.71-.3 0-.5-.13-.56-.71 0 0-.27-1.75-.4-3.57-.07-1.18 0-1.72 0-1.72 0-.55.43-.98.96-1 .54.01.98.44.98 1 0 0 .07.54 0 1.72z" />
    </svg>
  );
};

export default Warning;
