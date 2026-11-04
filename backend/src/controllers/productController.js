const Product = require('../models/productModel');

const createProduct = async (req, res) => {
    const { name, price, description, image } = req.body;
    if (!name || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = await Product.create({ 
        name, price, description, image });
    res.status(200).json({ message: "Product created successfully", newProduct });
  }

  const getProduct = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ message: "Product retrieved successfully", products });
  }

  module.exports = { createProduct, getProduct };