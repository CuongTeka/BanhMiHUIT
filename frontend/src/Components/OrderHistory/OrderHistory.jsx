import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import * as orderService from "../../services/orderService";
import Cookies from "js-cookie";
import { numberFormat, renderImage } from "../../util";
import { Button, Modal, Table, Space, Popconfirm, message } from "antd";

const OrderHistory = () => {
  const [modalDetail, setModalDetail] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [singleOrder, setSingleOrder] = useState([]);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    if (Cookies.get("id") !== undefined) {
      try {
        const orders = await orderService.handleGetOrderByCustomerId(
          Cookies.get("id")
        );
        if (orders && orders.errCode === 0) {
          setOrderData(orders.data);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    }
  }; //lấy dữ liệu từ db

  const handleGetDetail = async (orderId) => {
    const foundOrder = orderData.find((e) => e._id === orderId);
    // console.log(foundOrder);
    setSingleOrder(foundOrder);
    setModalDetail(true);
  };

  const columns = [
    {
      title: "ID Đơn hàng",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => <span>{numberFormat(text)}</span>,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment",
      key: "payment",
      render: (text) => <span>{renderPayment(text)}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => <span>{renderStatus(text)}</span>,
    },
    {
      title: "Đã thanh toán",
      dataIndex: "is_paid",
      render: (paid) => (
        <span style={{ color: paid ? "green" : "red" }}>
          {paid ? (
            <i class="fa-solid fa-circle-check fa-2xl"></i>
          ) : (
            <i class="fa-solid fa-circle-xmark fa-2xl"></i>
          )}
        </span>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "date_create",
      render: (text) =>
        new Date(text).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
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
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        const isCanceled = record.status === "2" || record.status === "1";
        // console.log(isCanceled);
        const isSended = record.checkpaid === true;
        const isCash = record.payment === "Tiền mặt";
        return (
          <Space size="middle">
            <Popconfirm
              title={
                <div>
                  <b>Bạn chắc chắn muốn hủy đơn hàng ?</b>
                  <p style={{ color: "red" }}>
                    Sau khi hủy không thể khôi phục
                  </p>
                </div>
              }
              placement="right"
              onConfirm={() => handleCancelOrder(record._id, null, 2)}
              okText="Hủy đơn"
              cancelText="Không"
              disabled={isCanceled}
            >
              <Button
                style={{ color: "red", width: "60px", height: "60px" }}
                disabled={isCanceled}
              >
                <i class="fa-solid fa-xmark fa-2xl"></i>
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Xác nhận thanh toán"
              description="Xác nhận thanh toán đơn hàng này ?"
              placement="right"
              onConfirm={() => handleSendNoti(record._id)}
              okText="Gửi yêu cầu"
              cancelText="Không"
              disabled={isCanceled || isSended || isCash}
            >
              <Button
                style={{ color: "blue", width: "60px", height: "60px" }}
                disabled={isCanceled || isSended || isCash}
              >
                <i class="fa-solid fa-money-check fa-2xl"></i>
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

  const handleSendNoti = async (id) => {
    try {
      const checkpaid = true;
      await orderService.handleUpdateRequest(id, checkpaid);
      fetchOrderData();
      setModalSuccess(true);
    } catch (error) {
      console.error("Error handle paid order:", error);
      setModalError(true);
    }
  };

  const handleCancelOrder = async (orderId, paid, stat) => {
    try {
      const updateData = {
        is_paid: paid,
        status: stat,
      };
      await orderService.handleUpdateStatus(orderId, updateData);
      fetchOrderData();

      message.success("Cập nhật thành công");
    } catch (error) {
      console.error("Error cancel order:", error);
      message.error("Hủy đơn hàng thất bại: ", error);
    }
  }; //hủy

  const renderStatus = (text) => {
    if (text === "0") {
      return "Đang xử lý";
    } else if (text === "1") {
      return <span style={{ color: "green" }}>Thành công</span>;
    } else {
      return <span style={{ color: "red" }}>Đã hủy</span>;
    }
  };

  const renderPayment = (text) => {
    if (text === "cash") {
      return "Tiền mặt";
    } else {
      return text;
    }
  };

  return (
    <div className="orderhistory">
      <div className="orderhistory-container">
        <h1>Lịch sử mua hàng</h1>

        <div style={{ textAlign: "left", marginLeft: "30px" }}>
          <h2>Tổng số đơn hàng: {orderData.length}</h2>
        </div>

        <Table dataSource={orderData} columns={columns}  />

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
        <Modal
          open={modalSuccess}
          onCancel={() => setModalSuccess(false)}
          onOk={() => setModalSuccess(false)}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{ color: "green", fontSize: "48px", marginBottom: "20px" }}
            >
              <i className="fa-regular fa-circle-check fa-2x"></i>
            </div>
            <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
              GỬI YÊU CẦU THÀNH CÔNG
            </h1>
            <p style={{ fontSize: "16px" }}>
              Chúng tôi sẽ xử lý yêu cầu của bạn ngay lập tức.
            </p>
          </div>
        </Modal>

        <Modal
          open={modalError}
          onCancel={() => setModalError(false)}
          onOk={() => setModalError(false)}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{ color: "red", fontSize: "48px", marginBottom: "20px" }}
            >
              <i className="fa-regular fa-circle-xmark fa-2x"></i>
            </div>
            <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
              GỬI YÊU CẦU THẤT BẠI
            </h1>
            <p style={{ fontSize: "16px" }}>
              Có vẻ như đã xảy ra trục trặc, xin hãy thử lại sau ít phút
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default OrderHistory;
