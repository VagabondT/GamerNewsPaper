// Import package mongoose
// Purpose :  Create Schema for Collection
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "The category must have ID."],
      default: new mongoose.Types.ObjectId()
    },
    name: {
      type: String,
      require: [true, "Please tell us your category name!."],
      max: 100,
      capitalize: true,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    _id: false,
    collection: "Category",
  }
);

CategorySchema.pre("save", async function(next){
  console.log('save test');
  next();
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
