var express = require("express");
var path = require("path");

require("dotenv/config");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "images");
    cb(null,path.join(__dirname, "..", "FaceRecognitionProject","ImageStudents"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
