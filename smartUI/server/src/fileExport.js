var fs = require("fs/promises");

var FileExport = async function (data) {
  await fs.writeFile("./server/output.json", JSON.stringify(data, null, 2));
  return;
};

module.exports = { FileExport };
