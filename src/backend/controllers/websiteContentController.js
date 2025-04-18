import WebsiteContent from "../models/WebsiteContent.js";

// @desc    Get content by section
// @route   GET /api/content/:section
// @access  Public
export const getContentBySection = async (req, res) => {
  try {
    const content = await WebsiteContent.findOne({
      section: req.params.section,
    });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all website content
// @route   GET /api/content
// @access  Public
export const getAllContent = async (req, res) => {
  try {
    const content = await WebsiteContent.find({});
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update website content
// @route   PUT /api/content/:section
// @access  Private/Admin
export const updateContent = async (req, res) => {
  try {
    const { title, subtitle, content, imageUrl } = req.body;

    let websiteContent = await WebsiteContent.findOne({
      section: req.params.section,
    });

    if (!websiteContent) {
      // Create new content if it doesn't exist
      websiteContent = new WebsiteContent({
        section: req.params.section,
        title,
        subtitle,
        content,
        imageUrl,
      });
    } else {
      // Update existing content
      websiteContent.title = title || websiteContent.title;
      websiteContent.subtitle = subtitle || websiteContent.subtitle;
      websiteContent.content =
        content !== undefined ? content : websiteContent.content;
      websiteContent.imageUrl = imageUrl || websiteContent.imageUrl;
    }

    const updatedContent = await websiteContent.save();
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
