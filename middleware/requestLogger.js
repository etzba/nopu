const morgan = require("morgan");

morgan.token("type", function (req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});
morgan.token("body", (req, res) => JSON.stringify(req.body));

module.exports = morgan;