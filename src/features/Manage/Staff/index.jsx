import React, { useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import StaffinforSearch from "./Search";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { filterStaffThunk } from "../../../redux/action/staff";
import { useDispatch } from "react-redux";

function StaffPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [staffs, setStaffs] = useState();
  const [params, setParams] = useState({
    keyword: null,
    pageNumber: null,
    pageSize: null,
    positionId: null,
  });

  useEffect(() => {
    dispatch(filterStaffThunk(params)).then((res) => {
      const temp = res?.payload;
      if (temp) {
        setStaffs(temp.contents);
      }
    });
  }, [params]);
  const handleTablePageChange = (page, additionalData) => {
    // let temp = sendData;
    // temp.no = page;
    // setCurrentPage(page);
    // setSendData(temp);
    // dispatch(filterUserThunk(temp)).then((res) => {});
  };
  const columnsStaff = [
    {
      title: "Họ và tên",
      key: "name",
      width: "20%",
      render: (text) => text.name,
    },
    {
      title: "Số điện thoại",
      key: "userName",
      align: "center",
      width: "10%",
      render: (text) => text.phoneNumber,
    },
    {
      title: "Trình độ chuyên môn",
      key: "role",
      align: "center",
      width: "10%",
      render: (text) => text.professionalQualification,
    },
    {
      title: "Vị trí",
      key: "role",
      align: "center",
      width: "10%",
      render: (text) => text.positionDTO.name,
    },
    {
      title: "",
      align: "center",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <EditOutlined
              onClick={() => navigate(`/manage/staff/${record.id}`)}
            />
            <DeleteOutlined />
          </>
        );
      },
    },
  ];
  const handleSearchChange = (values) => {};
  const handleSubmitSearch = (values) => {};
  return (
    <div>
      <div className="staffPage-header">
        <h1>Danh sách nhân viên</h1>
        <StaffinforSearch
          handleChange={handleSearchChange}
          handleSubmit={handleSubmitSearch}
        />
      </div>
      <div className="staffinfor-tableWrapper">
        {staffs ? (
          <TableAntdCustom
            list={staffs}
            totalItems={10}
            totalPages={1}
            pageSize={5}
            no={0}
            columns={columnsStaff}
            onChange={handleTablePageChange}
            className={"staffinfor-table"}
            emptyText="Hiện chưa có nhân viên nào"
          ></TableAntdCustom>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default StaffPage;
