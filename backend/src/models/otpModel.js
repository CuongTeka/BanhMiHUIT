const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    mail: {
      type: String,
      required: true,
    },
    otp: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: "Otp", versionKey: false }
);

const OTP = mongoose.model("Otp", otpSchema);

module.exports = OTP;
