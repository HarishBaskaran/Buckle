import { fontSize, typeColor } from "../../configuration/config";

const styles = `
mt-[2px] px-2 py-[6px] 
placeholder-blueGray-300 text-blueGray-600 
relative bg-white bg-white rounded 
border-slate-300 border-solid border
shadow outline-none 
focus:outline-none focus:shadow-outline min-w-[25%] min-h-[5%]
overflow-x-auto
`;

const Input = (props) => {
  let size = fontSize(props.size);

  const handleChange = (event) => {
    props.onChange ? props.onChange : "";
    props.setValue ? props.setValue(event.target.value) : "";
  };

  const handlePaste = (event) => {
    props.onPaste ? props.onPaste() : "";
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    const input = event.target;
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
    const currentValue = props.value || "";
    const newValue =
      currentValue.slice(0, selectionStart) +
      pastedText +
      currentValue.slice(selectionEnd);
    props.setValue(newValue);
    input.setSelectionRange(
      selectionStart + pastedText.length,
      selectionStart + pastedText.length
    );
  };

  return (
    <div className={`flex flex-col gap-3 ${props.className}`}>
      {props.label && (
        <div className={`flex gap-1 mb-[-13px]`}>
          <div className="mt-[2px]">{props.labelIcon}</div>
          <p
            className={`text-[14px] text-sky-600 pt-[1px] ${props.labelClassName}`}
          >
            {props.label}
          </p>
        </div>
      )}
      <input
        type="text"
        placeholder={props.placeholder}
        className={`${styles} ${size} ${props.inputClassName}`}
        onChange={props.change ? handleChange : props.onChange}
        onPaste={props.change ? handlePaste : props.onPaste}
        value={props.value}
      />
      {props.message && (
        <div
          className={`flex gap-1 mt-[-10px] pl-[5px] ${props.messageIconClassName}`}
        >
          <div className={`mt-[2px] ${props.iconClassName}`}>{props.icon}</div>
          <p
            className={`text-[10px] text-sky-600 pt-[1px] ${props.messageClassName}`}
          >
            {props.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Input;
/* 
    props : 
      size
      placeholder
      className
      onChange
      onPaste
      value
    */
