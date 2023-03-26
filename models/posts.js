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
    },
    Thubnail: {
      type: String,
      default: "default.jpg",
    },
    DateCreate: {
      type: Date,
      default: null,
    },

    DateChanged: {
      type: Date,
      default: Date.now(),
    },

    Status: {
      type: String,
      enum: ["cancel", "wait", "public"],
      default: "wait",
    },
    Tags: {
      type: Array
    },
    Category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, "The posts must be belong to a category."],
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    _id: false,
    collection: "Posts",
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
