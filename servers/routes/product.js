const express = require("express");

const router = express.Router();
const {
  getAllProducts,
  createProducts,
  updateProducts,
  deleteProducts,
  getProductsID,
} = require("../controllers/products");

router
  .route("/")
  .get(getAllProducts)
  .put(createProducts)
  .delete(deleteProducts);

router.route("/:id").get(getProductsID).put(updateProducts);

module.exports = router;
