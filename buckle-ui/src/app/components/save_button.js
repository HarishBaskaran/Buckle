import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "./tooltip";

export default function Save(props) {
  return (
    <Tooltip message={"Save"} position="right">
      <div
        className="min-w-[15px] min-h-[15px] cursor-pointer"
        onClick={props.onClick}
      >
        <FontAwesomeIcon
          icon={faCheck}
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
