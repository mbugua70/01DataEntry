const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;





const UserSchema = new Schema({
  ba_name: {
    type: String,
    required: [true, "Please insert your name"],
    minLength: [3, "Your name is too short"],
  },
  ba_phone: {
    type: Number,
    required: [true, "Please insert your phone"],

  },
  ba_location: {
    type: String,
    required: [true, "Please insert  location"],

  },
});


// creating an instance method

UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, userName: this.ba_name },
    process.env.SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};


UserSchema.methods.getUser = function () {
  return {
    userId: this._id,
    ba_name: this.ba_name,
    ba_phone: this.ba_phone,
    ba_location: this.ba_location
  };
};



const UserModel = mongoose.model("Ba", UserSchema);

module.exports = UserModel;