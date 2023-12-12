// import React, { useState, useRef, useEffect } from "react";
// import { Button, Form, Input, Modal, Space, Table, Popconfirm, message } from "antd";
// import PlusSquareTwoTone from "@ant-design/icons";
// import { useSelector } from "react-redux";
// import * as userService from "../../../services/userServices.js";

// const Adminuser = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [userData, setUserData] = useState([]);
//   const user = useSelector((state) => state?.user);
//   const searchInput = useRef(null);

//   const columns = [
//     {
//       title: "Username",
//       dataIndex: "username",
//       key: "username",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space size="middle">
//           <a href="#" onClick={() => handleDeleteUser(record._id)} disabled={isDeleting}>
//             Delete
//           </a>
//         </Space>
//       ),
//     },
//   ];

//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const users = await userService.getDetailsUser('*');
//       setUserData(users);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     setIsDeleting(true);

//     try {
//       await userService.handleDeleteUser(userId);
//       fetchUserData();
//       setSelectedRowKeys([]);
//       setIsDeleting(false);
//       message.success("User deleted successfully");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       setIsDeleting(false);
//       message.error("Failed to delete user");
//     }
//   };

//   const cancelDelete = () => {
//     setIsDeleting(false);
//   };

//   const onFinish = async (values) => {
//     try {
//       await userService.handleRegisterApi({
//         email: values.username,
//         pass: values.password,
//         name: values.name,
//         mssv: values.mssv,
//         phone: values.phone,
//       });

//       message.success("User created successfully");
//       setIsModalOpen(false);
//       fetchUserData();
//     } catch (error) {
//       console.error("Error creating user:", error);
//       message.error("Failed to create user");
//     }
//   };

//   const handleDelteManyUsers = async () => {
//     if (selectedRowKeys.length > 0) {
//       try {
//         await userService.hanldedeleteManyUser({ ids: selectedRowKeys }, user?.access_token);
//         fetchUserData();
//         setSelectedRowKeys([]);
//         message.success("Users deleted successfully");
//       } catch (error) {
//         console.error("Error deleting users:", error);
//         message.error("Failed to delete users");
//       }
//     }
//   };

//   return (
//     <div>
//       <h3>QUẢN LÝ NGƯỜI DÙNG</h3>
//       <Button style={{ width: "150px", height: "150px", borderRadius: "5px" }} onClick={() => setIsModalOpen(true)}>
//         <PlusSquareTwoTone />
//       </Button>

//       <div style={{ marginTop: "50px" }}>
//         <Table
//           rowSelection={{
//             selectedRowKeys,
//             onChange: (keys) => setSelectedRowKeys(keys),
//           }}
//           columns={columns}
//           dataSource={userData}
//         />
//         {selectedRowKeys.length > 0 && (
//           <div
//             style={{
//               background: "#1d1ddd",
//               color: "#fff",
//               fontWeight: "bold",
//               padding: "10px",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//             onClick={handleDelteManyUsers}
//           >
//             Xóa tất cả
//           </div>
//         )}
//       </div>

//       <Modal title="Tạo Người Dùng" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
//         <Form form={form} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} onFinish={onFinish} autoComplete="off">
//           {/* Form items */}
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Adminuser;
