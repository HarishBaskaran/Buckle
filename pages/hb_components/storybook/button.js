import Google from "@/pages/hb_icons/icons/google";
import ButtonBothIconText from "../components/button/iconAndText";
import ButtonOnlyIcon from "../components/button/onlyIcon";
import ButtonOnlyText from "../components/button/onlyText";
import GitHub from "@/pages/hb_icons/icons/github";

const Button = () => {
  return (
    <div className="ml-[10px] flex gap-5 ">
      <ButtonOnlyText label="Google" type="primary_inverse" />
      <ButtonOnlyText
        label="Google"
        type="primary_inverse"
        className="rounded-full"
      />
      <ButtonOnlyText label="Google" type="text" />
      <ButtonBothIconText
        label="Google"
        icon={<Google />}
        type="primary_inverse"
      />
      <ButtonBothIconText
        label="Github"
        icon={<GitHub />}
        type="primary_inverse"
        className="rounded-full"
      />
      <ButtonOnlyIcon icon={<GitHub />} type="nothing" />
    </div>
  );
};

export default Button;
