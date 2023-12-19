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
} from "antd";
import PlusSquareTwoTone from "@ant-design/icons";
// import { useSelector } from "react-redux";
import * as userService from "../../../services/userServices";
const { Option } = Select;

const Adminuser = () => {
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState([]);
  // const user = useSelector((state) => state?.user);
  // const searchInput = useRef(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "MSSV",
      dataIndex: "mssv",
      key: "mssv",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "sdt",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: (role) => <span>{roleText(role)}</span>,
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
    },
    {
      title: "Ngày chỉnh sửa",
      dataIndex: "date_update",
      render: (text) =>
        new Date(text).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa tài khoản"
            description="Bạn có chắc muốn xóa tài khoản ?"
            placement="right"
            onConfirm={() => handleDeleteUser(record._id)}
            onCancel={() => message.info("Đã hủy")}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              disabled={isDeleting}
              style={{ color: "red", width: "60px", height: "60px" }}
            >
              <i class="fa-solid fa-trash fa-lg"></i>
            </Button>
          </Popconfirm>
          <Button
            onClick={() => handleUpdateUser(record._id)}
            style={{ width: "60px", height: "60px" }}
          >
            <i class="fa-solid fa-pen-to-square fa-lg"></i>
          </Button>
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [formU] = Form.useForm();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const users = await userService.handleGetUserById("*");
      if (users && users.errCode === 0) {
        setUserData(users.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }; //lấy dữ liệu từ db

  const handleDeleteUser = async (userId) => {
    setIsDeleting(true);

    try {
      await userService.handleDeleteUser(userId);
      fetchUserData();
      setSelectedRowKeys([]);
      setIsDeleting(false);
      message.success("Xóa tài khoản thành công");
    } catch (error) {
      console.error("Error deleting user:", error);
      setIsDeleting(false);
      message.error("Xóa tài khoản thất bại: ", error);
    }
  }; //xóa (tạm thời tắt)

  const handleUpdateUser = async (userId) => {
    try {
      const data = await userService.handleGetUserById(userId);
      if (data && data.errCode === 0) {
        // console.log(data.data.name);
        setModalUpdate(true);
        formU.setFieldsValue({
          id: userId,
          name: data.data.name,
          email: data.data.email,
          mssv: data.data.mssv,
          phone: data.data.phone,
          role: data.data.role,
        });
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  }; //table render click

  // const cancelDelete = () => {
  //   setIsDeleting(false);
  // };

  const onFinish = async (value) => {
    try {
      const signupData = {
        email: value.email,
        pass: value.pass,
        name: value.name,
        mssv: value.mssv,
        phone: value.phone,
      };
      const create = await userService.handleRegister(signupData);
      // console.log(create.message);
      if (create.errCode === 0) {
        setModalCreate(false);
        message.success("Tạo tài khoản thành công");
        fetchUserData();
        form.resetFields();
      } else {
        message.error("Lỗi: ", create.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          message.error("Lỗi: " + error.response.data.message);
        }
      }
    }
  }; //submit button

  const onUpdate = async (value) => {
    try {
      const updateData = {
        id: value.id,
        email: value.email,
        pass: value.pass,
        name: value.name,
        mssv: value.mssv,
        phone: value.phone,
        role: value.role,
      };
      const change = await userService.handleUpdateUser(updateData);
      console.log(change.message);
      if (change.errCode === 0) {
        setModalUpdate(false);
        message.success("Thay đổi thông tin thành công");
        fetchUserData();
        formU.resetFields();
      } else {
        message.error("Lỗi: ", change.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          message.error("Lỗi: " + error.response.data.message);
        }
      }
    }
  }; //submit update

  const handleDelteManyUsers = async () => {
    if (selectedRowKeys.length > 0) {
      try {
        // await userService.handleDeleteManyUser({ ids: selectedRowKeys });
        fetchUserData();
        setSelectedRowKeys([]);
        message.success("Users deleted successfully");
      } catch (error) {
        console.error("Error deleting users:", error);
        message.error("Failed to delete users");
      }
    }
  }; //xóa nhiều user (tạm thời tắt)

  const roleText = (role) => {
    if (role === "0") {
      return "Khách hàng";
    } else if (role === "1") {
      return (
        <b>
          <i class="fa-solid fa-star"></i> Admin{" "}
          <i class="fa-solid fa-star"></i>
        </b>
      );
    } else {
      return "???";
    }
  }; //render role từ số thành chữ

  return (
    <div>
      <h3>QUẢN LÝ NGƯỜI DÙNG</h3>
      <br />
      <Button
        style={{ width: "100px", height: "100px", borderRadius: "5px" }}
        onClick={() => setModalCreate(true)}
      >
        <PlusSquareTwoTone />
        <i class="fa-solid fa-plus fa-2xl"></i>
      </Button>
      <div style={{ marginTop: "50px" }}>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          columns={columns}
          dataSource={userData}
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
        title="Tạo tài khoản"
        open={modalCreate}
        onCancel={() => setModalCreate(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          preserve={false}
        >
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: "Họ tên không được để trống!" }]}
          >
            <Input placeholder="Trần Văn A..." />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email không được để trống!" },
              { type: "email", message: "Email không đúng định dạng" },
            ]}
          >
            <Input placeholder="abc123@gmail.com..." />
          </Form.Item>
          <Form.Item
            label="Mã số sinh viên"
            name="mssv"
            rules={[
              {
                required: true,
                message: "Mã số sinh viên không được để trống!",
              },
              { min: 10, message: "Mã số sinh viên phải có ít nhất 10 ký tự" },
            ]}
          >
            <Input placeholder="vd: 200120xxxx" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống!" },
              { min: 10, message: "Số điện phải có ít nhất 10 ký tự" },
              {
                pattern:
                  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                message: "Số điện thoại không đúng định dạng",
              },
            ]}
          >
            <Input placeholder="vd: 0957507468" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="pass"
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="repass"
            dependencies={["pass"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("pass") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu vừa nhập không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Vai trò">
            <Select placeholder="Chọn vai trò" defaultValue="0">
              <Option value="0">Khách hàng</Option>
              <Option value="1">Quản trị viên</Option>
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Modal>{" "}
      {/* modal tạo */}
      <Modal
        title="Đổi thông tin"
        open={modalUpdate}
        onCancel={() => setModalUpdate(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={formU}
          name="up"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onUpdate}
          autoComplete="off"
          preserve={false}
        >
          <Form.Item label="ID" name="id">
            <Input disabled={true} />
          </Form.Item>
          {/* hidden id */}
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: "Họ tên không được để trống!" }]}
          >
            <Input placeholder="Trần Văn A..." />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email không được để trống!" },
              { type: "email", message: "Email không đúng định dạng" },
            ]}
          >
            <Input placeholder="abc123@gmail.com..." />
          </Form.Item>
          <Form.Item
            label="Mã số sinh viên"
            name="mssv"
            rules={[
              {
                required: true,
                message: "Mã số sinh viên không được để trống!",
              },
              { min: 10, message: "Mã số sinh viên phải có ít nhất 10 ký tự" },
            ]}
          >
            <Input placeholder="vd: 200120xxxx" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống!" },
              { min: 10, message: "Số điện phải có ít nhất 10 ký tự" },
              {
                pattern:
                  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                message: "Số điện thoại không đúng định dạng",
              },
            ]}
          >
            <Input placeholder="vd: 0957507468" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="pass"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Vai trò">
            <Select placeholder="Chọn vai trò">
              <Option value="0">Khách hàng</Option>
              <Option value="1">Quản trị viên</Option>
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {" "}
              Đổi thông tin{" "}
            </Button>
          </Form.Item>
        </Form>
      </Modal>{" "}
      {/* modal update */}
    </div>
  );
};

export default Adminuser;
