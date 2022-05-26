var fs = require("fs");
var path = require("path");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/middleware");
const User = require("../models/user_model");

// Getting Register Page
router.get("/", (Req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", upload.single("image"), (req, res) => {
  var obj = {
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    mobileNumber: req.body.phoneNumber,
    fathersName: req.body.userFathersName,
    rollNumber: req.body.userrollNumber,
    password: req.body.password,
    gender: req.body.gender,
    img: {
      data: fs.readFileSync(
        path.join(__dirname, "..", "FaceRecognitionProject","ImageStudents", req.file.filename)
      ),
      contentType: "image/png",
    },
  };

  User.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect('/');
      // res.send("Successs");
    }
  });
  console.log(obj);
});

router.get('/facescan', (req, res) => {

  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['FaceRecognitionProject/tester.py/admitCard.py']);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
})


module.exports = router;
