import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import PatientInforSearch from "./Search";
import { useDispatch } from "react-redux";
import { filterPatientThunk } from "../../../redux/action/patient";
import { NavLink, useNavigate } from "react-router-dom";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../provider/AuthContext";
import {
  confirmAppointmentThunk,
  declineAppointmentThunk,
  filterAppointmentThunk,
} from "../../../redux/action/appoitment";
import { Tag } from "antd";
import { toast } from "react-toastify";
import AppointmentInforSearch from "./Search";
import { debounce } from "lodash";
import { getStaffByTokenThunk } from "../../../redux/action/staff";

function AppointmentManagePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointment, setAppointments] = useState([]);
  const [active, setActive] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [totalItems, setTotalItems] = useState();
  const { token, role, logout, position } = useContext(AuthContext);
  const [params, setParams] = useState({
    isConfirm: null,
    staffId: null,
  });
  const columnsAppoitment = [
    {
      title: "Thông tin bệnh nhân",
      key: "name",
      width: "30%",
      render: (text) => {
        return (
          <>
            <p>Họ và tên : {text.patientDTO.name}</p>
            <p>SĐT : {text.patientDTO.phoneNumber}</p>
            <p>Ngày sinh : {text.patientDTO.birthday}</p>
          </>
        );
      },
    },

    {
      title: "Thông tin lịch khám",
      key: "phone",
      width: "30%",
      render: (text) => {
        return (
          <>
            <p>Ngày khám : {text.workingShowDTO.workingDTO.date}</p>
            <p>
              Buổi khám :{" "}
              {text.workingShowDTO.workingDTO.periodId == 1
                ? "Buổi sáng"
                : "Buổi chiều"}
            </p>
            <p>Bác sĩ khám : {text.workingShowDTO.staffDTO.name}</p>
          </>
        );
      },
    },
    {
      title: "Trạng thái",
      key: "phone",
      width: "20%",
      align: "center",
      render: (text) => {
        return text.confirm ? (
          <Tag color="#25A71C">Đã duyệt</Tag>
        ) : (
          <Tag color="#F3BD50">Chưa duyệt</Tag>
        );
      },
    },

    {
      title: "",
      align: "center",
      width: "5%",
      render: (_, record) => {
        return record.confirm ? (
          <></>
        ) : (
          <>
            <div>
              <CheckOutlined onClick={() => handleAccept(record.id)} />
              Duyệt
            </div>
            <div>
              <DeleteOutlined onClick={() => handleDecline(record.id)} />
              Huỷ
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(filterAppointmentThunk(params)).then((res) => {
      const temp = res?.payload;
      if (temp) {
        setAppointments(temp);
        setActive(false);
      }
    });
  }, [params, active]);

  const handleAccept = (id) => {
    dispatch(confirmAppointmentThunk({ workingId: id })).then((res) => {
      console.log(res);
      if (res?.payload?.message === "successfully") {
        toast.success("Duyệt lịch khám thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#D7F1FD" },
        });
        setActive(true);
      }
    });
  };
  const handleDecline = (id) => {
    dispatch(declineAppointmentThunk({ workingId: id })).then((res) => {
      console.log(res);
      toast.success("Huỷ lịch khám thành công", {
        position: "top-right",
        autoClose: 3000,
        style: { color: "green", backgroundColor: "#D7F1FD" },
      });
      setActive(true);
    });
  };

  const handleTablePageChange = (page) => {
    if (page) {
      setParams({
        ...params,
        pageNumber: page - 1,
      });
    }
  };

  const handleSearchChange = debounce((values) => {
    setParams(values);
  }, 300);
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
        <h1>Danh sách lịch đặt khám</h1>
        <AppointmentInforSearch
          handleChange={handleSearchChange}
          handleSubmit={handleSubmitSearch}
        />
      </div>
      <div className="staffinfor-tableWrapper">
        {appointment ? (
          <TableAntdCustom
            list={appointment != [] ? appointment : null}
            totalItems={totalItems}
            totalPages={totalPages}
            pageSize={params.pageSize}
            no={params.pageNumber + 1}
            columns={columnsAppoitment}
            onChange={handleTablePageChange}
            className={"staffinfor-table"}
            emptyText="Hiện chưa có lịch đặt nào"
          ></TableAntdCustom>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AppointmentManagePage;
