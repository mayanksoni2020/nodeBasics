const Product = require("../models/products");
const { validationResult } = require("express-validator");

exports.addProductForm = (req, res, next) => {
  res.render("add-product", {
    title: "Add Product",
    path: "/admin/add-product",
    error_message: "",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const brand = req.body.brand;
  const rating = req.body.rating;
  const products = new Product({
    name: name,
    price: price,
    brand: brand,
    rating: rating,
  });

  // Validation error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.render("add-product", {
      title: "Add Product",
      path: "/admin/add-product",
      error_message: errors.array(),
      isAuthenticated: req.isLoggedIn,
    });
  }

  products
    .save()
    .then((result) => {
      // res.json({
      //   status: "Success",
      //   message: "Product added successfully",
      //   data: result,
      // });
      res.redirect("/");
    })
    .catch((err) => {
      res.json({
        status: "error",
        message: "Can't add product",
      });
    });
};

exports.fetchAllProducts = (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  Product.find({}).then((products) => {
    res.render("store", {
      prod: products,
      title: "My Store",
      path: "/",
      isAuthenticated: loggedIn,
    });
  });
};

exports.fetchProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then((product) => {
    res.render("product-detail", {
      prod: product,
      title: "Product Details",
      path: "/products/id",
      isAuthenticated: req.isLoggedIn,
    });
  });
};

exports.deleteProduct = (res, req, next) => {
  console.log("Hello");
  const prodId = req.params.productId;
  console.log("Product Id:- ", prodId);
  Product.remove({ _id: prodId })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("404", {
        title: "Error",
        path: "/"
      });
    });
};