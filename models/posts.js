// Import package mongoose
// Purpose :  Create Schema for Collection
const mongoose = require("mongoose");

const Category = require("./category");

const PostsSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      max: 50,
      required: [true, "Please tell us title posts."],
      trim: true,
    },
    Desciption: {
      type: String,
      max: 500,
    },
    Thumbnail: {
      type: String,
      default: "default.jpg",
    },
    DateCreate: {
      type: Date,
      default: Date.now(),
    },

    DateChanged: {
      type: Date,
      default: null,
    },

    Status: {
      type: String,
      enum: ["cancel", "draft", "submit", "publish"],
      default: "draft",
    },
    Content: {
      type: String,
    },
    Tags: {
      type: Array,
    },
    Slug: String,
    Category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "The posts must be belong to a category."],
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    collection: "Posts",
    // If you want show properties virtual, You must add two row below.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
