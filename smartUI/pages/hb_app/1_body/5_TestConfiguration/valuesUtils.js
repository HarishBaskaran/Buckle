import {
  generateRandomAlphaNumeric,
  generateRandomNumber,
  generateRandomString,
} from "../utils/random_generator";

export function createDate(selected) {
  let label = "";
  selected.map((selected_date) => {
    if (selected_date.selected) label = selected_date.label;
  });
  return label;
}

export function returnDate(selectedLabel) {
  let date = "";
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 7);
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + 7);
  const futureTradingDate = new Date();
  let daysToAdd = 1; // Start with adding 1 day
  while (futureTradingDate.getDay() === 0 || futureTradingDate.getDay() === 6) {
    // If the current date is a Sunday (0) or Saturday (6), add 1 more day
    futureTradingDate.setDate(currentDate.getDate() + daysToAdd);
    daysToAdd++;
  }

  if (selectedLabel == "Past") date = pastDate;
  else if (selectedLabel == "Current") date = currentDate;
  else if (selectedLabel == "Future") date = futureDate;
  else if (selectedLabel == "Trading") date = futureTradingDate;
  else if (selectedLabel == "Select...") return "";

  date = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return date;
}

export function returnValue(configuration, obj) {
  const configMatch = configuration.find(
    (config) => config.label === obj.label && config.selected === true
  );

  if (configMatch) {
    return {
      ...obj,
      value: configMatch.value,
      selected: true,
    };
  }

  return obj;
}

export function returnConfig(configuration, obj) {
  const configMatch = configuration.find(
    (config) => config.label === obj.label && config.selected === true
  );

  if (configMatch) {
    return {
      ...configMatch,
    };
  }

  return obj;
}

export function returnEmail(emailFormat, range) {
  let email = "";
  let suffix = "@test.com";
  if (emailFormat == "Alphabets") email = generateRandomString(range) + suffix;
  else if (emailFormat == "Numeric")
    email = generateRandomNumber(range) + suffix;
  else if (emailFormat == "AlphaNumeric")
    email = generateRandomAlphaNumeric(range) + suffix;
  else email = "";

  return email;
}

export function returnBoundary(emailFormat, range) {
  let email = "";

  if (emailFormat == "Alphabets") email = generateRandomString(range);
  else if (emailFormat == "Numeric") email = generateRandomNumber(range);
  else if (emailFormat == "AlphaNumeric")
    email = generateRandomAlphaNumeric(range);
  else email = "";

  return email;
}

export function returnTimestamp() {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  return timestamp;
}

const DefaultConfig = () => {};

export default DefaultConfig;
