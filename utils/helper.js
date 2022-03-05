const path = require("path");
const multer = require("multer");

exports.generateOTP = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.multerUpload = multer({
  storage: multerStorage,
  fileFilter: function (req, file, callback) {
    console.log("profile-file", file);
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      callback(null, false);
      return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
    callback(null, true);
  },
});
