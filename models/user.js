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
      max: 200,
      capitalize: true,
      default: "Captain",
      trim: true,
      required: true,
    },
    Birthday: {
      type: Date,
      default: "2000-10-31T01:30:00.000-05:00",
    },
    Photo: {
      type: String,
      defaul: "default.jpg",
    },
    Email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    Address: {
      type: String,
      max: 300,
      trim: true,
      default: "",
    },
    Account: {
      type: mongoose.Schema.ObjectId,
      ref: "Account",
      required: true,
    },
    Phone: {
      type: String,
      default: "",
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
// UserSchema.virtual("Age").get(function () {
//   return Math.floor(
//     (Date.now() - this.BirthOfDate.getTime()) / (1000 * 3600 * 24 * 365)
//   );
// });

// Kiểm tra số điện thoại đã tồn tại chưa, nếu rồi thì số điện thoại sẽ
// UserSchema.pre("save", (next) => {
//   const result = User.find({});
//   if (result) {
//     console.log("The phone number already exists!")
//     // handler
//   }
// });

const User = mongoose.model("User", UserSchema);

module.exports = User;

//       match: "/^(+84|0)(1d{9}|3d{8}|5d{8}|7d{8}|8d{8}|9d{8})$/",
