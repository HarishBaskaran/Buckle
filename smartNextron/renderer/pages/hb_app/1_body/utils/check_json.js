export function checkJSON(json, flag) {
  try {
    JSON.parse(json);
    flag(false);
  } catch (err) {
    if (null === json || "" === json) flag(false);
    else flag(true);
  }
}

export default function defaultExport() {}
