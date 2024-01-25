const runner = require("./newman-runner.js");
const express = require("express");
const http = require("http");
// const WebSocket = require("ws");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const FileExport = require("./src/fileExport");

const app = express();
const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/api/file", async (req, res) => {
  const filePath = path.join(__dirname, "./result", "output.html");
  fs.unlinkSync(filePath);
  try {
    const data = req.body;
    await FileExport.FileExport(data);
    runner.triggerSmartApi(data, (runTestsToAssertCode = true));
  } catch {
    fs.writeFileSync(
      "./server/result/output.html",
      `<!DOCTYPE html><html><body><p>Error while running the API. Please check your API URL, authorization, and headers.</p></body></html>`
    );
  }

  // console.log(data);
  // Send a message to the WebSocket client
  // wss.clients.forEach((client) => {
  //   if (client.readyState === WebSocket.OPEN) {
  //     client.send("result created");
  //   }
  // });
  res.json("file.created");
});

app.get("/checkFile", function (req, res) {
  const filePath = path.join(__dirname, "./result", "output.html");

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.json("file doesnot exist");
    } else {
      res.json(`File exists`);
    }
  });
});

app.get("/download", function (req, res) {
  const filePath = path.join(__dirname, "./result", "output.html");
  res.sendFile(filePath);
});

// wss.on("connection", (ws) => {
//   // console.log("WebSocket connection established.");

//   // Handle WebSocket errors
//   ws.on("error", (error) => {
//     console.error(`WebSocket error: ${error}`);
//   });

//   // Handle WebSocket disconnections
//   ws.on("close", () => {
//     console.log("WebSocket disconnected.");
//   });
// });

const PORT = process.env.PORT || 3080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
