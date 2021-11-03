const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./config/database"); // Init DB
require("express-async-errors"); // For globally error handling

const route = require("./route");
const {
  httpCodes,
  messages
} = require("./config/constants");

// Body Parser
app.use(bodyParser.urlencoded({
  limit: "5gb",
  extended: true
}));
app.use(bodyParser.json({
  limit: "5gb"
}));

// Main Route
app.use("/", route);

// Server is starts from here
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

// Http request & Header 
app.all("/*", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers,authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  return res.status(httpCodes.notFound).json({
    message: messages.urlNotFound
  });
});

app.use((error, req, res, next) => {
  if (error) {
    return res.status(httpCodes.internalError).json({
      error: messages.internalError
    });
  }
  next();
});