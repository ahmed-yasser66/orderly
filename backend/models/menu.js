const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
  menubar: [
    {
      name: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Menu", menuSchema);
