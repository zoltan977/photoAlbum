const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.put(
  "/title",
  [
    auth,
    check("newTitle", "Nincs megadva új cím!").exists(),
    check("title", "Nincs megadva album cím!").exists(),
  ],
  Controller("album", "titleChange")
);

router.delete(
  "/:title",
  [auth, check("title", "Hiányzik az album címe!")],
  Controller("album", "deleteAlbum")
);

router.get("/albums", [auth], Controller("album", "albums"));

module.exports = router;
