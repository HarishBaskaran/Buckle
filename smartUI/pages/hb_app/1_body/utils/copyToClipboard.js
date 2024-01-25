export const CopyToClipboard = async (output) => {
  try {
    await navigator.clipboard.writeText(output);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

const CopyToClipboard_default = () => {};
export default CopyToClipboard_default;
