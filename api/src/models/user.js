const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobileNumber: { type: String },
    email: { type: String, unique: true, required: true },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    address: { type: String },
    bloodGroup: { type: String },
    maritalStatus: { type: String },
    emergencyContact: { type: String },
    consent: { type: Boolean, default: false },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["patient", "provider"],
      default: "patient",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
