const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const User = require("../models/user");
const isLoggedIn = require("../middleware/isLoggedIn");
const product = require("../models/product");

//add product api
router.post("/addproduct", async (req, res) => {
  try {
    const {
      brand,
      model,
      images,
      price,
      rating,
      reviewCount,
      about,
      available,
      color,
      headphoneType,
      shortDescription,
      featured,
    } = req.body;

    if (
      !brand ||
      !model ||
      !images ||
      !price ||
      !rating ||
      !reviewCount ||
      !about ||
      !available ||
      !color ||
      !headphoneType ||
      !shortDescription
    ) {
      res.status(400).json({
        status: "FAILED",
        message: "Fileds Empty",
      });
      return;
    }

    const product = new Product({
      brand,
      model,
      images,
      price,
      rating,
      reviewCount,
      about,
      available,
      color,
      headphoneType,
      shortDescription,
      featured,
    });
    await product.save();
    res.status(200).json({
      status: 200,
      message: "Product added sucessfully",
    });
  } catch (error) {
    next(new Error("Something went wrong! Please try after some time."));
  }
});

//get product
router.get("/product", async (req, res) => {
  try {
    //getting all filter and sort value
    const {
      search,
      company,
      headphoneType,
      featured,
      colour,
      sortPrice,
      sortName,
      minPrice,
      maxPrice,
    } = req.query;

    //setting product query
    const productQuery = {
      brand: { $regex: new RegExp(company, "i") },
      headphoneType: { $regex: new RegExp(headphoneType, "i") },
      color: { $regex: new RegExp(colour, "i") },
      shortDescription: { $regex: new RegExp(search, "i") },
    };

    //Inserting featured value in query
    if (featured !== undefined) {
      productQuery.featured = featured;
    }

    //setting price filter
    if (minPrice !== undefined && maxPrice !== undefined) {
      productQuery.price = {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice),
      };
    }

    //setting sorting value
    let productSort = {};
    if (sortPrice) {
      productSort.price = sortPrice;
    } else if (sortName) {
      productSort.brand = sortName;
    }

    //fetching product
    const product = await Product.find(productQuery, {
      brand: 1,
      model: 1,
      shortDescription: 1,
      price: 1,
      color: 1,
      headphoneType: 1,
      images: 1,
    })
      .sort(productSort)
      .collation({ locale: "en", strength: 2 });

    res.status(200).json({ stauts: "SUCCESS", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/productDetails/:id", async (req, res) => {
  try {
    const productdetails = await Product.findById(req.params.id);
    if (!productdetails) {
      res
        .status(404)
        .json({ status: "FAILED", message: "Product details not found" });
    }
    res.status(200).json({ status: "SUCCESS", data: productdetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/addToCart", isLoggedIn, async (req, res) => {
  try {
    const { id, quantity, replaceQuantity } = req.body;
    const user = await User.findById(req.userExist._id);
    let newItem = true;
    if (user.cart.length > 0) {
      for (let i = 0; i < user.cart.length; i++) {
        const productId = user.cart[i].productDetails._id.toString();
        if (productId === id) {
          if (replaceQuantity) {
            user.cart[i].quantity = quantity;
          } else {
            user.cart[i].quantity += quantity;
          }
          newItem = false;
          break;
        }
      }
    }
    const productToAdd = await Product.findById(id);
    if (newItem) {
      user.cart.push({
        productDetails: productToAdd,
        quantity: parseInt(quantity),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(req.userExist._id, {
      cart: user.cart,
    });

    res.status(200).json({ status: "SUCCESS", message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/cartProduct", isLoggedIn, async (req, res) => {
  try {
    const id = req.userExist._id;
    const user = await User.findById(id);

    res.status(200).json({
      status: "SUCCESS",
      data: user.cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/orderPlace/", isLoggedIn, async (req, res) => {
  try {
    const { name, address, orderFromCart, productId } = req.body;
    const id = req.userExist._id;
    const user = await User.findById(id);

    if (!name || !address) {
      res.status(200).json({ status: "FAILED", message: "Empty Filed" });
      return;
    }
    let products;
    if (!orderFromCart) {
      products = await Product.findById(productId);
    } else {
      products = user.cart;
    }
    let orderDetails = {
      name,
      address,
      products: products,
      orderTime: new Date(),
    };

    user.orders.push(orderDetails);

    if (orderFromCart) {
      user.cart = [];
    }
    const updatedUser = await User.findByIdAndUpdate(req.userExist._id, {
      orders: user.orders,
      cart: user.cart,
    });

    res.status(200).json({ status: "SUCCESS", message: "Order Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
