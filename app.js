var mongoose = require("mongoose");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require("dotenv/config");

app.set("view engine", "ejs");

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("connected");
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const router = require("./routes/route");
app.use("/", router);

var port = process.env.port || "3000";
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server listening on port", port);
});
