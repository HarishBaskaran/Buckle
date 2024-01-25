export const exportStateAsJSON = (value, file_name) => {
  const element = document.createElement("a");
  const file = new Blob([value], { type: "application/json" });
  element.href = URL.createObjectURL(file);
  element.download = file_name;
  document.body.appendChild(element);
  element.click();
};

const exportStateAsJSON_default = () => {};
export default exportStateAsJSON_default;
