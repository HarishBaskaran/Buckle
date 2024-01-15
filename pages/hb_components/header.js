import { fontSize, typeColor } from "./configuration/config";

const styles = `
mt-[15px] px-2 
text-blueGray-600 font-bold
min-w-[25%] min-h-[5%]
`;

const Header = (props) => {
  let size = fontSize(props.size);
  return (
    <h4 className={`${styles} ${size} ${props.className}`}>{props.label}</h4>
  );
};

export default Header;
/*
props 
  size
  className
  label
*/
