import React from "react";
import "./CSS/Loginsignup.css";
import { Link, useNavigate } from "react-router-dom";
import { handleRegister } from "../services/userServices";
import { Button, Form, Input, notification, Alert } from "antd";

notification.config({
  placement: "top",
  stack: 1,
});

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errMessage, setMessage] = React.useState("");

  const onFinish = async (value) => {
    try {
      const signupData = {
        email: value.email,
        pass: value.pass,
        name: value.name,
        mssv: value.mssv,
        phone: value.phone,
      };
      const create = await handleRegister(signupData);
      if (create.errCode === 0) {
        // message.success("Tạo tài khoản thành công");
        notification.success({
          message: "Tạo tài khoản thành công",
          description: "Vui lòng đăng nhập để tiếp tục",
        });
        form.resetFields();
        navigate("/signin");
      } else {
        setMessage(create.message);
        // notification.error({
        //   message: "Tạo tài khoản thất bại",
        //   description: create.message,
        // });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          // message.error("Lỗi: " + error.response.data.message);
          // notification.error({
          //   message: "Tạo tài khoản thất bại",
          //   description: error.response.data.message,
          // });
          setMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Đăng Ký</h1>
        <Form
          form={form}
          name="singup"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 160 }}
          style={{ maxWidth: 1000 }}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            // label="Họ tên"
            name="name"
            rules={[{ required: true, message: "Họ tên không được để trống!" }]}
          >
            <Input placeholder="Họ tên" style={{ fontSize: "20px" }} />
          </Form.Item>
          <Form.Item
            // label="Email"
            name="email"
            rules={[
              { required: true, message: "Email không được để trống!" },
              { type: "email", message: "Email không đúng định dạng" },
            ]}
          >
            <Input placeholder="Email" style={{ fontSize: "20px" }} />
          </Form.Item>
          <Form.Item
            // label="Mã số sinh viên"
            name="mssv"
            rules={[
              {
                required: true,
                message: "Mã số sinh viên không được để trống!",
              },
              { min: 10, message: "Mã số sinh viên phải có ít nhất 10 ký tự" },
            ]}
          >
            <Input placeholder="Mã số sinh viên" style={{ fontSize: "20px" }} />
          </Form.Item>
          <Form.Item
            // label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống!" },
              {
                pattern:
                  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                message: "Số điện thoại không đúng định dạng",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" style={{ fontSize: "20px" }} />
          </Form.Item>
          <Form.Item
            // label="Mật khẩu"
            name="pass"
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              style={{ fontSize: "20px" }}
            />
          </Form.Item>
          <Form.Item
            // label="Xác nhận mật khẩu"
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
            <Input.Password
              placeholder="Xác nhận mật khẩu"
              style={{ fontSize: "20px" }}
            />
          </Form.Item>
          {errMessage && (
            <Alert
              description={<div style={{ color: "red" }}>{errMessage}</div>}
              type="error"
              showIcon
              style={{
                textAlign: "center",
                marginBottom: "16px",
                color: "red",
              }}
            />
          )}
          <Form.Item
            wrapperCol={{
              span: 100,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ fontSize: "20px", width: "100%" }}
              block
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
        {/* <button type="submit">Tiếp Tục</button> */}

        <p className="loginsignup-login">
          Đã có tài khoản ?{" "}
          <Link to="/signin">
            <span>Đăng Nhập</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
