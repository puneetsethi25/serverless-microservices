const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    service: "auth-management-dev-api",
    message: "Response from GET path /"
  });
});

app.get("/getUser", (req, res, next) => {
  return res.status(200).json({
    service: "auth-management-dev-api",
    message: "Response from GET path /getUser"
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
