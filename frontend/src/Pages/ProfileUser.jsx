import React, { useState, useEffect } from "react";
import "./CSS/ProfileUser.css";
import { Form, Input, Button, Table, Modal, message } from "antd";
// import { MyFormItemGroup, MyFormItem } from "../util";
// import { useAuth } from "../Context/authContext";
import {
  handleChangeUserInfo,
  handleChangeUserPass,
  handleGetUserById,
} from "../services/userServices";
import Cookies from "js-cookie";

const ProfileUser = () => {
  var [userData, setuserData] = useState([]);
  const [modalChangepass, setmodalChangepass] = useState(false);
  const [modalChangeinfo, setmodalChangeinfo] = useState(false);
  // const { isLoggedIn } = useAuth();
  const onFinish = async (value) => {
    // console.log(value);
    if (Cookies.get("id") !== undefined) {
      try {
        const updateData = {
          id: Cookies.get("id"),
          email: value.email,
          name: value.name,
          mssv: value.mssv,
          phone: value.phone,
          pass: value.pass,
        };
        const change = await handleChangeUserInfo(updateData);
        console.log(change.message);
        if (change.errCode === 0) {
          setmodalChangeinfo(false);
          message.success("Thay đổi thông tin thành công");
          message.warning("Vui lòng refresh lại trang để cập nhật");
          form.resetFields();
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
    }
  };

  const onChangePassword = async (value) => {
    // console.log(value);
    if (Cookies.get("id") !== undefined) {
      try {
        const updateData = {
          id: Cookies.get("id"),
          oldpass: value.oldpass,
          newpass: value.newpass,
        };
        const change = await handleChangeUserPass(updateData);
        // console.log(change.message)
        if (change.errCode === 0) {
          setmodalChangepass(false);
          message.success("Thay đổi mật khẩu thành công");
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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (Cookies.get("id") !== undefined) {
        try {
          let data = await handleGetUserById(Cookies.get("id"));
          if (data && data.errCode === 0) {
            setuserData(data.data);
          }
        } catch (error) {
          if (error.response) {
            if (error.response.data) {
              console.error(error);
              console.log(error.response.data.message);
            }
          }
        }
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID của bạn",
      dataIndex: "_id",
    },
    {
      title: "Họ Tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Mã số sinh viên",
      dataIndex: "mssv",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
  ];

  const data = [
    {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      mssv: userData.mssv,
      phone: userData.phone,
    },
  ]; //chả hiểu sao load thẳng lên ko dc nên phải qua bước này

  const [form] = Form.useForm();

  return (
    <div className="profileUser">
      <div className="profileUser-header">
        <h1>Thông tin người dùng</h1>
      </div>
      <div className="ProfileUser-content">
        <div className="profileUser-content-input">
          <div>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
          <div className="button-group">
            <button
              className="change-button"
              onClick={() => setmodalChangeinfo(true)}
            >
              <i class="fa-solid fa-pen-to-square"></i> Đổi thông tin
            </button>
            <button
              className="changepass-button"
              onClick={() => setmodalChangepass(true)}
            >
              <i class="fa-solid fa-lock"></i> Đổi mật khẩu
            </button>
          </div>
          <Modal
            title="Thay đổi thông tin tài khoản"
            open={modalChangeinfo}
            onCancel={() => setmodalChangeinfo(false)}
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
              initialValues={{
                name: userData.name,
                email: userData.email,
                mssv: userData.mssv,
                phone: userData.phone,
              }}
            >
              <Form.Item
                label="Họ tên"
                name="name"
                rules={[
                  { required: true, message: "Họ tên không được để trống!" },
                ]}
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
                  {
                    min: 10,
                    message: "Mã số sinh viên phải có ít nhất 10 ký tự",
                  },
                ]}
              >
                <Input placeholder="vd: 200120xxxx" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống!",
                  },
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
                label="Mật khẩu xác nhận"
                name="pass"
                rules={[
                  {
                    required: true,
                    message:
                      "Vui lòng nhập mật khẩu để chứng minh bạn là chủ tài khoản!",
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
                  {" "}
                  Đổi thông tin{" "}
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Đổi mật khẩu"
            open={modalChangepass}
            onCancel={() => setmodalChangepass(false)}
            footer={null}
            destroyOnClose={true}
          >
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={onChangePassword}
              autoComplete="off"
              preserve={false}
            >
              <Form.Item
                label="Mật khẩu cũ"
                name="oldpass"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu cũ!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="newpass"
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
                name="renewpass"
                dependencies={["newpass"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu mới!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newpass") === value) {
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
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  {" "}
                  Đổi mật khẩu{" "}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
