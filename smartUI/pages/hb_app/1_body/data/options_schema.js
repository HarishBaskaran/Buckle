export const options = [
  { value: "unique", label: "Unique", selected: false },
  { value: "string", label: "String", selected: false },
  { value: "integer", label: "Integer", selected: false },
  { value: "float", label: "Float", selected: false },
  { value: "null", label: "Null", selected: false },
  { value: "", label: "Optional", selected: false },
  { value: [], label: "Custom", selected: false, unique: false },
  { value: "", label: "Date", selected: false, unique: false },
  { value: "", label: "Pattern", selected: false, unique: false },
  { value: "", label: "Email", selected: false, unique: false },
  {
    value: [],
    unique: "",
    date: "",
    email: "",
    boundary: {
      default: "",
      min: "",
      max: "",
      pattern: "",
    },
    label: "Custom",
    selected: false,
  },
];

export const dataTypeOptions = [
  { value: "string", label: "String", selected: false },
  { value: "integer", label: "Integer", selected: false },
  { value: "float", label: "Float", selected: false },
  { value: "null", label: "Null", selected: false },
  { value: "", label: "Optional", selected: false },
];

export const customOptions = [
  { value: "", label: "UUID", selected: false, unique: false },
  { value: [], label: "Custom", selected: false, unique: false },
  { value: "", label: "Date", selected: false, unique: false },
  { value: "", label: "Email", selected: false, unique: false },
  { value: "", label: "Minimum", selected: false, unique: false },
  { value: "", label: "Maximum", selected: false, unique: false },
  { value: "", label: "Pattern", selected: false, unique: false },
];

export const customOptions2 = [
  { value: "", label: "UUID", selected: false, unique: false },
  { value: [], label: "Custom", selected: false, unique: false },
  { value: "", label: "Date", selected: false, unique: false },
  { value: "", label: "Email", selected: false, unique: false },
  { value: "", label: "Minimum", selected: false, unique: false },
  { value: "", label: "Maximum", selected: false, unique: false },
  { value: "", label: "Pattern", selected: false, unique: false },
];

export const customOptionsConfig = [
  { value: "", label: "UUID", selected: false, unique: false, selectors: {} },
  { value: [], label: "Custom", selected: false, unique: false, selectors: {} },
  {
    value: "",
    label: "Date",
    selected: false,
    unique: false,
    selectors: {
      type: "",
      format: "",
      formatFlag: "",
    },
  },
  {
    value: "",
    label: "Email",
    selected: false,
    unique: false,
    selectors: {
      format: "",
      formatFlag: "",
      range: "",
    },
  },
  {
    value: "",
    label: "Minimum",
    selected: false,
    unique: false,
    selectors: {
      format: "",
      formatFlag: "",
      range: "",
    },
  },
  {
    value: "",
    label: "Maximum",
    selected: false,
    unique: false,
    selectors: {
      format: "",
      formatFlag: "",
      range: "",
    },
  },
  {
    value: "",
    label: "Pattern",
    selected: false,
    unique: false,
    selectors: {
      prefix: "",
      format: "",
      formatFlag: "",
      range: "",
      timestamp: "",
    },
  },
];

export const dateOptions = [
  { value: "", label: "Past", selected: false },
  { value: "", label: "Current", selected: false },
  { value: "", label: "Future", selected: false },
  { value: "", label: "Trading", selected: false },
  { value: "", label: "Select...", selected: false },
];

export const dateTypeOptions = [
  { value: "", label: "DD-MM-YYYY", selected: false },
  { value: "", label: "MM-DD-YYYY", selected: false },
  { value: "", label: "YYYY-MM-DD", selected: false },
  { value: "", label: "DD/MM/YYYY", selected: false },
  { value: "", label: "MM/DD/YYYY", selected: false },
  { value: "", label: "YYYY/MM/DD", selected: false },
  { value: "", label: "Select...", selected: false },
];

export const textTypeOptions = [
  { value: "", label: "Alphabets", selected: false },
  { value: "", label: "Numeric", selected: false },
  { value: "", label: "AlphaNumeric", selected: false },
  { value: "", label: "Select...", selected: false },
];

const defaultExport = () => {};
export default defaultExport;
