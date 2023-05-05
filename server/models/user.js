const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },

  email: { type: String, required: true },

  pwd: { type: String, required: true },

  state: { type: Boolean, default: true },

  role: {
    type: String,
    required: true,
  },
});

userSchema.methods.toJSON = function(){
  const {__v,pwd, ...user} = this.toObject();
  return user;
}

const User = mongoose.model("User", userSchema);




module.exports = {
  User,
};
