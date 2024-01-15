import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "./tooltip";

export default function Create(props) {
  return (
    <Tooltip message={"Create"} position="lessRight">
      <div
        className="min-w-[15px] min-h-[15px] cursor-pointer"
        onClick={props.onClick}
      >
        <FontAwesomeIcon
          icon={faFolderPlus}
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
