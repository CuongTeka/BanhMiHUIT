import React, { useState } from "react";
import "./CSS/SignIn.css";
import { Link } from "react-router-dom";
import {
  handleChangePassForget,
  handleCheckOTP,
  handleLoginApi,
  handleSendEmail,
} from "../services/userServices";
import Cookies from "js-cookie";
import { useAuth } from "../Context/authContext";
import {
  Button,
  Form,
  Input,
  notification,
  Alert,
  Modal,
  Col,
  Row,
} from "antd";

notification.config({
  placement: "top",
  stack: 1,
});

const SignIn = () => {
  const { login, grantAdmin, setUser } = useAuth();
  const [errMessage, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [form] = Form.useForm(); //login
  const [formF] = Form.useForm(); //form forget
  const [formC] = Form.useForm(); //form change
  const [modalForget, setModalForget] = useState(false);
  const [modalChangepass, setmodalChangepass] = useState(false);

  const onFinish = async (value) => {
    setMessage("");
    try {
      let data = await handleLoginApi(value.email, value.pass);
      // console.log(data.message);
      if (data && data.errCode !== 0) {
        setMessage(data.message);
      }
      if (data && data.errCode === 0) {
        // setMessage(data.user.role)
        login();
        Cookies.set("id", data.user._id);
        if (data.user.role === "1") {
          grantAdmin();
          // navigate("/system/admin");
          window.location.href = "/system/admin";
        } else {
          setUser();
          // navigate("/")
          window.location.href = "/";
        }
        console.log("login success");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          // message.error("Lỗi: " + error.response.data.message);
          notification.error({
            message: "Đăng nhập thất bại",
            description: error.response.data.message,
          });
        }
      }
    }
  };

  const onForget = async (value) => {
    try {
      console.log(value.email + value.otp);
      let data = await handleCheckOTP(value.email, value.otp);
      if (data && data.errCode === 0) {
        //success
        console.log("ok");
        if (formF.getFieldValue("email") !== null) {
          const emailValue = formF.getFieldValue("email");

          formC.setFieldsValue({
            email: emailValue,
          });
        }

        setModalForget(false);
        setmodalChangepass(true);
      } else {
        //fail
        console.log("no ok");
        notification.error({
          message: "Lỗi:",
          description: data.message,
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          notification.error({
            message: "Lỗi:",
            description: error.response.data.message,
          });
        }
      }
    }
  };

  const onChangePassword = async (value) => {
    try {
      const change = await handleChangePassForget(value.email, value.newpass);
      if (change.errCode === 0) {
        setmodalChangepass(false);
        notification.success({
          message: "Đổi mật khẩu thành công",
          description: "Vui lòng đăng nhập bằng mật khẩu mới",
        });
      } else {
        notification.error({
          message: "Đổi mật khẩu thất bại",
          description: change.message,
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          notification.error({
            message: "Lỗi:",
            description: error.response.data.message,
          });
        }
      }
    }
  };

  const onSend = async (email) => {
    if (isCooldown) {
      notification.error({
        message: "Lỗi: gửi yêu cầu quá nhanh",
        description: "Vui lòng thử lại sau ít phút",
      });
      return;
    }
    setIsLoading(true);
    try {
      let send = await handleSendEmail(email);
      if (send && send.errCode === 0) {
        notification.success({
          message: "Gửi mã thành công",
          description: "Vui lòng kiểm tra email",
        });
      } else {
        notification.error({
          message: "Gửi mã thất bại",
          description: "Vui lòng thử lại sau ít phút",
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          notification.error({
            message: "Lỗi",
            description: error.response.data.message,
          });
        }
      }
    } finally {
      setIsLoading(false);

      // Set cooldown to true and schedule it to reset after 1 minute
      setIsCooldown(true);
      setTimeout(() => {
        setIsCooldown(false);
      }, 60000); // 1 minute cooldown
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <h1>Đăng Nhập</h1>
        <Form
          form={form}
          name="signin"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 160 }}
          style={{ maxWidth: 1000 }}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            // label="Email"
            name="email"
            rules={[
              { required: true, message: "Email không được để trống!" },
              { type: "email", message: "Email không đúng định dạng" },
            ]}
          >
            <Input
              placeholder="Email"
              style={{ fontSize: "20px" }}
              id="email"
            />
          </Form.Item>
          <Form.Item
            // label="Mật khẩu"
            name="pass"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              style={{ fontSize: "20px" }}
              id="password"
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
          <Form.Item style={{ textAlign: "right" }}>
            <Link
              style={{ fontSize: "16px" }}
              onClick={() => setModalForget(true)}
            >
              Quên mật khẩu?
            </Link>
          </Form.Item>
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
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>

        <p className="signin-login">
          Chưa có tài khoản ?{" "}
          <Link to="/signup">
            <span>Đăng Ký</span>
          </Link>
        </p>
      </div>
      <Modal
        title="Quên mật khẩu"
        open={modalForget}
        onCancel={() => setModalForget(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={formF}
          name="forget"
          labelCol={{ span: 8 }}   
          style={{ maxWidth: 400 }}
          onFinish={onForget}
          autoComplete="off"
          preserve={false}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email không được để trống!" },
              { type: "email", message: "Email không đúng định dạng" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Mã OTP"
            extra="Nhập email và bấm nút gửi mã, sau đó nhập mã mà bạn nhận được"
          >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="otp"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã OTP mà bạn nhận được!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  loading={isLoading}
                  onClick={() => onSend(formF.getFieldValue("email"))}
                >
                  Gửi mã
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* quên mk */}
      <Modal
        title="Đổi mật khẩu"
        open={modalChangepass}
        onCancel={() => setmodalChangepass(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={formC}
          name="change"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onChangePassword}
          autoComplete="off"
          preserve={false}
        >
          <Form.Item name="email" hidden="true">
            <Input disabled="true" />
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
  );
};
export default SignIn;
