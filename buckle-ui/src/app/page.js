import LSideBar from "./layouts/arragements";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <LSideBar />
    </RecoilRoot>
  );
}
