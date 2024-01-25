import { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "smart/pages/hb_components/tooltip";
import { multiQueryCustomTestDataContext } from "../../0_Context/7A_MultiQueryCustomTestDataConfig";

const Custom = (props) => {
  let { modalIsOpen, setModalIsOpen, setPath, setIndex, setType } = useContext(
    multiQueryCustomTestDataContext
  );

  const handleOpen = () => {
    setModalIsOpen(true);
    setPath(props.path);
    setIndex(props.index);
    setType(props.type);
  };

  useEffect(() => {
    if (!modalIsOpen) {
      setPath({});
      setIndex({});
    }
  }, [modalIsOpen]);

  return (
    <Tooltip message="Custom" position="right">
      <FontAwesomeIcon
        icon={faPenToSquare}
        className={`text-sky-600 ml-[20px] my-auto w-[20px] h-[20px] cursor-pointer`}
        onClick={() => handleOpen()}
      />
    </Tooltip>
  );
};

export default Custom;
