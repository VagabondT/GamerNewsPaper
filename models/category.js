// Import package mongoose
// Purpose :  Create Schema for Collection
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: [true, "Please tell us your category name!."],
      max: 100,
      trim: true,
      unique: true,
    },
    Description: {
      type: String,
      max : 200
    },
    Thumbnail: {
      type: String,
      default: "default.jpg"
    },
    Slug : String
  },
  {
    autoCreate: true,
    autoIndex: true,
    collection: "Category",
     // If you want show properties virtual, You must add two row below.
     toJSON: { virtuals: true },
     toObject: { virtuals: true },

  }
);


const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
