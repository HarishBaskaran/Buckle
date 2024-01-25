import ContextProvider from "./0_Context";
import SideBar from "./11_SideBar/sideBar";
import MethodUrl from "./arrangements/methodUrl";
import Tabs from "./arrangements/tabs";

const Body = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full">
        <MethodUrl />
        <Tabs />
      </div>
    </div>
  );
};

export default Body;
