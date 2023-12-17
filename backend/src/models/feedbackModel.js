const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedback = new Schema(
  {
    user: { type: String, required: true },
    product_id: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String },
    date_create: { type: Date, default: Date.now },
    date_edit: { type: Date, default: Date.now },
    is_edited: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
  },
  { collection: "Feedback", versionKey: false }
);

module.exports = mongoose.model("Feedback", feedback);
