import { fontSize, typeColor } from "./configuration/config";

const styles = `
px-3 py-1 mr-1 rounded
ease-linear transition-all duration-150
`;

const Button = (props) => {
  let size = fontSize(props.size);
  let type = typeColor(props.type);

  return (
    <button
      type="button"
      className={`${styles} ${size} ${type} ${props.className}`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default Button;
/* 
    props : 
      size
      type
      className
      label
      onClick
    */
