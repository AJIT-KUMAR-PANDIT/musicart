const express = require("express");
const {
  allProducts,
  searchProduct,
  filterProducts,
  sortProducts,
  productDetails,
} = require("../controllers/productController");

const router = express.Router();

router.get("/allproducts", allProducts);
router.get("/searchproduct", searchProduct);
router.get("/filter", filterProducts);
router.get('/sort',sortProducts);
router.get("/product/:itemId", productDetails);


module.exports = router;
