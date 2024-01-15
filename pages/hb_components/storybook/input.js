import Warning from "@/pages/hb_icons/icons/warning";
import InputNormal from "../components/input/input_outside";
import InputOutlined from "../components/input/input_outlined";
import InputInside from "../components/input/input_inside";
import InputButton from "../components/input/input_button";

const Input = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <InputButton
          change={false}
          size="small"
          className="w-[100px] ml-[20px]"
        />
      </div>
      <div className="flex gap-2">
        <InputNormal
          change={false}
          size="small"
          className="w-[100px] ml-[20px]"
        />
        <InputNormal
          change={false}
          placeholder="Full Name"
          size="small"
          className="w-[100px] ml-[20px]"
          inputClassName="border-red-600"
        />
        <InputNormal
          change={false}
          size="small"
          className="w-[100px] ml-[20px]"
          message="hi there"
        />
        <InputNormal
          change={false}
          size="small"
          className="w-[100px] ml-[20px]"
          message="hi there"
          icon={<Warning height="13" width="13" />}
        />
        <InputNormal
          change={false}
          placeholder="Full Name"
          size="small"
          message="hi there"
          icon={<Warning height="13" width="13" color="red" />}
          className="w-[100px] ml-[20px]"
          messageClassName="text-red-600"
        />
      </div>
      <div className="flex gap-2">
        <InputNormal
          change={false}
          size="small"
          className=" ml-[10px]"
          label="Full name"
          message="hi there"
        />
        <InputNormal
          change={false}
          size="small"
          className=" ml-[20px]"
          inputClassName="border-red-600"
          label="Full name"
        />
        <InputNormal
          change={false}
          size="small"
          message="hi there"
          label="Full name"
          icon={<Warning height="13" width="13" color="red" />}
          className="w-[100px] ml-[20px]"
          inputClassName="border-red-600"
          messageClassName="text-red-600"
          labelClassName="text-red-600"
        />
      </div>
      <div className="flex gap-2">
        <InputInside label="Full name" size="small" className="ml-[20px]" />
        <InputInside
          label="Full name"
          size="small"
          className="ml-[20px]"
          placeholder="Full Name"
          inputClassName="border-red-600"
          labelClassName="text-red-600"
        />
        <InputInside
          label="Full name"
          size="small"
          placeholder="Full Name"
          inputClassName="border-red-600"
          labelClassName="text-red-600"
          message="hi there"
          icon={<Warning height="13" width="13" color="red" />}
          className="w-[100px] ml-[20px]"
          messageClassName="text-red-600"
        />
      </div>
      <div className="flex gap-2">
        <InputOutlined label="Full name" size="small" className="ml-[20px]" />
        <InputOutlined label="Full name" size="small" placeholder="Full Name" />
        <InputOutlined
          label="Full name"
          size="small"
          placeholder="Full Name"
          inputClassName="border-red-600"
          labelClassName="text-red-600"
        />
        <InputOutlined
          label="Full name"
          size="small"
          placeholder="Full Name"
          inputClassName="border-red-600"
          labelClassName="text-red-600"
          message="hi there"
          icon={<Warning height="13" width="13" color="red" />}
          className="w-[100px] ml-[20px]"
          messageClassName="text-red-600"
        />
      </div>
    </div>
  );
};

export default Input;
