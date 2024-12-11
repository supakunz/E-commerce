const express = require("express");

const router = express.Router();
const { paymentCreate, getOrderID } = require("../controllers/payment");

router.route("/").post(paymentCreate);

router.route("/:id").get(getOrderID);

module.exports = router;
