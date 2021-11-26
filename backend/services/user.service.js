const User = require("../models/User");
const createToken = require("../utils/createToken");
const jwt = require("jsonwebtoken");
const httpClient = require("axios");
const settings = require("../settings");
const uuid = require("uuid");
const uploadPath = settings.PROJECT_DIR + "/public/photos/";

exports.titleChange = async (postedData, user) => {
  const currentUser = await User.findOne({ email: user.email });
  console.log("currentUser:", currentUser);
  console.log("posted data:", postedData);

  const album = await currentUser?.albums?.find(
    (a) => a.title === postedData.albumTitle
  );
  console.log("album:", album);

  if (!album) throw { status: 400, msg: "Nincs ilyen album!" };

  const photo = await album?.photos?.find((p) => p.path === postedData.path);
  console.log("photo:", photo);

  if (!photo) throw { status: 400, msg: "Nincs ilyen fotó!" };

  photo.title = postedData.newTitle;

  try {
    await currentUser.save();
  } catch (error) {
    throw { status: 400, msg: "Hiba a mentéskor!" };
  }

  return { success: true };
};

exports.albums = async (postedData, user) => {
  const currentUser = await User.findOne({ email: user.email });
  console.log("currentUser:", currentUser);

  const albums = currentUser?.albums;

  return albums ? albums : [];
};

exports.upload = async (postedData, user, files) => {
  console.log("files:", files.photo);
  console.log("postedData:", postedData);

  if (!files.photo.length) files.photo = [files.photo];

  const photos = files.photo.map((f) => {
    const uuidv4 = uuid.v4();
    const path = uploadPath + uuidv4;

    try {
      f.mv(path);
    } catch (error) {
      throw { msg: "Image saving error", status: 400 };
    }

    return {
      title: f.name,
      path: uuidv4,
      size: f.size,
      date: new Date(),
    };
  });

  const userToUpdate = await User.findOne({ email: user.email });
  console.log("userToUpdate:", userToUpdate);

  const album = await userToUpdate?.albums?.find(
    (a) => a.title === postedData.title
  );
  console.log("album:", album);

  if (album) album.photos.push(...photos);
  else {
    const newAlbum = {
      title: postedData.title,
      date: new Date(),
      photos: photos,
    };

    userToUpdate.albums
      ? userToUpdate.albums.push(newAlbum)
      : (userToUpdate.albums = [newAlbum]);
  }

  await userToUpdate.save();

  return { success: true };
};

exports.google = async (postedData) => {
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
