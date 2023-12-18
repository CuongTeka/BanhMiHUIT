import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Popconfirm,
  message,
  Select,
  notification,
} from "antd";
import * as orderService from "../../../services/orderService";
import { numberFormat } from "../../../util";

const Adminuser = () => {
  const [modalDetail, setModalDetail] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [singleOrder, setSingleOrder] = useState([]);
  // const user = useSelector((state) => state?.user);
  // const searchInput = useRef(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "name",
      render: (customer) => customer.name,
      responsive: ["sm"],
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => <span>{numberFormat(text)}</span>,
      responsive: ["sm"],
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment",
      key: "payment",
      responsive: ["sm"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => <span>{renderStatus(text)}</span>,
      responsive: ["sm"],
    },
    {
      title: "Thanh toán",
      dataIndex: "is_paid",
      render: (paid, record) => (
        <span style={{ color: paid ? "green" : "red" }}>
          {paid ? (
            <i class="fa-solid fa-circle-check fa-2xl"></i>
          ) : record.checkpaid ? (
            <i
              style={{ color: "orange" }}
              class="fa-solid fa-money-check-dollar fa-2xl"
            ></i>
          ) : (
            <i class="fa-solid fa-circle-xmark fa-2xl"></i>
          )}
        </span>
      ),
      responsive: ["sm"],
    },
    {
      title: "Ngày tạo",
      dataIndex: "date_create",
      render: (text) =>
        new Date(text).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      responsive: ["sm"],
      sorter: (a, b) => new Date(a.date_create) - new Date(b.date_create),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Chi tiết đơn hàng",
      key: "detail",
      render: (_, record) => (
        <Button
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "5px",
          }}
          onClick={() => handleGetDetail(record._id)}
        >
          <i class="fa-solid fa-circle-info fa-2xl"></i>
        </Button>
      ),
      responsive: ["sm"],
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        const isCanceled = record.status === "2" || record.status === "1";
        return (
          <Space size="middle">
            <Popconfirm
              title="Hủy đơn hàng"
              description="Bạn có chắc muốn hủy đơn hàng ?"
              placement="right"
              onConfirm={() => handleCancelOrder(record._id, null, 2)}
              onCancel={() => handleCancelOrder(record._id, null, 0)}
              okText="Bấm để hủy đơn"
              cancelText="Bấm để đặt lại"
              disabled={isCanceled}
            >
              <Button
                style={{ color: "red", width: "60px", height: "60px" }}
                disabled={isCanceled}
              >
                <i class="fa-solid fa-ban"></i>
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Xác nhận thanh toán"
              description="Xác nhận thanh toán đơn hàng này ?"
              placement="right"
              onConfirm={() => handlePaidOrder(record._id, true, null)}
              onCancel={() => handlePaidOrder(record._id, false, null)}
              okText="Bấm để xác nhận"
              cancelText="Bấm để đặt lại"
              disabled={isCanceled}
            >
              <Button
                style={{ color: "blue", width: "60px", height: "60px" }}
                disabled={isCanceled}
              >
                <i class="fa-solid fa-money-check"></i>
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Xác nhận giao hàng"
              description="Các nhận giao hàng đơn hàng này ?"
              placement="right"
              onConfirm={() => handleShippingOrder(record._id, true, 1)}
              onCancel={() => handleShippingOrder(record._id, null, 0)}
              okText="Giao hàng thành công"
              cancelText="Bấm để đặt lại"
              disabled={isCanceled}
            >
              <Button
                style={{ color: "green", width: "60px", height: "60px" }}
                disabled={isCanceled}
              >
                <i class="fa-solid fa-user-check"></i>
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const detailColumn = [
    {
      title: "Tên sản phẩm",
      dataIndex: "pro_id",
      key: "proName",
      render: (text) => text.name,
    },
    {
      title: "Đơn giá",
      dataIndex: "pro_id",
      key: "proPrice",
      render: (text) => <span>{numberFormat(text.price)}</span>,
    },
    {
      title: "Giảm giá",
      dataIndex: "pro_id",
      key: "proDiscount",
      render: (text) => <span>{text.discount} %</span>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "pro_id",
      key: "proImage",
      render: (text) => (
        <img
          src={renderImage(text.image)}
          alt={text.image}
          width={150}
          height={150}
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "proQuantity",
    },
  ];

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const orders = await orderService.handleGetAllOrder();
      if (orders && orders.errCode === 0) {
        setOrderData(orders.data);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  }; //lấy dữ liệu từ db

  const handleGetDetail = async (orderId) => {
    const foundOrder = orderData.find((e) => e._id === orderId);
    // console.log(foundOrder);
    setSingleOrder(foundOrder);
    setModalDetail(true);
  };

  const handleCancelOrder = async (orderId, paid, stat) => {
    try {
      const updateData = {
        is_paid: paid,
        status: stat,
      };
      await orderService.handleUpdateStatus(orderId, updateData);
      fetchOrderData();
      setSelectedRowKeys([]);
      message.success("Cập nhật thành công");
    } catch (error) {
      console.error("Error cancel order:", error);
      message.error("Hủy đơn hàng thất bại: ", error);
    }
  }; //hủy

  const handlePaidOrder = async (orderId, paid, stat) => {
    try {
      const updateData = {
        is_paid: paid,
        status: stat,
      };
      await orderService.handleUpdateStatus(orderId, updateData);
      fetchOrderData();
      setSelectedRowKeys([]);
      message.success("Cập nhật thành công");
    } catch (error) {
      console.error("Error handle paid order:", error);
      message.error("Xác nhận thanh toán thất bại: ", error);
    }
  };

  const handleShippingOrder = async (orderId, paid, stat) => {
    try {
      const updateData = {
        is_paid: paid,
        status: stat,
      };
      await orderService.handleUpdateStatus(orderId, updateData);
      fetchOrderData();
      setSelectedRowKeys([]);
      message.success("Cập nhật thành công");
    } catch (error) {
      console.error("Error handle shipping order:", error);
      message.error("Xác nhận giao hàng thất bại: ", error);
    }
  };

  const handleDelteManyUsers = async () => {
    if (selectedRowKeys.length > 0) {
      try {
        // await userService.handleDeleteManyUser({ ids: selectedRowKeys });
        fetchOrderData();
        setSelectedRowKeys([]);
        message.success("Users deleted successfully");
      } catch (error) {
        console.error("Error deleting users:", error);
        message.error("Failed to delete users");
      }
    }
  }; //xóa nhiều user (tạm thời tắt)

  const renderStatus = (text) => {
    if (text === "0") {
      return "Đang xử lý";
    } else if (text === "1") {
      return <span style={{ color: "green" }}>Thành công</span>;
    } else {
      return <span style={{ color: "red" }}>Đã hủy</span>;
    }
  }; //render trạng thái 4 mức

  const renderImage = (imageName) => {
    if (imageName) {
      return `http://localhost:8080/api/images?imageName=${encodeURIComponent(
        imageName
      )}`;
    } else {
      //??
    }
  };

  // const Detaildata = [
  //   {
  //     item: singleOrder.item,
  //   },
  // ];

  return (
    <div>
      <h3>QUẢN LÝ ĐƠN HÀNG</h3>
      <br />
      <div style={{ padding: "10px" }}>
        <p style={{ padding: "10px" }}>Chú thích: </p>
        <p style={{ padding: "10px" }}>
          <i style={{ color: "green" }} class="fa-solid fa-circle-check"></i> Đã
          thanh toán
        </p>
        <p style={{ padding: "10px" }}>
          <i
            style={{ color: "orange" }}
            class="fa-solid fa-money-check-dollar"
          ></i>
          Khách hàng gửi yêu cầu xác nhận thanh toán
        </p>
        <p style={{ padding: "10px" }}>
          <i style={{ color: "red" }} class="fa-solid fa-circle-xmark"></i> Chưa
          thanh toán
        </p>
      </div>
      <div style={{ marginTop: "50px" }}>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          columns={columns}
          dataSource={orderData}
        />
        {selectedRowKeys.length > 0 && (
          <div
            style={{
              background: "#1d1ddd",
              color: "#fff",
              fontWeight: "bold",
              padding: "10px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={handleDelteManyUsers}
          >
            Xóa tất cả
          </div>
        )}
      </div>
      <Modal
        title="Chi tiết đơn hàng"
        open={modalDetail}
        onCancel={() => setModalDetail(false)}
        footer={null}
        destroyOnClose={true}
        width={1000}
      >
        <Table
          columns={detailColumn}
          dataSource={singleOrder.item}
          rowKey={(record) => record._id}
        />
      </Modal>
      {/* modal detail */}
    </div>
  );
};

export default Adminuser;
