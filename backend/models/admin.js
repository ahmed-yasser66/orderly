const mongoose = require("mongoose");
const menu = require("./menu");

const admin = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  favoriteMenus: [menu],
});
