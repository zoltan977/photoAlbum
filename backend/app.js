require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/public"));

app.use("/api/user", require("./routes/user.route"));
app.use("/api/photo", require("./routes/photo.route"));
app.use("/api/album", require("./routes/album.route"));
app.get("/api/test", (req, res) => {
  return res.json({ msg: "testing" });
});
app.use(require("./middleware/errorHandler"));

module.exports = app;
