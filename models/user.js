// Import package mongoose
// Purpose :  Create Schema for Collection
const mongoose = require("mongoose");

// Import relationships.
// One Account belong to Users.
const Account = require("./account");

const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      default: "New User",
      max: 200,
      capitalize: true,
      trim: true
    },
    BirthOfDate: {
      type: Date,
      default: null
    },
    Photo: {
      type: String,
      defaul: "default.jpg",
    },
    Email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    Address: {
      type: String,
      max: 300,
      trim: true,
    },
    Account: {
      type: mongoose.Schema.ObjectId,
      ref: "Account",
      required: [true],
    },
    Phone: {
      type: String,
      match: "/^(+84|0)(1d{9}|3d{8}|5d{8}|7d{8}|8d{8}|9d{8})$/",
      unique: true,
      trim: true,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    collection: "User",
    // If you want show properties virtual, You must add two row below.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field 'Age'.
UserSchema.virtual("Age").get(function () {
  return Math.floor(
    (Date.now() - this.BirthOfDate.getTime()) / (1000 * 3600 * 24 * 365)
  );
});


const User = mongoose.model("User", UserSchema);

module.exports = User;
