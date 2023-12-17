const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cate = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    is_active: { type: Boolean, default: true },
  },
  { collection: "Category", versionKey: false }
);

module.exports = mongoose.model("Category", cate);
