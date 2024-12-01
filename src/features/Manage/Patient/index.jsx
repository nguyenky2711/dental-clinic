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
import { debounce } from "lodash";

const PatientPage = () => {
  const screenWidth = window.innerWidth;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [totalItems, setTotalItems] = useState();
  const [params, setParams] = useState({
    keyword: null,
    pageNumber: 1,
    pageSize: 10,
  });

  const { token, role, logout } = useContext(AuthContext);

  const columnsPatient = [
    ...(screenWidth <= 768
      ? [
          {
            title: "Thông tin người bệnh",
            key: "name",
            width: "40%",
            render: (text) => (
              <>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  {text.name}
                </p>
                <p>
                  Ngày sinh:{" "}
                  {moment(new Date(text.birthday)).format("DD/MM/YYYY")}
                </p>
                <p>Số điện thoại: {text.phoneNumber}</p>
              </>
            ),
          },
          ...(role !== "Role_Admin"
            ? [
                {
                  title: "Bệnh án",
                  align: "center",
                  width: "25%",
                  render: (_, record) => (
                    <div className="action">
                      <div
                        className="action-item"
                        onClick={() =>
                          navigate(
                            `/manage/patient/${record.id}/medical-record`
                          )
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
            width: "25%",
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
        ]
      : []),
    ...(screenWidth > 768 && screenWidth <= 1024
      ? [
          {
            title: "Thông tin người bệnh",
            key: "name",
            width: "40%",
            render: (text) => (
              <>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  {text.name}
                </p>
                <p>
                  Ngày sinh:{" "}
                  {moment(new Date(text.birthday)).format("DD/MM/YYYY")}
                </p>
                <p>Số điện thoại: {text.phoneNumber}</p>
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
                          navigate(
                            `/manage/patient/${record.id}/medical-record`
                          )
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
              </div>
            ),
          },
        ]
      : []),
    ...(screenWidth > 1024
      ? [
          {
            title: "Họ tên",
            key: "name",
            width: "20%",
            render: (text) => (
              <>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  {text.name}
                </p>
                <p>
                  Ngày sinh:{" "}
                  {moment(new Date(text.birthday)).format("DD/MM/YYYY")}
                </p>
                <p>Số điện thoại: {text.phoneNumber}</p>
              </>
            ),
          },
          {
            title: "Thông tin cơ bản",
            key: "infor",
            align: "center",
            width: "20%",
            render: (text) => (
              <>
                <p>
                  Ngày sinh:{" "}
                  {moment(new Date(text.birthday)).format("DD/MM/YYYY")}
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
                          navigate(
                            `/manage/patient/${record.id}/medical-record`
                          )
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
              </div>
            ),
          },
        ]
      : []),
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
  const isDeepEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  const handleSearchChange = debounce((values) => {
    const { pageNumber, pageSize, ...restData } = params;
    if (!isDeepEqual(values, restData)) {
      setParams((preVal) => ({
        ...preVal,
        keyword: values.keyword,
      }));
    }
  }, 300);
  const handleSubmitSearch = debounce((values) => {
    const { pageNumber, pageSize, ...restData } = params;
    if (!isDeepEqual(values, restData)) {
      setParams((preVal) => ({
        ...preVal,
        keyword: values.keyword,
      }));
    }
  }, 300); // Thời gian debounce là 300ms

  return (
    <div className="manage-page-container patient">
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
