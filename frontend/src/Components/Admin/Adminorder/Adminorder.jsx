import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Space,
  Table,
  Popconfirm,
  message,
  Input,
  Select,
} from "antd";
import * as orderService from "../../../services/orderService";
import { numberFormat, renderImage } from "../../../util";
const { Search } = Input;
const { Option } = Select;

const Adminuser = () => {
  const [modalDetail, setModalDetail] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [singleOrder, setSingleOrder] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState("customer.name");
  const [filteredData, setFilteredData] = useState(orderData);
  // const user = useSelector((state) => state?.user);
  // const searchInput = useRef(null);

  const getNestedPropertyValue = (obj, path) => {
    const keys = path.split(".");
    return keys.reduce((acc, key) => acc?.[key], obj);
  };

  const handleSearch = () => {
    const lowerSearchText = searchText.toLowerCase();
    const filtered = orderData.filter((record) => {
      if (searchColumn === "_id") {
        const columnValue =
          (record.hasOwnProperty(searchColumn) &&
            record[searchColumn]?.toString()) ||
          "";
        return columnValue.includes(lowerSearchText);
      } else if (searchColumn === "date_create") {
        const columnValue = new Date(record[searchColumn])
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .toLowerCase();
        return columnValue.includes(lowerSearchText);
      } else if (searchColumn === "customer.name") {
        // Handle nested property
        const columnValue =
          getNestedPropertyValue(record, searchColumn)
            ?.toString()
            .toLowerCase() || "";
        return columnValue.includes(lowerSearchText);
      }
      return false;
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchText("");
    setFilteredData(orderData);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
      sorter: (a, b) => a._id.localeCompare(b._id),
      sortDirections: ["descend", "ascend"],
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
      sorter: (a, b) => a.total - b.total,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment",
      key: "payment",
      responsive: ["sm"],
      render: (text) => <span>{renderCash(text)}</span>,
      sorter: (a, b) => a.payment.localeCompare(b.payment),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => <span>{renderStatus(text)}</span>,
      responsive: ["sm"],
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["descend", "ascend"],
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
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      responsive: ["sm"],
      sorter: (a, b) => new Date(a.date_create) - new Date(b.date_create),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "TG giao",
      dataIndex: "deliTime",
      key: "deliTime",
      render: (text) =>
        new Date(text).toLocaleDateString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      sorter: (a, b) => new Date(a.date_create) - new Date(b.date_create),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Địa điểm giao",
      dataIndex: "deliLocation",
      key: "deliLocation",
      render: (text) => <span>{renderLocation(text)}</span>,
      sorter: (a, b) => a.deliLocation.localeCompare(b.deliLocation),
      sortDirections: ["descend", "ascend"],
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
    handleSearch();
  }, [searchText, searchColumn, orderData]);

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

  const renderCash = (text) => {
    if (text && text === "cash") {
      return "Tiền mặt";
    } else {
      return text;
    }
  };

  const renderLocation = (text) => {
    if (text === "0") {
      return "Căn tin trường";
    } else if (text === "1") {
      return "Sảnh A";
    } else if (text === "2") {
      return "Sảnh B";
    } else if (text === "3") {
      return "Sảnh AB";
    } else if (text === "4") {
      return "Cổng trước";
    } else if (text === "5") {
      return "Cổng phụ";
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
          ></i>{" "}
          Khách hàng gửi yêu cầu xác nhận thanh toán
        </p>
        <p style={{ padding: "10px" }}>
          <i style={{ color: "red" }} class="fa-solid fa-circle-xmark"></i> Chưa
          thanh toán
        </p>
      </div>
      <div style={{ margin: "50px" }}>
        <div style={{ textAlign: "center" }}>
          <Search
            placeholder={`Tìm kiếm theo ${searchColumn}`}
            enterButton
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 400, marginRight: 8 }}
          />
          <Select
            defaultValue="customer.name"
            style={{ width: 200 }}
            onChange={(value) => setSearchColumn(value)}
          >
            <Option value="_id">ID Đơn hàng</Option>
            <Option value="customer.name">Tên khách hàng</Option>
            <Option value="date_create">Ngày đặt</Option>
          </Select>
          <Button
            type="primary"
            onClick={handleSearch}
            style={{ marginLeft: 8 }}
          >
            Tìm kiếm
          </Button>
          <Button onClick={handleReset} style={{ marginLeft: 8 }}>
            Đặt lại
          </Button>
        </div>
        <Table columns={columns} dataSource={filteredData} />
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
