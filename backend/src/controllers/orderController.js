const orderService = require("../services/orderService");

let handleGetAllOrder = async (req, res) => {
  let id = "*";
  let order = await orderService.getOrder(id);
  return res.status(200).json({
    errCode: 0,
    message: "get all",
    data: order,
  });
}; //get all order

let handleGetOrderById = async (req, res) => {
  let id = req.params.id;
  let order = await orderService.getOrder(id);
  return res.status(200).json({
    errCode: 0,
    message: "get order by id",
    data: order,
  });
}; //get order by id

//create - update
const handleCreateOrder = async (req, res) => {
  try {
    const { customer, item, total, payment, status, shipping, note } = req.body;
    // const item = req.body.item.map(({ pro_id, quantity, custom }) => ({ pro_id, quantity, custom }));
    if (!customer || !total || !payment || !shipping || !item) {
      return res.status(400).json({
        errCode: 400,
        message: "Vui lòng nhập dữ liệu",
      });
    }
    // console.log(req.body)
    // console.log(item)
    const check = await orderService.createOrder(req.body);
    // console.log(check)
    if (check.errCode == 0) {
      return res.status(200).json(check);
    } else {
      return res.status(400).json(check);
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
}; //create

const handleUpdateOrder = async (req, res) => {
  try {
    const id = req.params.id; // Assuming you're using route parameters for the orderId
    const data = req.body;

    const check = await orderService.updateOrder(id, data);

    if (check.errCode === 0) {
      return res.status(200).json(check);
    } else {
      return res.status(400).json(check);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  handleGetAllOrder,
  handleGetOrderById,
  handleCreateOrder,
  handleUpdateOrder,
};
