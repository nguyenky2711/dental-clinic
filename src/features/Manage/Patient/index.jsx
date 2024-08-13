import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import PatientInforSearch from "./Search";
import { useDispatch } from "react-redux";
import { filterPatientThunk } from "../../../redux/action/patient";
import { NavLink, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../provider/AuthContext";
import moment from "moment";

const PatientPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [totalItems, setTotalItems] = useState();
  const { token, role, logout } = useContext(AuthContext);
  const [params, setParams] = useState({
    keyword: null,
    pageNumber: 1,
    pageSize: 10,
  });
  const columnsPatient = [
    {
      title: "Họ và tên",
      key: "name",
      width: "15%",
      render: (text) => text.name,
    },
    {
      title: "Thông tin cơ bản",
      key: "infor",
      align: "center",
      width: "10%",
      render: (text) => (
        <>
          <p>
            Ngày sinh: {moment(new Date(text.birthday)).format("DD/MM/YYYY")}
          </p>
          <p>Số điện thoại: {text.phoneNumber}</p>
          <p>Địa chỉ: {text.address}</p>
        </>
      ),
    },
    {
      title: "Tiền sử bệnh án",
      key: "medicalHistory",
      width: "20%",
      render: (text) => text.medicalHistory,
    },
    ...(role !== "Role_Admin"
      ? [
          {
            title: "Bệnh án",
            align: "center",
            width: "10%",
            render: (_, record) => (
              <div className="action">
                <div
                  className="action-item"
                  onClick={() =>
                    navigate(`/manage/patient/${record.id}/medical-record`)
                  }
                >
                  Xem bệnh án
                </div>
              </div>
            ),
          },
        ]
      : []),
    {
      title: "",
      align: "center",
      width: "5%",
      render: (_, record) => (
        <div className="action">
          <div
            className="action-item"
            onClick={() => navigate(`/manage/patient/${record.id}`)}
          >
            <EditOutlined />
            <p>Xem chi tiết</p>
          </div>
          {/* <div className="action-item">
            <DeleteOutlined />
            Xoá
          </div> */}
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(filterPatientThunk(params)).then((res) => {
      const temp = res?.payload;
      if (temp) {
        setTotalItems(temp?.totalItems);
        setTotalPages(temp?.totalPages);

        setPatients(temp.contents);
      }
    });
  }, [params, token, role]);
  const handleTablePageChange = (page) => {
    if (page) {
      setParams({
        ...params,
        pageNumber: page,
      });
    }
  };

  const handleSearchChange = (values) => {};
  const handleSubmitSearch = (values) => {
    if (values.keyword) {
      setParams({ ...params, keyword: values.keyword });
    } else {
      setParams({ ...params, keyword: null });
    }
  };
  return (
    <div>
      <div className="staffPage-header">
        <h1>Danh sách bệnh nhân</h1>
        <PatientInforSearch
          handleChange={handleSearchChange}
          handleSubmit={handleSubmitSearch}
        />
      </div>
      <div className="staffinfor-tableWrapper">
        {patients ? (
          <TableAntdCustom
            list={patients != [] ? patients : null}
            totalItems={totalItems}
            totalPages={totalPages}
            pageSize={params.pageSize}
            no={params.pageNumber}
            columns={columnsPatient}
            onChange={handleTablePageChange}
            className={"staffinfor-table"}
            emptyText="Hiện chưa có bệnh nhân nào"
          ></TableAntdCustom>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PatientPage;
