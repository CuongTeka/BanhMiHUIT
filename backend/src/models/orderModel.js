const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contents = new Schema(
  {
    pro_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    custom: { type: String },
  },
  { _id: false }
);

const orders = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: { type: [contents], default: undefined },
    total: { type: Number, required: true },
    date_create: { type: Date, default: Date.now },
    date_edit: { type: Date, default: Date.now },
    payment: { type: String, required: true }, //Thanh toán momo, thanh toán tiền mặt
    status: { type: String, default: 0 }, //đang xử lý - đã nhận hàng
    is_paid: { type: Boolean, default: false }, //chưa thanh toán (tiền mặt), đã thanh toán (momo)
    checkpaid: { type: Boolean, default: false }, //user có gửi yêu cầu xác nhận thanh toán
    deliTime: { type: String, required: true }, //thời gian nhận
    deliLocation: { type: String, required: true }, //địa điểm nhận
    note: { type: String },
  },
  { collection: "Order", versionKey: false }
);

module.exports = mongoose.model("Order", orders);
