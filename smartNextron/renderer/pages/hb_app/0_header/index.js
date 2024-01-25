import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../../hb_components/tooltip";
import EnvironmentWrapper from "../1_body/13_Environment/environmentWrapper";
import AuthorizationWrapper from "../1_body/14_Authorization/authorizationWrapper";
import CurlWrapper from "../1_body/15_Curl/curl";

const Header = () => {
  return (
    <>
      <div className="flex justify-between pt-[5px] mb-[15px] border border-slate-300">
        {/* <img src={process.env.PUBLIC_URL + "/smartapi-logo.png"} /> */}
        <h4 className="ml-[30px] my-[5px] font-bold">SMART</h4>

        <div className="flex mr-[30px] ">
          <CurlWrapper />
          <AuthorizationWrapper />
          <EnvironmentWrapper />
          <Tooltip message={"Support"} position="left">
            <div className="mx-[20px] mt-[10px]">
              <FontAwesomeIcon icon={faLifeRing} className="text-slate-400" />
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Header;
