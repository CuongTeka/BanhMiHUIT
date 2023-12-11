import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input, Modal, Space, Table, Popconfirm, message } from "antd";
import PlusSquareTwoTone from "@ant-design/icons";
import { useSelector } from "react-redux";
import * as userService from "../../../services/userServices";

const Adminuser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState([]);
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);

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
      render: (text) => <a>{text}</a>
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
      render: (text) => new Date(text).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    },
    {
      title: "Ngày chỉnh sửa",
      dataIndex: "date_update",
      render: (text) => new Date(text).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
           <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={con}
              onCancel={can}
              okText="Yes"
              cancelText="No"
            >
            <a href="#" onClick={() => handleDeleteUser(record._id)} disabled={isDeleting}>
              <i class="fa-solid fa-trash"></i> Xóa
            </a>
            </Popconfirm>
          
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();

  const con = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };//cho popconfirm trong column
  
  const can = (e) => {
    console.log(e);
    message.error('Click on No');
  };//cho popconfirm trong column

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const users = await userService.handleGetUserById('*');
      if (users && users.errCode === 0) {
        setUserData(users.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };//lấy dữ liệu từ db

  const handleDeleteUser = async (userId) => {
    setIsDeleting(true);

    try {
      // await userService.handleDeleteUser(userId);
      fetchUserData();
      setSelectedRowKeys([]);
      setIsDeleting(false);
      message.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      setIsDeleting(false);
      message.error("Failed to delete user");
    }
  };//xóa (tạm thời tắt)

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  const onFinish = async (values) => {
    try {
      await userService.handleRegisterApi({
        email: values.username,
        pass: values.password,
        name: values.name,
        mssv: values.mssv,
        phone: values.phone,
      });

      message.success("User created successfully");
      setIsModalOpen(false);
      fetchUserData();
    } catch (error) {
      console.error("Error creating user:", error);
      message.error("Failed to create user");
    }
  };//

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
  };//xóa nhiều user (tạm thời tắt)

  const roleText = (role) => {
    if (role === '0') {
      return 'Khách hàng';
    } else if (role === '1') {
      return <b><i class="fa-solid fa-star"></i> Admin <i class="fa-solid fa-star"></i></b>;
    } else {
      return '???';
    }
  };//render role từ số thành chữ

  return (
    <div>
      <h3>QUẢN LÝ NGƯỜI DÙNG</h3>
      <Button style={{ width: "150px", height: "150px", borderRadius: "5px" }} onClick={() => setIsModalOpen(true)}>
        <PlusSquareTwoTone />
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

      <Modal title="Tạo Người Dùng" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <Form form={form} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} onFinish={onFinish} autoComplete="off">
        <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Adminuser;
