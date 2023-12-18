import React from "react";
import "./OrderHistory.css";
import Tableadmin from "../Admin/Tableadmin/Tableadmin";

const OrderHistory = () => {
  const orderHistoryData = [
    {
      orderNumber: "1",
      productName: "Product 1",
      quantity: 2,
      total: 100,
      createdAt: "2023-01-01",
      status: "Đã giao hàng",
    },
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


  return (
    <div className="orderhistory-container">
      <div className="orderhistory">
        <h1>Lịch sử mua hàng</h1>
        <Tableadmin
          data={orderHistoryData}
          columns={columns} 
          rowSelection={null}
        />
      </div>
    </div>
  );
};

export default OrderHistory;
