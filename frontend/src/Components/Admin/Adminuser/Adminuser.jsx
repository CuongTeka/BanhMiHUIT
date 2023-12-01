// import { Button, Form, Input, Modal } from "antd";
// import PlusSquareTwoTone from "@ant-design/icons";
// import React, { useState } from "react";
// import Tableadmin from "../Tableadmin/Tableadmin";
// import { useSelector } from 'react-redux'
// import { useRef } from 'react'
// import { useMutationHooks } from '../../../hooks/useMutationHook.js'

// const Adminuser = () => {
//   const [rowSelected, setRowSelected] = useState('')
//   const [isOpenDrawer, setIsOpenDrawer] = useState(false)
//   const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
//   const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
//   const user = useSelector((state) => state?.user)
//   const searchInput = useRef(null);

//   const [stateUser, setstateUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mssv: "",
//     phone: "",
//     date_create: "",
//     date_update: "",
//     role: "",
//   });

//   const [form] = Form.useForm();

//   const mutationUpdate = useMutationHooks(
//     (data) => {
//       const { id,
//         token,
//         ...rests } = data
//       const res = UserService.updateUser(
//         id,
//         { ...rests }, token)
//       return res
//     },
//   )

//   const mutationDeletedMany = useMutationHooks(
//     (data) => {
//       const { token, ...ids
//       } = data
//       const res = UserService.deleteManyUser(
//         ids,
//         token)
//       return res
//     },
//   )

//   const handleDelteManyUsers = (ids) => {
//     mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
//       onSettled: () => {
//         queryClient.invalidateQueries(['users'])
//       }
//     })
//   }

//   const mutationDeleted = useMutationHooks(
//     (data) => {
//       const { id,
//         token,
//       } = data
//       const res = UserService.deleteUser(
//         id,
//         token)
//       return res
//     },
//   )


//   const onFinish = () => {
//     console.log("finish", stateUser);
//   };

//   return (
//     <div >
//       <h3> QUẢN LÝ NGƯỜI DÙNG</h3>
//       <Button
//         style={{ width: "150px", height: "150px", borderRadius: "5px"}}
//         onClick={() => setisModalOpen(true)}
//       >
//         <PlusSquareTwoTone />
//       </Button>
//       {/* add image */}

//       <div style={{ marginTop: "50px" }}>
//         <Tableadmin handleDelteMany={handleDelteManyUsers} columns={columns} isLoading={isFetchingUser} data={dataTable} onRow={(record, rowIndex) => {
//           return {
//             onClick: event => {
//               setRowSelected(record._id)
//             }
//           };
//         }} />
//       </div>
//       <Modal
//         title="Tạo Người Dùng"
    
//       >
//         <Form
//           name="basic"
//           labelCol={{
//             span: 8,
//           }}
//           wrapperCol={{
//             span: 16,
//           }}
//           style={{
//             maxWidth: 600,
//           }}
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Username"
//             name="username"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your username!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your password!",
//               },
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             wrapperCol={{
//               offset: 8,
//               span: 16,
//             }}
//           >
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Adminuser;
