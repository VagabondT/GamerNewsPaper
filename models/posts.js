// Import package mongoose
// Purpose :  Create Schema for Collection
const mongoose = require("mongoose");

const slugify = require('slugify');


const PostsSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      max: 50,
      required: [true, "Please tell us title posts."],
      trim: true,
    },
    Description: {
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
    Author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "The posts must be belong to an author."],
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

PostsSchema.pre('save', function(next) {
  this.Slug = slugify(this.Title +'-'+ this._id, { lower: true });

  //sau này implement quill vào cho nó sửa
  if (this.Description === undefined){
      this.Description = 'Một bài viết thú vị'
  }
  if (Date.now() > this.DateCreate){
    this.DateChanged = Date.now();
  }
  if (this.DateChanged == null){
    this.DateChanged = Date.now();
  }
  next();
});

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
