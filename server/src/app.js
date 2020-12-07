const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const api = require("./api");
const { appconfig } = require("./config");
const { getOrigUrl } = require("./api/controllers/shorturl");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../../", "build")));
app.get("/:keyword", getOrigUrl);
app.use("/api/v1", api);
app.get("*", function (req, res) {
  res.redirect("/")   
});
app.listen(appconfig.PORT, () => {
  console.log(`App listening at ${appconfig.HOST}:${appconfig.PORT}`);
});
