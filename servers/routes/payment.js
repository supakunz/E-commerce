const express = require("express");

const router = express.Router();
const { paymentCreate } = require("../controllers/payment");

router.route("/").get(paymentCreate);

module.exports = router;
