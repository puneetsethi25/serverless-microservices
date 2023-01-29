const serverless = require("serverless-http");
const express = require("express");
const app = express();

const middleware = function (req, res, next) {
  const { orgId } = req.params;
  if (!orgId || orgId == 0) {
    return res.status(400).json({
      status: "failure",
      message: "Organisation ID missing or invalid"
    })
  } else {
    next()
  }
}

app.get("/organisation/:orgId/reservation", middleware, (req, res, next) => {
  return res.status(200).json({
    status: "success",
    result: [
      {
        organisation_id: 1,
        title: "Curaconnect Inc",
        status: "CONFIRMED",
        amount: 231.00,
        created_data: '20-13-2022T12:15:25IST',
        updated_data: '20-13-2022T12:15:25IST'
      },
      {
        organisation_id: 1,
        title: "CMC and Hospital",
        status: "CANCELED",
        amount: 431.00,
        created_data: '20-13-2022T12:15:25IST',
        updated_data: '20-13-2022T12:15:25IST'
      },
      {
        organisation_id: 1,
        title: "Fortis Hospital",
        status: "PENDING",
        amount: 2101.00,
        created_data: '20-13-2022T12:15:25IST',
        updated_data: '20-13-2022T12:15:25IST'
      },
    ],
  });
});

app.post("/organisation/:orgId/reservation/make", middleware, (req, res, next) => {
  return res.status(200).json({
    status: "success",
    message: `resrvation CONFIRMED at organisation: ${orgId}`,
  });
});

app.post("/organisation/:orgId/reservation/cancel", middleware, (req, res, next) => {
  return res.status(200).json({
    status: "success",
    message: `resrvation CANCELED at organisation: ${orgId}`,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
