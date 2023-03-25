// Import package mongoose
// Purpose :  Create Schema for Collection
const mongoose = require("mongoose");

// Import relationships.
// One Account belong to Users.
const Account = require("./account");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: [true, "Object document must have ID."],
    },
    Name: {
      type: String,
      required: [true, "Please tell us your name."],
      max: 200,
      set: capitalize,
    },
    BirthOfDate: {
      type: Date,
      required: [true, "Please tell us your birth day"],
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
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    Address: {
      type: String,
      max: 300,
    },
    Account: {
      type: mongoose.ObjectId,
      ref: "Account",
      required: [true, "Account must belong to a user."],
    },
    Phone: {
      type: String,
      match: "/^(+84|0)(1d{9}|3d{8}|5d{8}|7d{8}|8d{8}|9d{8})$/",
      unique: true,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    _id: false,
    collection: "User",
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
