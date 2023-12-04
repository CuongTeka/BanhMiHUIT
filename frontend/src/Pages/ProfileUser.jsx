import React from "react";
import "./CSS/ProfileUser.css";
import { Form, Input, Button } from "antd";
import { MyFormItemGroup, MyFormItem } from "../util";


const ProfileUser = () => {
  const onFinish = (value) => {
    console.log(value);
  };



 
  return (
    <div className="profileUser">
      <div className="profileUser-header">
        <h2>Thông tin người dùng</h2>
      </div>
      <div className="ProfileUser-content">
        <div className="profileUser-content-input">
          <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
            <MyFormItemGroup prefix={["user"]}>
              <MyFormItemGroup prefix={["name"]}>
                <MyFormItemGroup prefix={["phone"]}>
                  <MyFormItemGroup prefix={["mssv"]}>
                    <MyFormItem name="name" label="name">
                      <Input />
                    </MyFormItem>
                  </MyFormItemGroup>
                  <MyFormItem name="email" label="email">
                    <Input />
                  </MyFormItem>
                </MyFormItemGroup>

                <MyFormItem name="phone" label="phone">
                  <Input />
                </MyFormItem>
              </MyFormItemGroup>

              <MyFormItem name="mssv" label="mssv">
                <Input />
              </MyFormItem>
            </MyFormItemGroup>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
