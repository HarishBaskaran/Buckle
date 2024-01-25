import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "smart/pages/hb_components/tooltip";

const Header = () => {
  return (
    <div className="flex justify-between pt-[5px] mb-[15px] border border-slate-300">
      {/* <img src={process.env.PUBLIC_URL + "/smartapi-logo.png"} /> */}
      <h4 className="ml-[30px] my-[5px] font-bold">SMART</h4>
      <div className="flex mr-[30px] ">
        <Tooltip message={"Support"} position="right">
          <div className="mr-[10px] mt-[5px]">
            <FontAwesomeIcon icon={faLifeRing} className="text-slate-400" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
