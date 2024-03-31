import express from "express";
import {
  getAllProducts,
  getAllProductsByColourFilter,
  getAllProductsByCompanyFilter,
  getAllProductsByKeywordFilter,
  getAllProductsByPriceFilter,
  getAllProductsByPriceSortFilter,
  getAllProductsBySortCompanyFilter,
  getAllProductsByUseTypeFilter,
  getSignleProduct,
} from "../Controller/Product.js";

const router = express.Router();

router
  .get("/get", getAllProducts)
  .get("/get/single/product/:productId", getSignleProduct)
  .get("/filter/keyword", getAllProductsByKeywordFilter)
  .post("/filter/colour", getAllProductsByColourFilter)
  .post("/filter/useType", getAllProductsByUseTypeFilter)
  .post("/filter/company", getAllProductsByCompanyFilter)
  .post("/filter/sort/company", getAllProductsBySortCompanyFilter)
  .post("/filter/price", getAllProductsByPriceFilter)
  .post("/filter/sort/price", getAllProductsByPriceSortFilter);
export default router;
