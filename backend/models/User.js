const mongoose = require("mongoose");

const PhotoSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const AlbumSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  photos: {
    type: [PhotoSchema],
  },
});

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    default: "no-image.png",
  },
  albums: {
    type: [AlbumSchema],
  },
});

module.exports = mongoose.model("user", UserSchema);
