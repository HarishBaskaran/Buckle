import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "./tooltip";

export default function Edit(props) {
  return (
    <Tooltip message={"Edit"} position="right">
      <div
        className="min-w-[15px] min-h-[15px] cursor-pointer"
        onClick={props.onClick}
      >
        <FontAwesomeIcon
          icon={faPen}
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
