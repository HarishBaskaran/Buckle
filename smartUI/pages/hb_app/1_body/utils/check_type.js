export function createCustomArray(strValue) {
  let arrValue = strValue.split(",").map((val) => {
    return CheckTypeAndReturnValue(val);
  });

  return arrValue;
}

export function CheckTypeAndReturnValue(val) {
  if (!isNaN(val)) {
    if (val.includes(".")) {
      return parseFloat(val); // convert to float
    }
    return parseInt(val, 10); // convert to integer
  }
  return val; // leave as string
}

export function CheckType(val) {
  if (typeof val === "number") {
    if (Number.isInteger(typeof val)) {
      return "integer";
    } else {
      return "float";
    }
  } else if (typeof val === "string") {
    return "string";
  }
  return "empty";
}

export default function defaultExport() {}
