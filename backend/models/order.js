const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  usersOrders: [
    {
      name: String,
      price: Number,
      order: [
        {
          id: String,
          quantety: Number,
        },
      ],
    },
  ],
});
// export default mongoose.model("Order", orderSchema);
module.exports = mongoose.model("Order", orderSchema);
