import { Button, Form, Modal, Upload } from "antd";
import PlusSquareTwoTone from "@ant-design/icons";
import React, { useState } from "react";
import Tableadmin from "../Tableadmin/Tableadmin";
import InputComponent from "../../InputComponent/InputComponent";
import { UploadOutlined } from '@ant-design/icons';

const Adminproduct = () => {
  const [isModalOpen, setisModalOpen] = useState(false);

  const [stateProduct, setstateProduct] = useState({
    id: "",
    name: "",
    category: "",
    image: "",
    new_price: "",
    detail: "",
  });

  const handleCancel = () => {
    setisModalOpen(false);
  };

  const onFinish = () => {
    console.log("finish", stateProduct);
  };

  const handleonChange = (e) => {
    setstateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  };

  return (
    <div>
      <h3> QUẢN LÝ SẢN PHẨM</h3>
      <Button
        style={{ width: "150px", height: "150px", borderRadius: "5px" }}
        onClick={() => setisModalOpen(true)}
      >
        <PlusSquareTwoTone />
      </Button>
      <div style={{ marginTop: "50px" }}>
        <Tableadmin />
      </div>
      <Modal title="Tạo Sản Phẩm" open={isModalOpen} onCancel={handleCancel} okText="">
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
            label="Id"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input id product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.id}
              onChange={handleonChange}
              id="id"
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.name}
              onChange={handleonChange}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input category product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.category}
              onChange={handleonChange}
              category="category"
            />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            rules={[
              {
                required: true,
                message: "Please input image product!",
              },
            ]}
            getValueFromEvent={(e) => e && e.fileList}
          >
            <Upload
              name="image"
              // value={stateProduct.image}
              listType="picture"
              // customRequest={customRequest}
              // onChange={handleonChange}
              // image="image"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="New_price"
            name="new_price"
            rules={[
              {
                required: true,
                message: "Please input new price product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.new_price}
              onChange={handleonChange}
              new_price="new_prie"
            />
          </Form.Item>

          <Form.Item
            label="Detail"
            name="detail"
            rules={[
              {
                required: true,
                message: "Please input detail product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.detail}
              onChange={handleonChange}
              detail="detail"
            />
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

export default Adminproduct;
