// Import package mongoose
// Purpose :  Create Schema for Collection
const mongoose = require("mongoose");

const Category = require("./category");

const PostsSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: [true, "The posts must have ID."],
    },
    Title: {
      type: String,
      max: 50,
      required: [true, "Please tell us title posts."],
      trim: true,
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
      enum: ["cancel", "wait", "public"],
      default: "wait",
    },
    Content: {
      type: String,
    },
    Tags: {
      type: Array,
    },
    Category: {
      type: Number,
      ref: "Category",
      required: [true, "The posts must be belong to a category."],
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    _id: false,
    collection: "Posts",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PostsSchema.pre("save", async () => {
  this.Title = this.Title.toUpperCase();
  next();
});

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
