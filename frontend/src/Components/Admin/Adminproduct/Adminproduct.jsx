import { Button, Form, Modal, Upload } from "antd";
import PlusSquareTwoTone from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import Tableadmin from "../Tableadmin/Tableadmin";
import InputComponent from "../../InputComponent/InputComponent";
import { UploadOutlined } from "@ant-design/icons";
import { handleCreateProduct, handleDeleteProduct, handleUpdateProduct, handleGetProductById } from "../../../services/productService"

const Adminproduct = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [stateProduct, setstateProduct] = useState({
    name: "",
    category_id: "",
    image: "",
    price: "",
    detail: "",
    date_create: "",
    date_edit: "",
  });

  // Function to fetch product data when editing
  const fetchProductData = async (productId) => {
    try {
      const response = await handleGetProductById(productId);
      const productData = response.data; // Assuming your API returns the product data
      setstateProduct(productData);
    } catch (error) {
      console.error("Error fetching product data:", error);
      // Handle error, e.g., show a notification to the user
    }
  };
  
  useEffect(() => {
    // Fetch product data when editingProductId changes
    if (editingProductId) {
      fetchProductData(editingProductId);
    }
  }, [editingProductId]);

  const handleCancel = () => {
    setisModalOpen(false);
    setEditingProductId(null);
  };

  const onFinish = () => {
    if (editingProductId) {
      handleUpdateProduct(editingProductId, stateProduct.name, stateProduct.category_id, stateProduct.detail, stateProduct.price, stateProduct.image);
    } else {
      handleCreateProduct(stateProduct.name, stateProduct.category_id, stateProduct.detail, stateProduct.price, stateProduct.image);
    }
    setisModalOpen(false);
    setEditingProductId(null); // Clear editing state after submit
    console.log("finish", stateProduct);
  };

  const handleDelete = (productId) => {
    handleDeleteProduct(productId)
      .then(() => {
        // Optional: Fetch updated product list or update UI as needed
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Handle error, e.g., show a notification to the user
      });
  };

  const handleEdit = (productId) => {
    // Handle product editing
    setEditingProductId(productId);
    setisModalOpen(true);
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
        onClick={() => {
          setstateProduct({
            name: "",
            category_id: "",
            image: "",
            price: "",
            detail: "",
            date_create: "",
            date_edit: "",
          });
          setEditingProductId(null); // Clear editing state when adding new product
          setisModalOpen(true);
        }}
      >
        <PlusSquareTwoTone />
      </Button>
      <div style={{ marginTop: "50px" }}>
        <Tableadmin onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <Modal
       title={editingProductId ? "Sửa Sản Phẩm" : "Tạo Sản Phẩm"}
       open={isModalOpen}
        onCancel={handleCancel}
        okText="Submit"
        onOk={onFinish}
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
        <Tableadmin/>
      </Modal>
    </div>
  );
};

export default Adminproduct;
