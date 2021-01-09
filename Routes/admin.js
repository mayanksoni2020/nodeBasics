const express = require("express");
const { check } = require("express-validator");
const productController = require("../controllers/products");
const router = express.Router();

router.get("/add-product", productController.addProductForm);
router.post("/add-product", check('name')
    .isLength({ min: 3 }).withMessage("*Name has to be min 3 char long!")
    .isAlphanumeric().withMessage("*Special characters not accepted!")
    .not()
    .isNumeric().withMessage("*Numbers are not accepted in Name!"),
    check('brand')
        .isAlphanumeric().withMessage("*Special characters not accepted!")
        .not()
        .isEmpty().withMessage("*This field can't be empty!"), productController.postAddProduct);

router.get("/products/:productId", productController.deleteProduct);

module.exports = router;
