const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  usersOrders: [
    {
      name: String,
      price: Number,
      order: [
        {
          name: String,
          price: Number,
          quantety: Number,
        },
      ],
    },
  ],
});
module.exports = mongoose.model("Order", orderSchema);
