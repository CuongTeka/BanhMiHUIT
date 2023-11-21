import { Button, Form, Input, Modal } from "antd";
import PlusSquareTwoTone from "@ant-design/icons";
import React, { useState } from "react";
import Tableadmin from "../Tableadmin/Tableadmin";


const Adminuser = () => {
  const [isModalOpen, setisModalOpen] = useState(false);

  const handleOk = () => {};

  const handleCancel = () => {
    setisModalOpen(false);
  };
  
  const onFinish = () => {
    console.log("finish");
  };

  return (
    <div>
      <h3> QUẢN LÝ NGƯỜI DÙNG</h3>
      <Button
        style={{ width: "150px", height: "150px", borderRadius: "5px" }}
        onClick={() => setisModalOpen(true)}
      >
        <PlusSquareTwoTone />
      </Button>
      {/* add image */}

      <div style={{ marginTop: "50px" }}>
        <Tableadmin />
      </div>
      <Modal
        title="Tạo Người Dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
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
