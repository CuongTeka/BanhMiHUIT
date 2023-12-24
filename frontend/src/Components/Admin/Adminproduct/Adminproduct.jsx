import {
  Button,
  Form,
  Modal,
  Upload,
  Popconfirm,
  message,
  Select,
  Input,
  Space,
  Table,
  Switch,
  notification,
} from "antd";
import PlusSquareTwoTone from "@ant-design/icons";
import React, { useState, useEffect } from "react";
// import Tableadmin from "../Tableadmin/Tableadmin";
// import InputComponent from "../../InputComponent/InputComponent";
import { UploadOutlined } from "@ant-design/icons";
import * as proService from "../../../services/productService";
import { numberFormat, renderImage } from "../../../util";
const { Option } = Select;
const { Search } = Input;

const Adminproduct = () => {
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  // const [imageData, setImageData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [productData, setProductData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [filteredData, setFilteredData] = useState(productData);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
      sorter: (a, b) => a._id.localeCompare(b._id),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Danh mục",
      dataIndex: "category_id",
      render: (category_id) => <span>{renderCategory(category_id)}</span>,
      sorter: (a, b) => a.category_id.localeCompare(b.category_id),
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Chi tiết",
    //   dataIndex: "detail",
    //   key: "detail",
    //   responsive: ["sm"],
    // },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{numberFormat(text)}</span>,
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (text) => <span>{text} %</span>,
      sorter: (a, b) => a.discount - b.discount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "hình ảnh",
      dataIndex: "image",
      render: (image) => (
        <img
          src={renderImage(image)}
          alt={renderImage(image)}
          width={100}
          height={100}
        ></img>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "date_create",
      render: (text) =>
        new Date(text).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      sorter: (a, b) => new Date(a.date_create) - new Date(b.date_create),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ngày chỉnh sửa",
      dataIndex: "date_edit",
      render: (text) =>
        new Date(text).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      sorter: (a, b) => new Date(a.date_edit) - new Date(b.date_edit),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hiển thị",
      dataIndex: "is_active",
      // render: (isActive) => (
      //   <span style={{ color: isActive ? "green" : "red" }}>
      //     {isActive ? "True" : "False"}
      //   </span>
      // ),
      render: (text, record) => (
        <Switch
          checked={text}
          onChange={(checked) => handleSwitchChange(record._id, checked)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc muốn xóa sản phẩm ?"
            placement="right"
            onConfirm={() => handleDeleteProduct(record._id)}
            onCancel={() => message.info("Đã hủy")}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              disabled={isDeleting}
              style={{ color: "red", width: "60px", height: "60px" }}
            >
              <i class="fa-solid fa-trash fa-lg"></i>
            </Button>
          </Popconfirm>
          <Button
            onClick={() => handleUpdateProductForForm(record._id)}
            style={{ width: "60px", height: "60px" }}
          >
            <i class="fa-solid fa-pen-to-square fa-lg"></i>
          </Button>
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [formU] = Form.useForm();

  useEffect(() => {
    fetchProductData();
    if (singleData.image) {
      setFileList([
        {
          uid: "-1",
          name: singleData.image,
          status: "done",
          url: renderImage(singleData.image),
        },
      ]);
    }
    setFilteredData(productData);
  }, [singleData, productData]);

  useEffect(() => {
    handleSearch();
  }, [searchText, searchColumn, productData]);

  const handleSearch = () => {
    const lowerSearchText = searchText.toLowerCase();
    const filtered = productData.filter((record) => {
      if (
        searchColumn === "_id" ||
        searchColumn === "name" ||
        searchColumn === "price"
      ) {
        const columnValue =
          (record.hasOwnProperty(searchColumn) &&
            record[searchColumn]?.toString()) ||
          "";
        return columnValue.toLowerCase().includes(lowerSearchText);
      } else if (
        searchColumn === "date_create" ||
        searchColumn === "date_edit"
      ) {
        const columnValue = new Date(record[searchColumn])
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .toLowerCase();
        return columnValue.includes(lowerSearchText);
      }
      return false;
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchText("");
    setFilteredData(productData);
  };

  const handleSwitchChange = async (id, checked) => {
    try {
      const data = { is_active: checked };
      const active = await proService.changeActive(id, data);
      if (active && active.errCode === 0) {
        message.success("Đổi hiển thị thành công");
        fetchProductData();
      } else {
        message.error("Đổi hiển thị thất bại:" + active.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const pros = await proService.handleGetProductById("all");
      if (pros && pros.errCode === 0) {
        setProductData(pros.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }; //lấy dữ liệu từ db

  const handleDeleteProduct = async (proId) => {
    setIsDeleting(true);
    try {
      await proService.handleDeleteProduct(proId);
      fetchProductData();
      setSelectedRowKeys([]);
      setIsDeleting(false);
      message.success("Xóa sản phẩm thành công");
    } catch (error) {
      console.error("Error deleting product:", error);
      setIsDeleting(false);
      message.error("Xóa sản phẩm thất bại: ", error);
    }
  }; //xóa (tạm thời tắt)

  const handleUpdateProductForForm = async (proId) => {
    try {
      const data = await proService.handleGetProductById(proId);
      if (data && data.errCode === 0) {
        // console.log(data.data.name);
        setSingleData(data.data);
        setModalUpdate(true);
        formU.setFieldsValue({
          id: proId,
          name: data.data.name,
          category_id: data.data.category_id,
          detail: data.data.detail,
          price: data.data.price,
          discount: data.data.discount,
          image: data.data.image,
        });
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  }; //table render click

  const onFinish = async (value) => {
    try {
      const productData = {
        name: value.name,
        category_id: value.category_id,
        detail: value.detail,
        price: value.price,
        discount: value.discount,
        image: value.image.file,
        is_active: value.is_active,
      };
      console.log(productData);
      const create = await proService.handleCreateProduct(productData);
      console.log(create.message);
      if (create.errCode === 0) {
        setModalCreate(false);
        message.success("Tạo sản phẩm thành công");
        fetchProductData();
        form.resetFields();
      } else {
        message.error("Lỗi: ", create.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          message.error("Lỗi: " + error.response.data.message);
        }
      }
    }
  }; //submit button

  const onUpdate = async (value) => {
    try {
      const updateData = {
        id: value.id,
        name: value.name,
        category_id: value.category_id,
        detail: value.detail,
        price: value.price,
        discount: value.discount,
        image: typeof value.image === "string" ? value.image : value.image.file,
      };
      console.log(value.image);
      // console.log(value.id);
      const change = await proService.handleUpdateProduct(updateData);
      console.log(change.message);
      if (change.errCode === 0) {
        setModalUpdate(false);
        message.success("Thay đổi thông tin thành công");
        fetchProductData();
        formU.resetFields();
      } else {
        notification.error({
          message: "Tạo tài khoản thất bại",
          description: change.message,
        });
        console.log(change.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          console.log(error.response.data.message);
        }
      }
    }
  }; //submit update

  const handleDeleteMany = async () => {
    if (selectedRowKeys.length > 0) {
      // try {
      //   // await userService.handleDeleteManyUser({ ids: selectedRowKeys });
      //   fetchUserData();
      //   setSelectedRowKeys([]);
      //   message.success("Users deleted successfully");
      // } catch (error) {
      //   console.error("Error deleting users:", error);
      //   message.error("Failed to delete users");
      // }
    }
  }; //xóa nhiều (tạm thời tắt)

  const renderCategory = (cateid) => {
    if (cateid === "653c5f91eee1ad0711267a15") {
      return "Bánh mì";
    } else if (cateid === "653c5f91eee1ad0711267a16") {
      return "Thức uống";
    } else {
      return "Món ăn vặt";
    }
  }; //static cố định vì chỉ bán 3 loại thôi

  const beforeUpload = (file) => {
    // Your validation logic here
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG images!");
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    console.log(file);
    // Return false to prevent automatic upload if validation fails
    return isJpgOrPng && isLt2M;
  };

  const handleImageChange = ({ fileList }) => {
    const updatedFileList = fileList.map((file) =>
      file.url ? file : { ...file, url: renderImage(file) }
    );
    console.log(fileList);
    setFileList(updatedFileList);
    // setFileList(fileList);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    if (fileList[0] && fileList[0].url === singleData.image) {
      // File didn't change, no need to make an API call
      onSuccess(message.info(`${singleData.image} ảnh cũ giữ nguyên.`));
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const upload = await proService.handleUploadImage(formData);
    if (upload.errCode === 0) {
      onSuccess(message.success(`${file.name} được tải thành công.`));
    } else {
      onError(message.error(`${file.name} tải lên thất bại.`));
    }
  };

  return (
    <div>
      <h3>QUẢN LÝ SẢN PHẨM</h3>
      <br />
      <Button
        style={{ width: "100px", height: "100px", borderRadius: "5px" }}
        onClick={() => setModalCreate(true)}
      >
        <PlusSquareTwoTone />
        <i class="fa-solid fa-plus fa-2xl"></i>
      </Button>
      <div style={{ textAlign: "center" }}>
        <Search
          placeholder={`Tìm kiếm theo ${searchColumn}`}
          enterButton
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 400, marginRight: 8 }}
        />
        <Select
          defaultValue="name"
          style={{ width: 200 }}
          onChange={(value) => setSearchColumn(value)}
        >
          <Option value="_id">ID Sản phẩm</Option>
          <Option value="name">Tên sản phẩm</Option>
          <Option value="price">Đơn giá</Option>
          <Option value="date_create">Ngày tạo</Option>
          <Option value="date_edit">Ngày chỉnh sửa</Option>
        </Select>
        <Button onClick={handleReset} style={{ marginLeft: 8 }}>
          Đặt lại
        </Button>
      </div>
      <div style={{ marginTop: "50px" }}>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          columns={columns}
          dataSource={filteredData}
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
            onClick={handleDeleteMany}
          >
            Xóa tất cả
          </div>
        )}
      </div>
      <Modal
        title="Tạo sản phẩm"
        open={modalCreate}
        onCancel={() => setModalCreate(false)}
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
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            hasFeedback
            rules={[
              { required: true, message: "Tên sản phẩm không được để trống!" },
            ]}
          >
            <Input placeholder="Bánh mì..." />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Danh mục"
            hasFeedback
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục">
              <Option value="653c5f91eee1ad0711267a15">Bánh mì</Option>
              <Option value="653c5f91eee1ad0711267a16">Thức uống</Option>
              <Option value="653c5f91eee1ad0711267a17">Món ăn vặt</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Chi tiết" name="detail">
            <Input.TextArea
              showCount
              maxLength={600}
              placeholder="Chi tiết về sản phẩm..."
            />
          </Form.Item>
          <Form.Item
            label="Đơn giá"
            name="price"
            hasFeedback
            rules={[
              { required: true, message: "Đơn giá không được để trống!" },
              {
                pattern: /^[0-9]+(\.[0-9]{1,2})?/,
                message: "Vui lòng nhập giá hợp lý",
              },
            ]}
          >
            <Input placeholder="vd: 20000" />
          </Form.Item>
          <Form.Item
            label="Giảm giá"
            name="discount"
            hasFeedback
            rules={[
              { required: true, message: "Giảm giá không được để trống!" },
              {
                transform: (value) => Number(value), // Convert the value to a number
                type: "number",
                max: 100,
                message: "Không thể giảm giá quá 100%",
              },
              {
                transform: (value) => Number(value), // Convert the value to a number
                type: "number",
                min: 0,
                message: "Không thể nhập số âm",
              },
              {
                transform: (value) => Number(value),
                type: "number",
                message: "Vui lòng nhập số!",
              },
            ]}
          >
            <Input placeholder="vd: 10" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình ảnh"
            rules={[{ required: true, message: "Vui lòng cho hình ảnh vào!" }]}
          >
            <Upload
              beforeUpload={beforeUpload}
              onChange={handleImageChange}
              customRequest={customRequest}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
                maxCount: 1,
              }}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="is_active" label="Hiển thị">
            <Select placeholder="Chọn hiển thị" defaultValue="true">
              <Option value="true">True</Option>
              <Option value="false">False</Option>
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Tạo sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Modal>{" "}
      {/* modal tạo */}
      <Modal
        title="Đổi thông tin"
        open={modalUpdate}
        onCancel={() => setModalUpdate(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={formU}
          name="up"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onUpdate}
          autoComplete="off"
          preserve={false}
        >
          <Form.Item label="ID" name="id">
            <Input disabled={true} />
          </Form.Item>
          {/* hidden id */}
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            hasFeedback
            rules={[
              { required: true, message: "Tên sản phẩm không được để trống!" },
            ]}
          >
            <Input placeholder="Bánh mì..." />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Danh mục"
            hasFeedback
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục">
              <Option value="653c5f91eee1ad0711267a15">Bánh mì</Option>
              <Option value="653c5f91eee1ad0711267a16">Thức uống</Option>
              <Option value="653c5f91eee1ad0711267a17">Món ăn vặt</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Chi tiết" name="detail">
            <Input.TextArea
              showCount
              maxLength={600}
              placeholder="Chi tiết về sản phẩm..."
            />
          </Form.Item>
          <Form.Item
            label="Đơn giá"
            name="price"
            hasFeedback
            rules={[
              { required: true, message: "Đơn giá không được để trống!" },
              {
                pattern: /^[0-9]+(\.[0-9]{1,2})?/,
                message: "Vui lòng nhập giá hợp lý",
              },
            ]}
          >
            <Input placeholder="vd: 20000" />
          </Form.Item>
          <Form.Item
            label="Giảm giá"
            name="discount"
            hasFeedback
            rules={[
              { required: true, message: "Giảm giá không được để trống!" },
              {
                transform: (value) => Number(value), // Convert the value to a number
                type: "number",
                max: 100,
                message: "Không thể giảm giá quá 100%",
              },
              {
                transform: (value) => Number(value), // Convert the value to a number
                type: "number",
                min: 0,
                message: "Không thể nhập số âm",
              },
              {
                transform: (value) => Number(value),
                type: "number",
                message: "Vui lòng nhập số!",
              },
            ]}
          >
            <Input placeholder="vd: 10" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình ảnh"
            rules={[{ required: true, message: "Vui lòng cho hình ảnh vào!" }]}
          >
            <Upload
              beforeUpload={beforeUpload}
              onChange={handleImageChange}
              customRequest={customRequest}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
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
      </Modal>{" "}
      {/* modal update */}
    </div>
  );
};

export default Adminproduct;
