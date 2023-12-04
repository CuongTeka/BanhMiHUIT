import { Button, Form, Modal, Upload } from "antd";
import PlusSquareTwoTone from "@ant-design/icons";
import React, { useState } from "react";
import Tableadmin from "../Tableadmin/Tableadmin";
import InputComponent from "../../InputComponent/InputComponent";
import { UploadOutlined } from "@ant-design/icons";

const Adminproduct = () => {
  const [isModalOpen, setisModalOpen] = useState(false);

  const [stateProduct, setstateProduct] = useState({
    name: "",
    category_id: "",
    image: "",
    price: "",
    detail: "",
    date_create: "",
    date_edit: "",
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
      [e.target.name]: e.target.value,
    });
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
      <Modal
        title="Tạo Sản Phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        okText=""
      >
        <Form
          name="basic"
          labelCol={{span: 8,}}
          wrapperCol={{span: 16,}}
          style={{maxWidth: 600,}}
          initialValues={{remember: true,}}
          onFinish={onFinish}
          autoComplete="off"
        >
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
            label="Category_id"
            name="category_id"
            rules={[
              {
                required: true,
                message: "Please input category product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.category_id}
              onChange={handleonChange}
              category_id="category_id"
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
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input new price product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleonChange}
              price="price"
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
            label="Date_create"
            name="date_create"
            rules={[
              {
                required: true,
                message: "Please input category product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.date_create}
              onChange={handleonChange}
              date_create="date_create"
            />
          </Form.Item>
          <Form.Item
            label="Date_edit"
            name="date_edit"
            rules={[
              {
                required: true,
                message: "Please input category product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.date_edit}
              onChange={handleonChange}
              date_edit="date_edit"
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
