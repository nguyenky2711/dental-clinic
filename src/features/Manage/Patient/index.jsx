import React, { useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import PatientInforSearch from "./Search";
import { useDispatch } from "react-redux";
import { filterPatientThunk } from "../../../redux/action/patient";
import { NavLink } from "react-router-dom";

function PatientPage() {
  const dispatch = useDispatch();
  const [patients, setPatients] = useState([]);
  const [params, setParams] = useState({
    keyword: null,
    pageNumber: null,
    pageSize: null,
  });
  const columnsPatient = [
    {
      title: "Họ và tên",
      key: "name",
      width: "20%",
      render: (text) => {
        console.log(text);
        return text.name;
      },
    },
    {
      title: "Ngày sinh",
      key: "birthday",
      width: "10%",
      render: (text) => {
        return text.birthday;
      },
    },
    {
      title: "Thông tin liên lạc",
      key: "phone",
      align: "center",
      width: "20%",
      render: (text) => {
        return (
          <>
            <p>SĐT: {text.phoneNumber}</p>
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
      render: (_, record) => {},
    },
  ];

  useEffect(() => {
    dispatch(filterPatientThunk(params)).then((res) => {
      const temp = res?.payload;
      if (temp) {
        setPatients(temp.contents);
      }
    });
  }, [params]);
  console.log(patients);
  const handleTablePageChange = (page, additionalData) => {
    // let temp = sendData;
    // temp.no = page;
    // setCurrentPage(page);
    // setSendData(temp);
    // dispatch(filterUserThunk(temp)).then((res) => {});
  };

  const handleSearchChange = (values) => {};
  const handleSubmitSearch = (values) => {
    console.log(values);
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
        <TableAntdCustom
          list={patients != [] ? patients : null}
          totalItems={10}
          totalPages={1}
          pageSize={5}
          no={0}
          columns={columnsPatient}
          onChange={handleTablePageChange}
          className={"staffinfor-table"}
          emptyText="Hiện chưa có bệnh nhân nào"
        ></TableAntdCustom>
      </div>
    </div>
  );
}

export default PatientPage;
