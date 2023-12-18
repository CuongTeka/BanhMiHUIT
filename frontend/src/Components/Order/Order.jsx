import React from "react";
import './Order.css'
import Tableadmin from "../Admin/Tableadmin/Tableadmin";

const OrderHistory = () => {
  // Giả sử data lịch sử mua hàng của bạn có dạng như sau
  const orderHistoryData = [
    {
      orderNumber: "1",
      productName: "Product 1",
      quantity: 2,
      total: 100,
      createdAt: "2023-01-01",
      status: "Đã giao hàng",
    },
    // Thêm các dòng khác tương tự cho lịch sử mua hàng khác
  ];

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Ngày tạo đơn hàng",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
    },
  ];

  const handleDeleteMany = (selectedKeys) => {
    // Xử lý xóa nhiều đơn hàng nếu cần
    console.log("Xóa các đơn hàng có keys:", selectedKeys);
  };

  return (
    <div>
      <h1>Lịch sử mua hàng</h1>
      <Tableadmin
        data={orderHistoryData}
        columns={columns}
        handleDelteMany={handleDeleteMany}
      />
    </div>
  );
};

export default OrderHistory;
