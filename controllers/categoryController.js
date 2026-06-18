const Category = require("../models/Category");

// Create Category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
    return res.status(400).json({
    message: "Category name is required"
    });
  }

    const category = await Category.create({
      name,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
};