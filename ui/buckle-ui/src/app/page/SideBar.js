import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const CollectionsImage = (props) => {
  return (
    <div
      className="ml-[1px] cursor-pointer flex flex-col align-center items-center"
      onClick={props.onClick}
    >
      <FontAwesomeIcon
        icon={faFolderOpen}
        className={`${props.className} max-w-[20px] max-h-[20px] text-sky-600`}
      />
      <p>Collections</p>
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="border-2 border-gray-300 bg-color-gray flex flex-col items-center max-w-[100px] min-h-screen pt-[15px]">
      <CollectionsImage />
    </div>
  );
};

export default SideBar;
