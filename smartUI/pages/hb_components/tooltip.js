import { fontSize, typeColor } from "./configuration/config";

const position = `top-8`;
const styles = `absolute 
rounded bg-gray-800 scale-0 transition-all 
p-2 text-xs text-white group-hover:scale-100`;

export default function Tooltip(props) {
  return (
    <div className="group relative flex z-4">
      {props.children}
      <span
        className={`${styles} ${
          props.position == "right"
            ? "left-10 right-50"
            : props.position == "lessRight"
            ? "left-5 right-20"
            : props.position == "left"
            ? "right-10 left-50"
            : position
        }${fontSize(props.size)} ${props.className}`}
      >
        {props.message}
      </span>
    </div>
  );
}
