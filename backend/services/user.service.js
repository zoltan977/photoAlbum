const User = require("../models/User");
const createToken = require("../utils/createToken");
const jwt = require("jsonwebtoken");
const httpClient = require("axios");

exports.loadUser = async (params, postedData, currentUser) => {
  const user = await User.findOne({ email: currentUser.email });

  if (!user) throw { status: 400, msg: "Nincs ilyen felhasználó" };
  else return { name: user.name, photo: user.photo, email: user.email };
};

exports.google = async (params, postedData) => {
  const { code } = postedData;

  let response;
  try {
    response = await httpClient.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: process.env.GRANT_TYPE,
    });
  } catch (error) {
    console.log("error getting token!", error);
    throw { status: 400, msg: "Hiba a token kéréskor!" };
  }

  const data = response.data;

  const {
    email_verified,
    email,
    name,
    picture: photo,
  } = jwt.decode(data.id_token);

  if (!email_verified)
    throw { status: 400, msg: "Email not verified at google!" };

  let user = await User.findOne({ email: email });

  //If the user exists already then the google image will be added to it
  //else new user will be created
  if (user) {
    if (!user.photo || user.photo === "no-image.png") {
      user.photo = photo;
      await user.save();
    }
  } else {
    const newUser = new User({ email, name, photo });
    user = await newUser.save();
  }

  const token = createToken(user);

  return { token };
};
