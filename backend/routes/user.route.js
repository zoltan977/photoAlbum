const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/google",
  [check("code", "Hiányzik a kód").not().isEmpty()],
  Controller("user", "google")
);

router.get("/loaduser", [auth], Controller("user", "loadUser"));

module.exports = router;
