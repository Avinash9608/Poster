import mongoose from "mongoose";

const WebsiteContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  content: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
WebsiteContentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const WebsiteContent = mongoose.model("WebsiteContent", WebsiteContentSchema);
export default WebsiteContent;
