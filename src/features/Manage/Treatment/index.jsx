import React from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import TreatmentInforSearch from "./Search";

function TreatmentPage() {
  const handleTablePageChange = (page, additionalData) => {
    // let temp = sendData;
    // temp.no = page;
    // setCurrentPage(page);
    // setSendData(temp);
    // dispatch(filterUserThunk(temp)).then((res) => {});
  };
  const columnsTreament = [
    {
      title: "Tên phương thức",
      dataIndex: "node",
      key: "name",
      width: "20%",
      render: (text) => {
        // text.tokenActive
      },
    },
    {
      title: "Email",
      dataIndex: "node",
      key: "email",
      width: "15%",
      render: (text) => {},
    },
    {
      title: "Số điện thoại",
      dataIndex: "node",
      key: "phone",
      align: "center",
      width: "12%",
      render: (text) => {
        // return text.phoneNumber;
      },
    },
    {
      title: "Vai trò",
      dataIndex: "node",
      key: "role",
      align: "center",
      width: "10%",
      render: (text) => {
        // return text.role.name.split("_")[1];
      },
    },
    {
      title: "Loại nhân viên",
      dataIndex: "node",
      key: "role",
      align: "center",
      width: "10%",
      render: (text) => {
        // return text.levelEmployee;
      },
    },
    {
      title: "Hành động",
      align: "center",
      width: "10%",
      render: (_, record) => {},
    },
  ];
  const handleSearchChange = (values) => {};
  const handleSubmitSearch = (values) => {};
  return (
    <div>
      <div className="staffPage-header">
        <h1>Danh sách phương thức điều trị</h1>
        <TreatmentInforSearch
          handleChange={handleSearchChange}
          handleSubmit={handleSubmitSearch}
        />
      </div>
      <div className="staffinfor-tableWrapper">
        <TableAntdCustom
          list={null}
          totalItems={10}
          totalPages={1}
          pageSize={5}
          no={0}
          columns={columnsTreament}
          onChange={handleTablePageChange}
          className={"staffinfor-table"}
          emptyText="Hiện chưa có phương thức điều trị nào"
        ></TableAntdCustom>
      </div>
    </div>
  );
}

export default TreatmentPage;
