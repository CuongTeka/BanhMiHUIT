import { Table } from "antd";
import React, { useState, useEffect } from "react";
import { handleGetAllUser } from "../../../services/adminServices";

const columns = [
  {
    title: "Id",
    dataIndex: "_id",
  },
  {
    title: "Tên",
    dataIndex: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (text) => <a>{text}</a>
  },
  {
    title: "MSSV",
    dataIndex: "mssv",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    render: (role) => <span>{roleText(role)}</span>,
  },
  {
    title: "Ngày tạo",
    dataIndex: "date_create",
    render: (text) => new Date(text).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  },
  {
    title: "Ngày chỉnh sửa",
    dataIndex: "date_update",
    render: (text) => new Date(text).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  },
];



const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const roleText = (role) => {
  if (role === '0') {
    return 'Khách hàng';
  } else if (role === '1') {
    return 'Admin';
  } else {
    return '???';
  }
};

const Tableadmin = (props) => {
  const { selectionType = "checkbox" } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      userData()
    };
    fetchData();
  }, []);
  
  const userData = async () => {
    try {
      let data = await handleGetAllUser();
      // console.log('Data:', data);
      if (data && data.errCode === 0) {
        setUsers(data.data)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          console.error(error);
          console.log(error.response.data.message);
        }
      }
    }
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={users}
      />
    </div>
  );
};

export default Tableadmin;
