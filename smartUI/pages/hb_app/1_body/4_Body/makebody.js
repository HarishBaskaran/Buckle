import ReplacerExport from "./replacer";
import {
  customOptions,
  customOptionsConfig,
  dataTypeOptions,
  options,
} from "../data/options_schema";
import { options as multiOptions } from "../data/multi_options_schema";
import { JSONPath } from "jsonpath-plus";

class makeTestBody {
  testBodyMaker(instance, parsedData) {
    let myArray = [];

    var jsonPaths = JSON.parse(parsedData).jsonPaths;
    jsonPaths.forEach((element) => {
      let myObject = {};
      myObject["id"] = element;
      myObject["name"] = element;
      myObject["selected"] = false;
      myObject["dataType"] = dataTypeOptions;
      myObject["custom"] = customOptions;
      myObject["config"] = customOptionsConfig;
      myArray.push(myObject);
    });

    return myArray;
  }
}

class makeMultiTestBody {
  testBodyMaker(instance, parsedData) {
    let myArray = [];

    var jsonPaths = JSON.parse(parsedData).jsonPaths;
    jsonPaths.forEach((element) => {
      let myObject = {};
      myObject["id"] = element;
      myObject["name"] = element;
      myObject["selected"] = false;
      var array = [];
      array.push(multiOptions);
      myObject["options"] = array;
      array = [];
      array.push(customOptionsConfig);
      myObject["config"] = array;
      myArray.push(myObject);
    });

    return myArray;
  }
}

class makeBody {
  pmBodyMaker(instance, parsedData) {
    var jsonPaths = JSON.parse(parsedData).jsonPaths;
    jsonPaths.forEach((element) => {
      var path = "";
      if (element.charAt(0) === "$" && element.charAt(1) === ".")
        path = element.substring(2);
      else path = element.substring(1);
      let value = path.replace("[", "");
      value = value.replace("]", "");
      value = value.replace(".", "__");
      value = value.replace(/'/g, "__");
      instance = ReplacerExport(instance, String(path), `{{${value}}}`);
    });

    return JSON.parse(instance);
  }
}

var environment = [];
var summary = {};

class jsonPathValidator {
  validate(data, parsedData) {
    if (typeof parsedData === "string") {
      parsedData = JSON.parse(parsedData);
    }

    var jsonPaths = parsedData.index;
    data = JSON.parse(data);
    var validPaths = [];

    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    jsonPaths.forEach((path) => {
      if (path.charAt(0) === "[") path = "$".concat(path);
      else path = "$.".concat(path);
      try {
        var result = JSONPath({ path: path, json: data });
      } catch (err) {
        console.log(err);
      }
      if (typeof result[0] !== "object") {
        validPaths.push(path);
        let object = {
          fieldName: "",
          fieldType: "",
          oldFieldValue: "",
          newFieldValue: "",
          optionalField: false,
          uniqueField: false,
          status: 400,
          response: {},
        };
        object.fieldName = path;
        let value = result[0];
        object.fieldType = typeof value;
        object.oldFieldValue = value;
        environment.push(object);

        summary[path] = value;
      }
    });

    return validPaths;
  }
}

class parser {
  isArray(input) {
    return Object.prototype.toString.call(input) === "[object Array]";
  }

  each(input, iterator, context) {
    var key, len;
    if (this.isArray(input)) {
      for (key = 0, len = input.length; key < len; key++) {
        iterator.apply(context, [key, input[key], input]);
      }
      return;
    }
    for (key in input) {
      if (input.hasOwnProperty(key)) {
        iterator.apply(context, [key, input[key], input]);
      }
    }
  }

  Parser(instance) {
    var validInstance = ["string", "object"].indexOf(typeof instance) !== -1;

    if (!validInstance) {
      return;
    }

    if (typeof instance === "string") {
      this.instance = JSON.parse(instance);
      this.json = true;
    } else {
      this.instance = instance;
    }

    this.createIndex(this.instance);

    this.jsonPaths = new jsonPathValidator().validate(
      instance,
      JSON.stringify(this)
    );

    this.environment = environment;
    environment = [];

    this.summary = summary;
    summary = {};

    this.body = new makeBody().pmBodyMaker(instance, JSON.stringify(this));

    this.testData = new makeTestBody().testBodyMaker(
      instance,
      JSON.stringify(this)
    );

    this.multiTestData = new makeMultiTestBody().testBodyMaker(
      instance,
      JSON.stringify(this)
    );

    return this;
  }

  createIndex(instance, path) {
    var self = this;

    this.index = this.index || [];

    path = path || "";

    this.each(instance, function (key, value) {
      var currentPath;

      key = key + "";

      if (key.match(/^[a-zA-Z]+$/)) {
        currentPath = path ? path + "." + key : key;
      } else if (key.match(/^[0-9]*$/)) {
        currentPath = path + "[" + key + "]";
      } else if (key.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
        currentPath = path + "['" + key + "']";
      } else {
        currentPath = path + "." + key;
      }

      self.index.push(currentPath);

      if (typeof value === "object") {
        self.createIndex(value, currentPath);
      }
    });
  }
}

const MakerExport = function (props) {
  const { instance } = props;
  const parsed = new parser().Parser(instance);
  return parsed;
};

export default MakerExport;
