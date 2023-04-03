// Import package crypto
// Purpose : encrypt and decrypt
// multi thread: hash, symmmetric and asymmetric,...
const crypto = require("crypto");

// Import package mongoose
// Purpose :  Create Schema for Collection
const mongoose = require("mongoose");

// Import package validator
// Purpose : check type, constraint data.
const validator = require("validator");

// Import package bcryptjs
// Purpose :
const bcrypt = require("bcrypt");

const AccountSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: [true, "We don't know how to call you? Time to introduce your name."],
      lowercase: true,
      trim : true,
      unique: true,
    },
    Password: {
      type: String,
      required: [true, "Please provide a password"],
      min: 8,
      select: false,
    },
    ConfirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.Password;
        },
        message: "Passwords are not the same!",
      },
    },
    Role: {
      type: String,
      enum: ["admin", "user", "editor","moderator"],
      default: "user",
      trim: true,
      lowercase: true
    },
    Active: {
      type: Boolean,
      default: true,
      select: false,
    },

    // Ghi lại thời gian mỗi lần có thay đổi mật khẩu.
    PasswordChangeAt: Date,

    // generate token, then send to email if you forget password
    /**
     * Trong đó, `_password_reset_token` là thuộc tính chứa chuỗi token được tạo ra và
     * `password_reset_expires` là một thuộc tính dạng ngày giờ (Date) để lưu trữ thời gian hết hạn của token.
     * Thuộc tính `passwordResetToken` sẽ được gán giá trị null khi 1 trong 2 điều kiện sau xảy ra:
     * (1) khi mật khẩu được khôi phục thành công hoặc
     * (2) khi token đã hết hạn.
     * Nếu token đã hết hạn, người dùng sẽ được yêu cầu tạo mới token để khôi phục mật khẩu của mình.
     */
    PasswordResetToken: String,
    PasswordResetExpires: Date,
  },
  {
    autoCreate: true,
    autoIndex: true,
    collection: "Account",
     // If you want show properties virtual, You must add two row below.
     toJSON: { virtuals: true },
     toObject: { virtuals: true },
  }
);

// Middlewares lưu lại mật khẩu khi khởi tạo đối tượng mới.
AccountSchema.pre("save", async function (next) {
  // Nếu password không có sự thay đổi thì chạy middlewares tiếp theo.
  if (!this.isModified("Password")) return next();

  // Hash password
  this.Password = await bcrypt.hash(this.Password, 12);
  this.ConfirmPassword = undefined;
  next();
});

// middlewares for save event.
// Mục đích lưu lại thời gian thay đổi mới nhất.
AccountSchema.pre("save", function (next) {
  // Nếu pasword không có sự thay đổi.
  if (!this.isModified("Password") || this.isNew) return next();

  // Save log time.
  this.PasswordChangeAt = Date.now() - 1000;
  next();
});

// middlewares for find event:
// return All account is active.
AccountSchema.pre("find", function (next) {
  // $ne: value ==> return object # value
  // this.find({ Active: { $ne: false } });
  next();
});

// Compare Password
AccountSchema.methods.CorrectPassword = async function (
  CandidatePassword,
  Password
) {
  return await bcrypt.compare(CandidatePassword, Password);
};

AccountSchema.methods.ChangedPasswordAfter = function (JWTTimestamp) {

  if (this.PasswordChangeAt) {
    const changed_timestamp = parseInt(
      this.PasswordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changed_timestamp;
  }
  return false;
};

AccountSchema.methods.CreateResetToken = function(){
  const ResetToken = crypto.randomBytes(32).toString("hex");
  this.PasswordResetToken = crypto
    .createHash("sha256")
    .update(ResetToken)
    .digest("hex");

  this.PasswordResetExpires = Date.now() + 10 * 60 * 1000;
  return ResetToken;
};

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
