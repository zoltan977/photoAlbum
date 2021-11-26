const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const auth = require("../middleware/auth");
const { check, body } = require("express-validator");
const uploadPhotoValidator = require("./validators/uploadPhotoValidator");

router.post(
  "/",
  [auth, body("title").custom(uploadPhotoValidator)],
  Controller("photo", "upload")
);

router.put(
  "/title",
  [
    auth,
    check("newTitle", "Nincs megadva új cím!").exists(),
    check("albumTitle", "Nincs megadva album cím!").exists(),
    check("path", "Nincs megadva kép cím!").exists(),
  ],
  Controller("photo", "titleChange")
);

router.delete(
  "/:albumTitle/:path",
  [
    auth,
    check("albumTitle", "Nincs megadva album!"),
    check("path", "Nincs megadva fotó!"),
  ],
  Controller("photo", "deletePhoto")
);

router.post(
  "/category",
  [
    auth,
    check("category", "Nincs megadva kategória!"),
    check("path", "Nincs megadva fotó!"),
  ],
  Controller("photo", "addCategory")
);

router.delete(
  "/category/:albumTitle/:path/:category",
  [
    auth,
    check("albumTitle", "Nincs megadva album!"),
    check("path", "Nincs megadva fotó!"),
    check("category", "Nincs megadva kategória!"),
  ],
  Controller("photo", "removeCategory")
);

router.get("/categories", [auth], Controller("photo", "categories"));

module.exports = router;
