const User = require("../models/User");
const Category = require("../models/Category");
const settings = require("../settings");
const uuid = require("uuid");
const uploadPath = settings.PROJECT_DIR + "/public/photos/";
const fs = require("fs");

exports.removeCategory = async (params, postedData, user) => {
  const currentUser = await User.findOne({ email: user.email });

  const album = await currentUser?.albums?.find(
    (a) => a.title === params.albumTitle
  );

  if (!album) throw { status: 400, msg: "Nincs ilyen album!" };

  const photo = await album?.photos?.find((p) => p.path === params.path);

  if (!photo) throw { status: 400, msg: "Nincs ilyen fotó!" };

  const categoryIndex = photo.categories.indexOf(params.category);

  if (categoryIndex !== -1) photo.categories.splice(categoryIndex, 1);

  try {
    await currentUser.save();
  } catch (error) {
    throw { status: 400, msg: "Hiba a kategória törlésnél!" };
  }

  return { success: true };
};

exports.addCategory = async (params, postedData, user) => {
  const currentUser = await User.findOne({ email: user.email });

  const album = await currentUser?.albums?.find(
    (a) => a.title === postedData.albumTitle
  );

  if (!album) throw { status: 400, msg: "Nincs ilyen album!" };

  const photo = await album?.photos?.find((p) => p.path === postedData.path);

  if (!photo) throw { status: 400, msg: "Nincs ilyen fotó!" };

  photo.categories.push(postedData.category);

  try {
    await currentUser.save();
  } catch (error) {
    throw { status: 400, msg: "Hiba a kategória hozzáadásánál!" };
  }

  return { success: true };
};

exports.categories = async () => {
  return await Category.find();
};

exports.deletePhoto = async (params, postedData, user) => {
  const currentUser = await User.findOne({ email: user.email });

  const album = await currentUser?.albums?.find(
    (a) => a.title === params.albumTitle
  );

  if (!album) throw { status: 400, msg: "Nincs ilyen album!" };

  const photo = await album?.photos?.find((p) => p.path === params.path);

  if (!photo) throw { status: 400, msg: "Nincs ilyen fotó!" };

  try {
    const index = await album.photos.findIndex((p) => p.path === params.path);
    album.photos.splice(index, 1);
    await currentUser.save();

    fs.unlinkSync(uploadPath + photo.path);
  } catch (error) {
    throw { status: 400, msg: "Fájl törlési hiba!" };
  }

  return { success: true };
};

exports.titleChange = async (params, postedData, user) => {
  const currentUser = await User.findOne({ email: user.email });

  const album = await currentUser?.albums?.find(
    (a) => a.title === postedData.albumTitle
  );

  if (!album) throw { status: 400, msg: "Nincs ilyen album!" };

  const photo = await album?.photos?.find((p) => p.path === postedData.path);

  if (!photo) throw { status: 400, msg: "Nincs ilyen fotó!" };

  photo.title = postedData.newTitle;

  try {
    await currentUser.save();
  } catch (error) {
    throw { status: 400, msg: "Hiba a mentéskor!" };
  }

  return { success: true };
};

exports.upload = async (params, postedData, user, files) => {
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

  const album = await userToUpdate?.albums?.find(
    (a) => a.title === postedData.title
  );

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
