const User = require("../models/User");
const settings = require("../settings");
const uploadPath = settings.PROJECT_DIR + "/public/photos/";
const fs = require("fs");

exports.titleChange = async (params, postedData, user) => {
  const currentUser = await User.findOne({ email: user.email });

  const album = await currentUser?.albums?.find(
    (a) => a.title === postedData.title
  );

  if (!album) throw { status: 400, msg: "Nincs ilyen album!" };

  album.title = postedData.newTitle;

  try {
    await currentUser.save();
  } catch (error) {
    throw { status: 400, msg: "Hiba a mentéskor!" };
  }

  return { success: true };
};

exports.deleteAlbum = async (params, postedData, user) => {
  const currentUser = await User.findOne({ email: user.email });

  const albums = await currentUser?.albums;
  if (!albums) throw { status: 400, msg: "Nincsenek albumok!" };

  const albumIndex = await currentUser?.albums?.findIndex(
    (a) => a.title === params.title
  );

  if (albumIndex === -1) throw { status: 400, msg: "Nincs ilyen album!" };

  const album = currentUser.albums[albumIndex];

  try {
    currentUser.albums.splice(albumIndex, 1);
    await currentUser.save();

    for (const photo of album.photos) {
      fs.unlinkSync(uploadPath + photo.path);
    }
  } catch (error) {
    throw { status: 400, msg: "Fájl törlési hiba!" };
  }

  return { success: true };
};

exports.albums = async (params, postedData, user) => {
  const currentUser = await User.findOne({ email: user.email });

  const albums = currentUser?.albums;

  return albums ? albums : [];
};
