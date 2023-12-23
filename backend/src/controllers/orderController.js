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
};

let handleGetOrderByCustomerId = async (req, res) => {
  let id = req.params.id;
  let order = await orderService.getOrderByCustomerId(id);
  return res.status(200).json({
    errCode: 0,
    message: "get order by customer id",
    data: order,
  });
}; //get order by customer id

let handleGetOrderByCustomerName = async (req, res) => {
  let name = req.params.name;
  let order = await orderService.getOrderByCustomerName(name);
  return res.status(200).json({
    errCode: 0,
    message: "get order by customer name",
    data: order,
  });
};

//create - update
const handleCreateOrder = async (req, res) => {
  try {
    // console.log(req.body);
    const {
      customer,
      item,
      total,
      payment,
      deliTime,
      deliLocation,
      status,
      note,
    } = req.body;
    if (
      (!customer || !total || !payment || !item || !deliTime, !deliLocation)
    ) {
      return res.status(400).json({
        errCode: 400,
        message: "Vui lòng nhập dữ liệu",
      });
    }

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
    const id = req.params.id;
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

const handleUpdateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    // console.log(data);
    const check = await orderService.updateOrderStatus(id, data);

    if (check.errCode === 0) {
      return res.status(200).json(check);
    } else {
      return res.status(400).json(check);
    }
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

const handleUpdateRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    // console.log(data);
    const check = await orderService.updateOrderRequest(id, data);

    if (check.errCode === 0) {
      return res.status(200).json(check);
    } else {
      return res.status(400).json(check);
    }
  } catch (error) {
    return res.status(500).json({
      errCode: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  handleGetAllOrder,
  handleGetOrderById,
  handleCreateOrder,
  handleUpdateOrder,
  handleUpdateStatus,
  handleGetOrderByCustomerId,
  handleGetOrderByCustomerName,
  handleUpdateRequest,
};
