import { useEffect, useContext } from "react";
import Button from "../../../../hb_components/button";
import Tooltip from "../../../../hb_components/tooltip";
import { singleQueryCustomTestDataContext } from "../../0_Context/7A_SingleQueryCustomTestDataConfig";

const Custom = (props) => {
  let { modalIsOpen, setModalIsOpen, setPath, setOption } = useContext(
    singleQueryCustomTestDataContext
  );

  const handleOpen = () => {
    setModalIsOpen(true);
    setPath(props.path);
    setOption(props.option);
  };

  useEffect(() => {
    if (!modalIsOpen) {
      setPath({});
      setOption({});
    }
  }, [modalIsOpen]);

  return (
    <Tooltip
      message={props.option ? JSON.stringify(props.option.value) : []}
      className={"!opacity-90 !bg-gray-900 !right-[-50%] !top-[-50%]"}
    >
      <Button
        size="small"
        type="primary_link"
        className="mt-[3px] !pb-0 "
        label="Custom"
        onClick={() => handleOpen()}
      />
    </Tooltip>
  );
};

export default Custom;
