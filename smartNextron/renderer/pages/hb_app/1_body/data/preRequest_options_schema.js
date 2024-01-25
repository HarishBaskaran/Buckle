export const options = [
  { value: "", label: "Select...", selected: false },
  { value: "env", label: "Environment", selected: false },
  { value: "rqh", label: "Request Headers", selected: false },
  { value: "rqq", label: "Request Query", selected: false },
  { value: "rqb", label: "Request Body", selected: false },
  { value: "rsh", label: "Response Headers", selected: false },
  { value: "rsb", label: "Response Body", selected: false },
];

export const destOptions = [
  { value: "", label: "Select...", selected: false },
  { value: "rqh", label: "Request Headers", selected: false },
  { value: "rqq", label: "Request Query", selected: false },
  { value: "rqb", label: "Request Body", selected: false },
  { value: "rpp", label: "Request PathParams", selected: false },
];

const defaultExport = () => {};
export default defaultExport;
