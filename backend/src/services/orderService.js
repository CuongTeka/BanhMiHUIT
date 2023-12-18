const orderModel = require("../models/orderModel");

//get order
let getOrder = (Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = "";
      if (Id === "*") {
        order = await orderModel
          .find({})
          .populate([
            {
              path: "item.pro_id",
              select: "name price discount image",
            },
            {
              path: "customer",
              select: "name email mssv phone",
            },
          ])
          .sort({ date_create: "desc" });
      }
      if (Id && Id !== "*") {
        order = await orderModel
          .findOne({
            _id: Id,
          })
          .populate([
            {
              path: "item.pro_id",
              select: "name price discount image",
            },
            {
              path: "customer",
              select: "name email mssv phone",
            },
          ])
          .sort({ date_create: "desc" });
      }
      if (Id === "checkpaid") {
        order = await orderModel
          .find({ checkpaid: true })
          .populate([
            {
              path: "item.pro_id",
              select: "name price discount image",
            },
            {
              path: "customer",
              select: "name email mssv phone",
            },
          ])
          .sort({ date_create: "desc" });
      }
      resolve(order);
    } catch (error) {
      reject(error);
    }
  });
};

let getOrderByCustomerName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = "";
      if (name) {
        const regex = new RegExp(name, "i");
        order = await orderModel
          .find({
            customer: regex,
          })
          .populate({
            path: "item.pro_id",
            select: "name price discount image",
          })
          .sort({ date_create: "desc" });
      }
      resolve(order);
    } catch (error) {
      reject(error);
    }
  });
}; //tìm order theo tên khách hàng

let getOrderByCustomerId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = "";
      if (id) {
        order = await orderModel
          .find({
            customer: id,
          })
          .populate({
            path: "item.pro_id",
            select: "name price discount image",
          })
          .sort({ date_create: "desc" });
      }
      resolve(order);
    } catch (error) {
      reject(error);
    }
  });
};

// create - update - delete
const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { customer, item, total, payment, shipping, note } = newOrder;
    // const item = [pro_id, quantity, custom]
    try {
      const newOrder = await orderModel.create({
        customer,
        item,
        total,
        payment,
        shipping,
        note,
      });
      if (newOrder) {
        resolve({
          errCode: 0,
          message: "Insert Successed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const { customer, item, total, payment, status, shipping, note } = data;
    try {
      const existingOrder = await orderModel.findById(id);
      if (existingOrder === null) {
        resolve({
          errCode: 1,
          message: "Không tìm thấy product",
        });
      }
      existingOrder.customer = data.customer || existingOrder.customer;
      existingOrder.item = data.item || existingOrder.item;
      existingOrder.total = data.total || existingOrder.total;
      existingOrder.payment = data.payment || existingOrder.payment;
      existingOrder.status = data.status || existingOrder.status;
      existingOrder.shipping = data.shipping || existingOrder.shipping;
      existingOrder.note = data.note || existingOrder.note;
      existingOrder.date_edit = Date.now();
      await existingOrder.save();

      resolve({
        errCode: 0,
        message: "Update successed",
      });
    } catch (e) {
      reject(e);
    }
  });
}; //update

const updateOrderStatus = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const { is_paid, status } = data;
    try {
      const existingOrder = await orderModel.findById(id);
      if (existingOrder === null) {
        resolve({
          errCode: 1,
          message: "Không tìm thấy product",
        });
      }
      if (is_paid !== null) {
        existingOrder.is_paid = data.is_paid;
      } //set is_paid
      if (status !== null) {
        existingOrder.status = data.status;
      } //set status
      existingOrder.date_edit = Date.now();
      await existingOrder.save();

      resolve({
        errCode: 0,
        message: "Update successed",
      });
    } catch (e) {
      reject(e);
    }
  });
}; //update

const updateOrderRequest = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const { checkpaid } = data;
    // console.log(checkpaid);
    try {
      const existingOrder = await orderModel.findById(id);
      if (existingOrder === null) {
        resolve({
          errCode: 1,
          message: "Không tìm thấy product",
        });
      }
      if (checkpaid !== null) {
        existingOrder.checkpaid = checkpaid;
      } //set to true or false
      existingOrder.date_edit = Date.now();
      await existingOrder.save();

      resolve({
        errCode: 0,
        message: "Update successed",
      });
    } catch (e) {
      reject(e);
    }
  });
};

// const deleteOrder = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkOrder = await orderModel.findOne({
//                 _id: id
//             })
//             if (checkOrder === null) {
//                 resolve({
//                     errCode: 1,
//                     message: 'Không tìm thấy order'
//                 })
//             }

//             await orderModel.findByIdAndDelete(id)
//             resolve({
//                 errCode: 0,
//                 message: 'Delete successed',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }//un-use
// const deleteManyOrder = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await orderModel.deleteMany({ _id: ids })
//             resolve({
//                 errCode: 0,
//                 message: 'Delete successed',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }//un-use

module.exports = {
  getOrder,
  createOrder,
  updateOrder,
  updateOrderStatus,
  getOrderByCustomerId,
  getOrderByCustomerName,
  updateOrderRequest,
};
