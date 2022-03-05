const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const OTP = require("../models/otp.model");

const Helpers = require("../utils/helper");


exports.getAllUsers = async function (req, res) {
  try {
    let users = await User.find({});
    console.log(users);
    res.status(200).json({ userList: users });
  } catch (err) {}
};

exports.generateOtp = function (req, res) {
  const generatedOtp = Helpers.generateOTP();
  let otpObject = {
    identifier: req.body.email,
    value: generatedOtp,
  };
  var new_otp = new OTP(otpObject);
  OTP.find({ identifier: req.body.email }, (err, docs) => {
    if (docs.length > 0) {
      res.status(400).send({
        message: "OTP Already Sent!",
      });
    } else {
      new_otp.save(function (err, task) {
        if (err) {
          res.send(err);
        }
        res.json({ status: "200", message: "Otp Send Successfully" });
      });
    }
  });
};

exports.verifyOtp = async (req, res) => {
  let otp = await OTP.findOne({
    value: req.body.code,
    identifier: req.body.email,
  });
  let user = await User.findOne({ email: req.body.email });
  if(!otp) return res.status(400).send({ message: "OTP Invalid" });

  if (user) {
    const token = jwt.sign({ email: user.email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    // user
    return res.status(200).json({ email: user.email, token });
  } else {
    const new_user = new User({ email: req.body.email });
    const token = jwt.sign({ email: req.body.email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    new_user.save(function (err, user) {
      if (err) {
        return res.status(400).json({ message: "User Registration Failed" });
      }
      return res.status(200).json({ message: "User Register Successfully" });
    });
  }
};


exports.setRole = async (req, res) => {
    const { email, role } = req.body;
    let user = await User.findOne({ email: email }) 
    if(!user) return res.status(400).send({message: "User Not Found"})
    user.roles = role;
    console.log(role)
    user.save().then((data) => {
        console.log(data)
        res.status(200).send({ message: "User Role Updated" });
    }).catch((error) => {
        res.status(500).send({ message: error.message });
    })
}

exports.getUser = async (req, res) => {
    const { email, role } = req.body;
    console.log("REQ", req.user)
    res.send("Working")
    // let user = await User.findOne({ email: email }) 
    // if(!user) return res.status(400).send({message: "User Not Found"})
    // user.roles = role;
    // console.log(role)
    // user.save().then((data) => {
    //     console.log(data)
    //     res.status(200).send({ message: "User Role Updated" });
    // }).catch((error) => {
    //     res.status(500).send({ message: error.message });
    // })
}