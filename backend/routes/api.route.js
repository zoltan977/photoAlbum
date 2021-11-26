const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const { check, body } = require("express-validator");

router.post(
  "/google",
  [check("code", "Hiányzik a kód").not().isEmpty()],
  UserController.userAccount("google")
);

router.post("/upload_photo", [auth], UserController.userAccount("upload"));

router.get("/albums", [auth], UserController.userAccount("albums"));

router.get("/loaduser", [auth], UserController.loadUser);

module.exports = router;
