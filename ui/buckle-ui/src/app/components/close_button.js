import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "./tooltip";

export default function Close(props) {
  return (
    <Tooltip message={"Close"} position="right">
      <div
        className="mt-[3px] ml-[10px] min-w-[15px] min-h-[15px] cursor-pointer"
        onClick={props.onClick}
      >
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={`${props.className} text-sky-600`}
        />
      </div>
    </Tooltip>
  );
}
/* 
  onClick=
  className = 
*/
