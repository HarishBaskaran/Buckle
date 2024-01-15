import { fontSize } from "../../configuration/config";

const styles = `
mt-[2px] px-2 py-[6px] 
placeholder-blueGray-300 text-blueGray-600 
relative bg-white bg-white rounded 
border-slate-300 border-solid border
shadow outline-none 
focus:outline-none focus:shadow-outline min-w-[25%] min-h-[5%]
overflow-x-auto
`;

export default function Input(props) {
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
      <div className={`relative `}>
        <input
          type="text"
          id="floating_filled"
          className={` ${props.inputClassName} ${styles} `}
          placeholder={props.placeholder}
          onChange={props.change ? handleChange : props.onChange}
          onPaste={props.change ? handlePaste : props.onPaste}
          value={props.value}
        />
        <label
          for="floating_filled"
          className={`absolute top-[-7px] left-2 bg-white px-1 text-sky-600
        ${props.labelClassName} ${size}`}
        >
          {props.label}
        </label>
      </div>
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
}
/*
props 
  label
  className
  value 
  setValue 
*/
