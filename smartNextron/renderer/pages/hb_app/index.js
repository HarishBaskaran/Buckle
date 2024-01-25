import Body from "./1_body";
import Header from "./0_header";
import ContextProvider from "./1_body/0_Context";

const Application = () => {
  return (
    <ContextProvider>
      <Header />
      <Body />
    </ContextProvider>
  );
};

export default Application;
