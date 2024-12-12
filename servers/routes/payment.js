const express = require("express");

const router = express.Router();
const {
  paymentCreate,
  getOrderID,
  removeOrder,
  getAllOrderlist,
} = require("../controllers/payment");

router.route("/").get(getAllOrderlist).post(paymentCreate);

router.route("/:id").get(getOrderID).delete(removeOrder);

module.exports = router;
