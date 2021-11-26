const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.delete(
  "/album/:title",
  [auth, check("title", "Hiányzik az album címe!")],
  Controller("album", "deleteAlbum")
);

router.get("/albums", [auth], Controller("album", "albums"));

module.exports = router;
