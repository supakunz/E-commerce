const express = require("express");

const router = express.Router();
const {
  paymentCreate,
  getOrderID,
  removeOrder,
} = require("../controllers/payment");

router.route("/").post(paymentCreate);

router.route("/:id").get(getOrderID).delete(removeOrder);

module.exports = router;
