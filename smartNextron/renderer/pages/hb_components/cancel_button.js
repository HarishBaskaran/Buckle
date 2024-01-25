import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "./tooltip";

export default function Cancel(props) {
  return (
    <Tooltip message={"Cancel"} position="left">
      <div
        className="min-w-[15px] min-h-[15px] cursor-pointer"
        onClick={props.onClick}
      >
        <FontAwesomeIcon
          icon={faXmark}
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
