const Post = require("../models/Post");
const Category = require("../models/Category");

// Create Post
const createPost = async (req, res) => {
  try {
    const { title, body, category } = req.body;
    if (!title || !body || !category) {
  return res.status(400).json({
    message: "All fields are required"
  });
  }
  const existingCategory = await Category.findById(category);

if (!existingCategory) {
  return res.status(404).json({
    message: "Category not found"
  });
}

    const post = await Post.create({
      title,
      body,
      category,
    });

    const populatedPost = await Post.findById(post._id).populate("category");

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Posts
const getPosts = async (req, res) => {
  try {
    let filter = {};

    // Category Filter
    if (req.query.category) {
      const category = await Category.findOne({
        name: req.query.category,
      });

      if (category) {
        filter.category = category._id;
      } else {
        return res.status(404).json({
          message: "Category not found",
        });
      }
    }

    let query = Post.find(filter).populate("category");

    // Pagination (Bonus)
    if (req.query.page && req.query.limit) {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);

      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);
    }

    const posts = await query;

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Post
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("category");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate("category");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};