import Product from "../Model/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getSignleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProductsByKeywordFilter = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (keyword) {
      const products = await Product.find({
        title: { $regex: `^${keyword}`, $options: "i" },
      });
      res.status(200).json({ products });
    } else {
      res.status(400).json({ message: "Input required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProductsByColourFilter = async (req, res) => {
  try {
    const {
      colour,
      useType,
      company,
      minPrice,
      maxPrice,
      companySort,
      priceSort,
    } = req.body;
    let products = [];

    if (colour && useType && company && minPrice && maxPrice && companySort) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (
      colour &&
      useType &&
      company &&
      minPrice &&
      maxPrice &&
      companySort &&
      priceSort
    ) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort, price: priceSort });
      res.status(200).json({ products });
    } else if (colour && useType && company && minPrice && maxPrice) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (colour && useType && company && companySort) {
      products = await Product.find({
        colour,
        useType,
        company,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && minPrice && maxPrice && companySort) {
      products = await Product.find({
        colour,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && useType && company) {
      products = await Product.find({
        colour,
        useType,
        company,
      });
      res.status(200).json({ products });
    } else if (colour && companySort && company) {
      products = await Product.find({
        colour,
        company,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && companySort && useType) {
      products = await Product.find({
        colour,
        useType,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && useType) {
      products = await Product.find({
        colour,
        useType,
      });
      res.status(200).json({ products });
    } else if (colour && maxPrice && minPrice) {
      products = await Product.find({
        colour,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (colour && company) {
      products = await Product.find({
        colour,
        company,
      });
      res.status(200).json({ products });
    } else if (colour && companySort) {
      products = await Product.find({
        colour,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour) {
      products = await Product.find({
        colour,
      });
      res.status(200).json({ products });
    } else {
      res.status(400).json({ message: "Input required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
export const getAllProductsByCompanyFilter = async (req, res) => {
  try {
    const {
      colour,
      useType,
      company,
      minPrice,
      maxPrice,
      companySort,
      priceSort,
    } = req.body;
    let products = [];
    console.log(company);

    if (
      company &&
      useType &&
      colour &&
      minPrice &&
      maxPrice &&
      companySort &&
      priceSort
    ) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort, price: priceSort });
      res.status(200).json({ products });
    } else if (
      company &&
      useType &&
      colour &&
      minPrice &&
      maxPrice &&
      companySort
    ) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && useType && company && minPrice && maxPrice) {
      products = await Product.find({
        company,
        useType,
        colour,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (colour && useType && company) {
      products = await Product.find({
        company,
        useType,
        colour,
      });
      res.status(200).json({ products });
    } else if (priceSort && company && colour) {
      products = await Product.find({
        company,
        colour,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (colour && company && priceSort) {
      products = await Product.find({
        company,
        useType,
        colour,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (minPrice && maxPrice && company) {
      products = await Product.find({
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (colour && company) {
      products = await Product.find({
        colour,
        company,
      });
      res.status(200).json({ products });
    } else if (companySort && company) {
      products = await Product.find({
        company,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (company && useType) {
      products = await Product.find({
        company,
        useType,
      });
      res.status(200).json({ products });
    } else if (company && companySort) {
      products = await Product.find({
        company,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (company) {
      products = await Product.find({
        company,
      });
      res.status(200).json({ products });
    } else {
      res.status(400).json({ message: "Input required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProductsByUseTypeFilter = async (req, res) => {
  try {
    const {
      colour,
      useType,
      company,
      minPrice,
      maxPrice,
      companySort,
      priceSort,
    } = req.body;
    let products = [];

    if (
      colour &&
      useType &&
      company &&
      minPrice &&
      maxPrice &&
      companySort &&
      priceSort
    ) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort, price: priceSort });
      res.status(200).json({ products });
    } else if (
      colour &&
      useType &&
      company &&
      minPrice &&
      maxPrice &&
      companySort
    ) {
      products = await Product.find({
        useType,
        colour,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && useType && company && minPrice && maxPrice) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (colour && useType && minPrice && maxPrice && companySort) {
      products = await Product.find({
        colour,
        useType,

        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && useType && company && companySort) {
      products = await Product.find({
        colour,
        company,
        useType,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && useType && company) {
      products = await Product.find({
        colour,
        useType,
        company,
      });
      res.status(200).json({ products });
    } else if (colour && useType && companySort) {
      products = await Product.find({
        colour,
        useType,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (company && useType) {
      products = await Product.find({
        useType,
        company,
      });
      res.status(200).json({ products });
    } else if (colour && useType) {
      products = await Product.find({
        colour,
        useType,
      });
      res.status(200).json({ products });
    } else if (useType) {
      products = await Product.find({
        useType,
      });
      res.status(200).json({ products });
    } else {
      res.status(400).json({ message: "Input required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProductsByPriceSortFilter = async (req, res) => {
  try {
    const {
      colour,
      useType,
      company,
      minPrice,
      maxPrice,
      companySort,
      priceSort,
    } = req.body;

    let products = [];
    console.log(minPrice, maxPrice, colour, company);
    if (
      colour &&
      useType &&
      company &&
      minPrice &&
      maxPrice &&
      companySort &&
      priceSort
    ) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort, price: priceSort });
      res.status(200).json({ products });
    } else if (
      colour &&
      useType &&
      company &&
      minPrice &&
      maxPrice &&
      priceSort
    ) {
      products = await Product.find({
        useType,
        colour,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (minPrice && maxPrice && colour && company) {
      products = await Product.find({
        colour,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (colour && useType && company && priceSort) {
      products = await Product.find({
        colour,
        useType,
        company,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (colour && useType && priceSort) {
      products = await Product.find({
        colour,
        useType,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (company && useType && priceSort) {
      products = await Product.find({
        company,
        useType,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (colour && useType && priceSort) {
      products = await Product.find({
        colour,
        useType,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (colour && company && priceSort) {
      products = await Product.find({
        colour,
        company,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (useType && company && priceSort) {
      products = await Product.find({
        useType,
        company,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (colour && priceSort) {
      products = await Product.find({
        colour,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (minPrice && maxPrice && priceSort) {
      products = await Product.find({
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (useType && priceSort) {
      products = await Product.find({
        useType,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (company && priceSort) {
      products = await Product.find({
        company,
      }).sort({ price: priceSort });
      res.status(200).json({ products });
    } else if (priceSort) {
      console.log(priceSort);
      products = await Product.find().sort({ price: priceSort });
      res.status(200).json({ products });
    } else {
      res.status(400).json({ message: "Input required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProductsBySortCompanyFilter = async (req, res) => {
  try {
    const {
      colour,
      useType,
      company,
      minPrice,
      maxPrice,
      companySort,
      priceSort,
    } = req.body;
    let products = [];
    console.log(req.body);

    if (
      colour &&
      useType &&
      company &&
      minPrice &&
      maxPrice &&
      companySort &&
      priceSort
    ) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort, price: priceSort });
      res.status(200).json({ products });
    } else if (useType && company && minPrice && maxPrice && companySort) {
      products = await Product.find({
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && useType && companySort) {
      console.log("h");
      products = await Product.find({
        colour,
        useType,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (company && minPrice && maxPrice) {
      products = await Product.find({
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (useType && company) {
      products = await Product.find({
        useType,
        company,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && companySort) {
      products = await Product.find({
        colour,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (company && companySort) {
      products = await Product.find({
        company,
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (companySort) {
      products = await Product.find().sort({ company: companySort });
      res.status(200).json({ products });
    } else {
      res.status(400).json({ message: "Input required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProductsByPriceFilter = async (req, res) => {
  try {
    const {
      colour,
      useType,
      company,
      minPrice,
      maxPrice,
      companySort,
      priceSort,
    } = req.body;
    let products = [];

    if (
      colour &&
      useType &&
      company &&
      minPrice &&
      maxPrice &&
      companySort &&
      priceSort
    ) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort, price: priceSort });
      res.status(200).json({ products });
    } else if (
      colour &&
      useType &&
      company &&
      minPrice &&
      maxPrice &&
      companySort
    ) {
      products = await Product.find({
        useType,
        colour,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && useType && company && minPrice && maxPrice) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (colour && useType && companySort && minPrice && maxPrice) {
      products = await Product.find({
        colour,
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      }).sort({ company: companySort });
      res.status(200).json({ products });
    } else if (colour && useType && minPrice && maxPrice) {
      products = await Product.find({
        colour,
        useType,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (useType && company && minPrice && maxPrice) {
      products = await Product.find({
        useType,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (colour && company && minPrice && maxPrice) {
      products = await Product.find({
        colour,
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (minPrice && maxPrice && useType) {
      products = await Product.find({
        useType,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (minPrice && maxPrice && colour) {
      products = await Product.find({
        colour,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (company && minPrice && maxPrice) {
      products = await Product.find({
        company,
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else if (minPrice && maxPrice) {
      products = await Product.find({
        price: { $lte: maxPrice, $gte: minPrice },
      });
      res.status(200).json({ products });
    } else {
      res.status(400).json({ message: "Input required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
