const mongoose = require("mongoose");
const orderModel = require("../models/order");
function getOrder(req, res) {
  let id = req.params.id;
  orderModel.findById(id).then((order) => {
    console.log(order);
    res.send(order);
  });
}

function addtoOrder(req, res) {
  let id = req.params.id;
  let toAddOrder = req.body.order;
  orderModel.findById(id).then((order) => {
    order.usersOrders.push({
      name: toAddOrder.name,
      price: toAddOrder.price,
      order: toAddOrder.order,
    });
    console.log(order);
    res.send(order);
  });
}

module.exports = { getOrder, addtoOrder };
