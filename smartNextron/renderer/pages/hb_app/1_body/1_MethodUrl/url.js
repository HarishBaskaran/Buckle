import React, { useContext } from "react";
import { urlContext } from "../0_Context/2_Url";
import Input from "../../../hb_components/input";

const UrlDetails = () => {
  const { url, setUrl } = useContext(urlContext);

  return (
    <Input
      size="small"
      placeholder="Enter the Url"
      setValue={setUrl}
      value={url}
      className="ml-[5px] w-[70%] h-[37px]"
    />
  );
};

export default UrlDetails;
