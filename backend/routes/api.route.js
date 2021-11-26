const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/google",
  [check("code", "Hiányzik a kód").not().isEmpty()],
  UserController.userAccount("google")
);

router.get("/loaduser", [auth], UserController.loadUser);

module.exports = router;
