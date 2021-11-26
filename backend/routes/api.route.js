const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const { check, body } = require("express-validator");
const uploadPhotoValidator = require("./validators/uploadPhotoValidator");

router.post(
  "/google",
  [check("code", "Hiányzik a kód").not().isEmpty()],
  UserController.userAccount("google")
);

router.post(
  "/upload_photo",
  [auth, body("title").custom(uploadPhotoValidator)],
  UserController.userAccount("upload")
);

router.post("/title_change", [auth], UserController.userAccount("titleChange"));

router.post("/delete_photo", [auth], UserController.userAccount("deletePhoto"));

router.get("/albums", [auth], UserController.userAccount("albums"));

router.get("/loaduser", [auth], UserController.loadUser);

module.exports = router;
