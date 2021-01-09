const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

router.get("/", productController.fetchAllProducts);

router.get("/login");

router.get("/products/:productId", productController.fetchProduct);

router.get("/products/:productId", productController.deleteProduct);

module.exports = router;
