class replacer {
  /**
   * IsRegExx
   *
   * @param {object} input
   */
  isRegEx(input) {
    return input && input.test && input.exec;
  }

  /**
   * IsArray
   *
   * @param {object} input
   */
  isArray(input) {
    return Object.prototype.toString.call(input) === "[object Array]";
  }

  /**
   * IsObject
   *
   * @param {object} input
   */
  isObject(input) {
    return Object.prototype.toString.call(input) === "[object Object]";
  }

  /**
   * IsEqualArray
   *
   * @param {object} arr1
   * @param {object} arr2
   */
  isEqualArray(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every(function (value, index, context) {
      return arr2[index] === value;
    });
  }

  /**
   * Each
   *
   * @param {object} input
   * @param {function} iterator
   * @param {object} context
   */
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

  /**
   * ParseNotation
   *
   * @param {string} notation
   */
  parseNotation(notation) {
    var chunks = [];
    var openBracket = false;
    var i = 0;
    var len = notation.length;
    var tempChunk = "";

    var addChunk = function () {
      if (tempChunk) {
        chunks.push(tempChunk);
        tempChunk = "";
      }
    };

    for (; i < len; i++) {
      if (notation[i].match(/\[|\]/)) {
        addChunk();
        if (notation[i] === "]") {
          openBracket = false;
        } else {
          openBracket = true;
        }
      } else if (notation[i] !== '"' && notation[i] !== "'") {
        if (notation[i] === "." && !openBracket) {
          addChunk();
        } else {
          tempChunk += notation[i];
        }
      }
      if (i === len - 1) {
        addChunk();
      }
    }

    return chunks;
  }

  /**
   * Replacer
   *
   * @constructor
   * @param {string|object} instance
   * @param {string|regexp} pattern
   * @param {string|function} replacement
   */
  Replacer(instance, pattern, replacement, type) {
    // Checks input arguments. An instance must be a string or an object, a pattern
    // must be a string or a regular expression, a replacement must
    // be a string, an object or a function.

    var validInstance = ["string", "object"].indexOf(typeof instance) !== -1;
    var validPattern = typeof pattern === "string" || this.isRegEx(pattern);
    var validReplacement =
      ["string", "object", "function"].indexOf(typeof replacement) !== -1;

    // If any of the arguments is not valid, returns undefined
    if (!validInstance || !validPattern || !validReplacement) {
      return;
    }

    if (typeof instance === "string") {
      this.instance = JSON.parse(instance);
      this.json = true;
    } else {
      this.instance = instance;
    }

    this.pattern =
      typeof pattern === "string" ? pattern.replace(/'/g, '"') : pattern;
    this.replacement = replacement;
    this.type = type;

    this.createIndex(this.instance);

    return this.replace(this.pattern, this.replacement, this.type);
  }

  /**
   * CreateIndex
   *
   * @param {string} path
   */
  createIndex(instance, path) {
    // Save a reference to the ‘this’
    var self = this;

    this.index = this.index || [];

    path = path || "";

    this.each(instance, function (key, value) {
      var currentPath;

      // Make sure the key is a string
      key = key + "";

      // If the key doesn't contain any spaces, use a dot notation. If
      // the key is a number, use a square bracket notation (e.g. [2]).
      // In other cases just use s square bracket notation.
      if (key.match(/^[a-zA-Z]+$/)) {
        currentPath = path ? path + "." + key : key;
      } else if (key.match(/\d+/)) {
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

  /**
   * Replace
   *
   */
  replace(pattern, replacement, type) {
    var self = this;

    this.each(this.index, function (key, value) {
      // If the pattern is a regular expression and matches the key

      if (self.isRegEx(self.pattern) && value.match(self.pattern)) {
        return self.replaceValue(value);
      }

      // If the pattern is a string and matches the key
      if (typeof self.pattern === "string") {
        var valueTree = self.parseNotation(value);
        var patternTree = self.parseNotation(self.pattern);

        if (self.isEqualArray(valueTree, patternTree)) {
          return self.replaceValue(value);
        }
      }
    });

    // Returns a new JavaScript object (or JSON)
    return self.instance;
  }

  /**
   * Replace
   *
   * @param {string} path
   */
  replaceValue(path) {
    var self = this;

    var tree = this.parseNotation(path);

    tree.reduce(function (previousValue, currentValue, index) {
      if (index === tree.length - 1) {
        var replacement;
        if (typeof self.replacement === "function") {
          replacement = self.replacement(
            path,
            currentValue,
            previousValue[currentValue]
          );
        } else {
          replacement = self.replacement;
        }

        switch (self.type) {
          case "integer":
            previousValue[currentValue] = parseInt(replacement);
            break;
          case "float":
            previousValue[currentValue] = parseFloat(replacement);
            break;
          case "null":
            previousValue[currentValue] = null;
            break;
          case "empty":
            previousValue[currentValue] = undefined;
            break;
          default:
            previousValue[currentValue] = replacement;
        }

        return;
      }

      return previousValue[currentValue];
    }, this.instance);
  }

  /**
   * Replace
   *
   * @param {string|object} instance
   * @param {string|regexp} pattern
   * @param {string|function} replacement
   * @param {function} callback
   */
  ReplacerExport(instance, pattern, replacement, type, callback) {
    var Instance = new replacer();
    var output = Instance.Replacer(instance, pattern, replacement, type);
    return typeof callback === "function" ? callback(null, output) : output;
  }
}

const ReplacerExport = function (
  instance,
  pattern,
  replacement,
  type,
  callback
) {
  const parsed = new replacer().ReplacerExport(
    instance,
    pattern,
    replacement,
    type,
    callback
  );
  return JSON.stringify(parsed, null, 2);
};

export default ReplacerExport;
