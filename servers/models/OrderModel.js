const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  avilable: { type: Boolean, required: true },
  _id: { type: String, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  data: { type: Date, required: true },
  total: { type: Number, required: true },
  size: { type: String, required: true },
});

const AddressSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, required: true },
});

const OrderSchema = mongoose.Schema({
  address: {
    type: [AddressSchema],
    require: true,
  },
  products: {
    type: [ProductSchema],
    require: true,
  },
  amount_total: {
    type: String,
    require: true,
  },
  session_id: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  order_id: {
    type: String,
    require: true,
  },
  date: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
