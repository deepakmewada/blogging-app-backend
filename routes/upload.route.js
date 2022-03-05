const express = require("express");

const imageController = require("../controllers/image.controller");
const router = express.Router();

const Helpers = require("../utils/helper");

router.get("/view", express.static("./../uploads"));
router.post(
  "/add",
  Helpers.multerUpload.single("file-upload"),
  imageController.upload
);

module.exports = router;
