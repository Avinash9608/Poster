import Poster from "../models/Poster.js";

// @desc    Create a new poster
// @route   POST /api/posters
// @access  Private
export const createPoster = async (req, res) => {
  try {
    const { title, description, imageUrl, isPublic } = req.body;

    const poster = await Poster.create({
      title,
      description,
      imageUrl,
      creator: req.user._id,
      isPublic,
    });

    res.status(201).json(poster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all public posters
// @route   GET /api/posters
// @access  Public
export const getPublicPosters = async (req, res) => {
  try {
    const posters = await Poster.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .populate("creator", "name");

    res.json(posters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured posters
// @route   GET /api/posters/featured
// @access  Public
export const getFeaturedPosters = async (req, res) => {
  try {
    const posters = await Poster.find({ isPublic: true, isFeatured: true })
      .sort({ createdAt: -1 })
      .populate("creator", "name");

    res.json(posters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get poster by ID
// @route   GET /api/posters/:id
// @access  Public/Private (depends on poster visibility)
export const getPosterById = async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id).populate(
      "creator",
      "name"
    );

    if (!poster) {
      return res.status(404).json({ message: "Poster not found" });
    }

    // Check if poster is public or if user is the creator or admin
    if (
      poster.isPublic ||
      (req.user &&
        (req.user._id.toString() === poster.creator._id.toString() ||
          req.user.role === "admin"))
    ) {
      return res.json(poster);
    }

    res.status(403).json({ message: "Not authorized to access this poster" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update poster
// @route   PUT /api/posters/:id
// @access  Private
export const updatePoster = async (req, res) => {
  try {
    const { title, description, imageUrl, isPublic, isFeatured } = req.body;

    const poster = await Poster.findById(req.params.id);

    if (!poster) {
      return res.status(404).json({ message: "Poster not found" });
    }

    // Check if user is the creator or admin
    if (
      req.user._id.toString() !== poster.creator.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this poster" });
    }

    // Update poster
    poster.title = title || poster.title;
    poster.description = description || poster.description;
    poster.imageUrl = imageUrl || poster.imageUrl;

    // Only admin can set featured status
    if (req.user.role === "admin") {
      poster.isFeatured =
        isFeatured !== undefined ? isFeatured : poster.isFeatured;
    }

    // Creator or admin can set public status
    poster.isPublic = isPublic !== undefined ? isPublic : poster.isPublic;

    const updatedPoster = await poster.save();
    res.json(updatedPoster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete poster
// @route   DELETE /api/posters/:id
// @access  Private
export const deletePoster = async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id);

    if (!poster) {
      return res.status(404).json({ message: "Poster not found" });
    }

    // Check if user is the creator or admin
    if (
      req.user._id.toString() !== poster.creator.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this poster" });
    }

    await poster.deleteOne();
    res.json({ message: "Poster removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's posters
// @route   GET /api/posters/user
// @access  Private
export const getUserPosters = async (req, res) => {
  try {
    const posters = await Poster.find({ creator: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(posters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all posters (admin only)
// @route   GET /api/posters/admin
// @access  Private/Admin
export const getAllPosters = async (req, res) => {
  try {
    const posters = await Poster.find({})
      .sort({ createdAt: -1 })
      .populate("creator", "name");

    res.json(posters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
