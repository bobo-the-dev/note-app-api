require("./server/config/config");
require("./server/db/sequelize");
require("./server/db/sequelize-bootstrap");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
app.use(helmet());
// Extract HTTP body data to req.body
app.use(bodyParser.json());
// Allow cross origin
app.use(
  cors({
    credentials: true,
    origin: true,
    exposedHeaders: ["x-auth"],
  })
);

app.use("/api", require("./server/routes"));

app.get("/health", async (req, res) => {
  res.status(200).send("ok");
});

app.get("/*", async (req, res) => {
  res.status(404).send();
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

module.exports = {
  app,
};
