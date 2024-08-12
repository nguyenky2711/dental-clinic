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
    positionId: null,
    pageNumber: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState({
    page: null,
    item: null,
  });
  useEffect(() => {
    dispatch(filterStaffThunk(params)).then((res) => {
      const temp = res?.payload;
      if (temp) {
        setStaffs(temp.contents);
        setTotal((preVal) => ({
          ...preVal,
          page: temp.totalPages,
          item: temp.totalItems,
        }));
      }
    });
  }, [params]);
  const handleTablePageChange = (page, additionalData) => {
    setParams((prevVal) => ({
      ...prevVal,
      pageNumber: page,
    }));
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
      render: (text) =>
        text.positionDTO.name === "dentist" ? "Bác sĩ" : "Lễ tân",
    },
    {
      title: "",
      align: "center",
      width: "10%",
      render: (_, record) => {
        return (
          <div className="action">
            <div
              className="action-item"
              onClick={() => navigate(`/manage/staff/${record.id}`)}
            >
              <EditOutlined />
              <p>Xem chi tiết</p>
            </div>
            <div className="action-item">
              <DeleteOutlined />
              Xoá
            </div>
          </div>
        );
      },
    },
  ];
  const handleSearchChange = (values) => {};
  const handleSubmitSearch = (values) => {
    if (values) {
      setParams((preVal) => ({
        ...preVal,
        keyword: values.keyword,
        positionId: values.positionId,
      }));
    }
  };
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
            totalItems={total.item}
            totalPages={total.page}
            pageSize={params.pageSize}
            no={params.pageNumber}
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
