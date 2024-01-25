var newman = require("newman"); // require Newman in your project
const fs = require("fs");
let sample_payload = require("./outline/payload_skeleton.json");
let environment = require("./outline/environment_variables.json");

const allowedApiMethods = ["post", "put", "get", "delete", "patch"];
let collectionItemToBePushed;

const setApiItemName = (json, itemName) => {
  const { statusCode = 400, changeSummary } = itemName;
  let apiRequestName = `Check CODE: ${statusCode} when `;
  for (let i = 0; i < changeSummary.length; i++) {
    const { fieldName, oldFieldType, newFieldValue } = changeSummary[i];
    apiRequestName += `${fieldName} FROM ${oldFieldType} to ${newFieldValue}`;

    if (i !== changeSummary.length - 1) {
      apiRequestName += " AND ";
    }
  }
  json.name = apiRequestName;
};

const buildUrlObject = (Url) => {
  const newAttrs = new URL(Url);
  const protocol = newAttrs.protocol.substring(0, newAttrs.protocol.length - 1);
  const host = newAttrs.host.split(".");
  const path = newAttrs.pathname.split("/").slice(1);
  const queryParams = new URLSearchParams(newAttrs.search);
  const query = [];

  queryParams.forEach((value, key) => {
    query.push({
      key: key,
      value: value.toString(),
    });
  });

  const builtUrlJSON = {};
  builtUrlJSON["raw"] = Url;
  builtUrlJSON["protocol"] = protocol;
  builtUrlJSON["host"] = host;
  builtUrlJSON["path"] = path;
  builtUrlJSON["query"] = query;

  return builtUrlJSON;
};

const setApiMethod = (requestJson, method_name) => {
  if (!allowedApiMethods.includes(method_name.toLowerCase())) {
    throw new Error(`Invalid API method "${method_name}"`);
  } else {
    requestJson.method = method_name.toUpperCase();
  }
};

const setHeaderAttr = (requestJson, headers) => {
  Object.keys(headers).forEach((headerKey) =>
    requestJson.header.push({
      key: headerKey,
      value: headers[headerKey],
      type: "text",
    })
  );
};

const setApiUrl = (requestJson, inputUrl) => {
  requestJson.url = buildUrlObject(inputUrl);
};

const clearTestForAssertion = (collectionItem) => {
  delete collectionItem.event;
};

const setStatusCodesForAssertionPurposes = (
  eventArray,
  apiStatusCode = 400
) => {
  const stringToMatch = "API Response code check";
  const testEvents = eventArray.filter(
    (eventObject) =>
      eventObject.listen == "test" &&
      eventObject.script.exec.some((scriptEventLine) =>
        scriptEventLine.includes(stringToMatch)
      )
  );
  testEvents.forEach((testEvent) => {
    for (let i = 0; i < testEvent.script.exec.length; i++) {
      if (testEvent.script.exec[i].indexOf("api_status_code") !== -1) {
        testEvent.script.exec[i] = testEvent.script.exec[i].replace(
          "api_status_code",
          apiStatusCode
        );
      }
    }
  });
};

const setApiBody = (requestJson, body) => {
  requestJson.body.raw = JSON.stringify(body);
};

const triggerSmartApi = (data, runTestsToAssertCode = true) => {
  let inputConfig = data;
  const collection = JSON.parse(
    fs.readFileSync("./server/outline/sample-collection.json", "utf8")
  );

  collectionItemToBePushed = JSON.parse(JSON.stringify(sample_payload));

  setApiMethod(collectionItemToBePushed.request, inputConfig.method);
  setHeaderAttr(collectionItemToBePushed.request, inputConfig.headers);
  setApiUrl(collectionItemToBePushed.request, inputConfig.url);
  clearTestForAssertion(collectionItemToBePushed);
  collection.item.push(collectionItemToBePushed);

  inputConfig.output &&
    inputConfig.output.length > 0 &&
    inputConfig.output.forEach((bodyElement) => {
      collectionItemToBePushed = JSON.parse(JSON.stringify(sample_payload));
      setApiItemName(collectionItemToBePushed, bodyElement);
      setApiMethod(collectionItemToBePushed.request, inputConfig.method);
      setHeaderAttr(collectionItemToBePushed.request, inputConfig.headers);
      setApiUrl(collectionItemToBePushed.request, inputConfig.url);
      setApiBody(collectionItemToBePushed.request, bodyElement["entity"]);

      runTestsToAssertCode
        ? setStatusCodesForAssertionPurposes(
            collectionItemToBePushed.event,
            bodyElement.statusCode
          )
        : clearTestForAssertion(collectionItemToBePushed);

      collection.item.push(collectionItemToBePushed);
    });

  inputConfig.queryParamsOutput &&
    inputConfig.queryParamsOutput.length > 0 &&
    inputConfig.queryParamsOutput.forEach((queryParamsUrl) => {
      collectionItemToBePushed = JSON.parse(JSON.stringify(sample_payload));
      setApiItemName(collectionItemToBePushed, queryParamsUrl);
      setApiMethod(collectionItemToBePushed.request, inputConfig.method);
      setHeaderAttr(collectionItemToBePushed.request, inputConfig.headers);
      setApiUrl(collectionItemToBePushed.request, queryParamsUrl["entity"]);
      setApiBody(collectionItemToBePushed.request, inputConfig.positive);

      runTestsToAssertCode
        ? setStatusCodesForAssertionPurposes(
            collectionItemToBePushed.event,
            queryParamsUrl.statusCode
          )
        : clearTestForAssertion(collectionItemToBePushed);

      collection.item.push(collectionItemToBePushed);
    });

  newman.run({
    collection: collection,
    reporters: ["cli", "htmlextra"],
    environment: environment,
    reporter: {
      htmlextra: {
        export: "server/result/output.html",
        title: "Smart API Test Run Report",
        browserTitle: "Smart API Test Run Report",
      },
    },
  });
};

module.exports = { triggerSmartApi };
