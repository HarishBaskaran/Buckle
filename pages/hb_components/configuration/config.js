export function fontSize(size) {
  let fontSize = size
    ? size.toLowerCase() === "extralarge"
      ? "text-xl"
      : size.toLowerCase() === "large"
      ? "text-lg"
      : size.toLowerCase() === "medium"
      ? "text-base"
      : "text-sm"
    : "text-sm";
  return fontSize;
}

export function typeColor(color) {
  let primary = `
    text-white hover:text-white 
    bg-sky-600 hover:bg-sky-400 
    active:bg-sky-600`;

  // border-blue-400 rounded-lg
  let primary_link = `
    text-sky-600 
    bg-white-400
    hover:text-white 
    hover:bg-sky-400
    active:bg-white-600`;

  let primary_inverse = `
    text-sky-600 
    bg-white-400
    border border-sky-600
    hover:text-white 
    hover:bg-sky-400
    active:bg-white-600`;

  let secondary = `
    text-white 
    bg-sky-400 
    hover:text-sky-600 
    hover:bg-white 
    hover:border-white 
    hover:border-2 
    active:bg-sky-600`;

  let warning = `
    text-white hover:text-white 
    bg-sky-400 hover:bg-sky-600 
    active:bg-sky-600`;

  let text = `
    text-sky-600 `;

  let error = "";
  let outlined = "";
  let disabled = "";

  let nothing = " ";

  let typeColor = color
    ? color.toLowerCase() === "primary"
      ? primary
      : color.toLowerCase() === "primary_inverse"
      ? primary_inverse
      : color.toLowerCase() === "primary_link"
      ? primary_link
      : color.toLowerCase() === "secondary"
      ? secondary
      : color.toLowerCase() === "warning"
      ? warning
      : color.toLowerCase() === "text"
      ? text
      : color.toLowerCase() === "icon"
      ? nothing
      : nothing
    : nothing;
  return typeColor;
}

const Configuration = () => {};

export default Configuration;
