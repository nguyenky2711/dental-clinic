import React, { useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import PatientInforSearch from "./Search";
import { useDispatch } from "react-redux";
import { filterPatientThunk } from "../../../redux/action/patient";
import { NavLink, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function PatientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [totalItems, setTotalItems] = useState();
  const [params, setParams] = useState({
    keyword: null,
    pageNumber: 0,
    pageSize: 10,
  });
  const columnsPatient = [
    {
      title: "Họ và tên",
      key: "name",
      width: "15%",
      render: (text) => {
        console.log(text);
        return text.name;
      },
    },
    {
      title: "Ngày sinh",
      key: "birthday",
      align: "center",
      width: "10%",
      render: (text) => {
        return text.birthday;
      },
    },
    {
      title: "Số điện thoại",
      key: "phone",
      align: "center",
      width: "10%",
      render: (text) => {
        return (
          <>
            <p>SĐT: {text.phoneNumber}</p>
          </>
        );
      },
    },
    {
      title: "Địa chỉ",
      key: "address",
      width: "20%",
      render: (text) => {
        return (
          <>
            <p>Địa chỉ: {text.address}</p>
          </>
        );
      },
    },

    {
      title: "Bệnh án",
      align: "center",
      width: "10%",
      render: (_, record) => {
        return (
          <NavLink to={`/manage/patient/${record.id}/medical-record`}>
            Xem bệnh án{" "}
          </NavLink>
        );
      },
    },
    {
      title: "",
      align: "center",
      width: "5%",
      render: (_, record) => {
        return (
          <>
            <EditOutlined
              onClick={() => navigate(`/manage/patient/${record.id}`)}
            />
            <DeleteOutlined />
          </>
        );
      },
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
  }, [params]);

  const handleTablePageChange = (page) => {
    if (page) {
      setParams({
        ...params,
        pageNumber: page - 1,
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
            no={params.pageNumber + 1}
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
}

export default PatientPage;
