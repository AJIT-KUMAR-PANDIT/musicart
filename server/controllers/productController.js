const express = require("express");
const Product = require("../models/Product");

const allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const productDetails = async (req, res) => {
  const itemId = req.params.itemId;
  console.log(itemId);
  try {
    const productItem = await Product.findById(itemId);
    res.json(productItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchProduct = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    console.log("Search Query:", searchQuery);

    if (!searchQuery || typeof searchQuery !== "string") {
      return res.status(400).json({ error: "Invalid search query" });
    }
    const products = await Product.find({
      name: { $regex: searchQuery, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

const filterProducts = async (req, res) => {
  try {
    let filter = {};

    const headphoneType = req.query.headphoneType;
    const companyType = req.query.company;
    const colorType = req.query.color;
    const priceType = req.query.price;
    console.log(headphoneType, companyType, colorType, priceType);
    
    if (headphoneType) {
      filter.type = headphoneType;
    }
    if (companyType) {
      filter.brand = companyType;
    }
    if (colorType) {
      filter.color = colorType;
    }
    if (priceType) {
      const [minPrice, maxPrice] = priceType.split("-");
      filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }
    console.log(filter);
    const filteredProducts = await Product.find(filter);
    res.json(filteredProducts);
    console.log(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sortProducts=async(req,res)=>{
  try{
   let sortCriteria={};
   if(req.query.sortCriteria==='price-asc'){
    sortCriteria={price:1};
   }else if(req.query.sortCriteria==='price-desc'){
    sortCriteria={price:-1};
    
   }else if(req.query.sortCriteria==='name-asc'){
    sortCriteria={name:1};
   }else if(req.query.sortCriteria==='name-desc'){
    sortCriteria={name:-1}
   }

   const sortedproducts=await Product.find({}).sort(sortCriteria).collation({ locale: 'en', strength: 2 });
   res.json(sortedproducts);
  }catch(error){
   console.error(error);
   res.status(500).json({error:"Internal Server error"})
  }
}


module.exports = { allProducts, searchProduct, productDetails, filterProducts,sortProducts };
