const asyncHandler = require("express-async-handler");
const UserService = require("../services/user.service");
const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.userAccount = (service) =>
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const files = req?.files;

    const result = await UserService[service](
      req.body,
      res?.locals?.user,
      files
    );

    return res.json(result);
  });

exports.loadUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: res.locals.user.email });
  if (!user) return res.status(400).json({ msg: "Nincs ilyen felhasználó" });
  else
    return res.json({ name: user.name, photo: user.photo, email: user.email });
});
