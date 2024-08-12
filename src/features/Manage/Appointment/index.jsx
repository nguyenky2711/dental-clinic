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
  const [status, setStatus] = useState(null);
  const { token, role, logout, position } = useContext(AuthContext);
  const [total, setTotal] = useState({
    pages: null,
    items: null,
  });
  const [params, setParams] = useState({
    isConfirm: null,
    staffId: null,
    pageNumber: 1,
    pageSize: 5,
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
      key: "confirm",
      width: "10%",
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
      width: "15%",
      render: (_, record) =>
        !record.confirm && (
          <div className="action">
            <div
              className="action-item"
              onClick={() => handleAccept(record.id)}
            >
              <CheckOutlined />
              <p>Duyệt</p>
            </div>
            <div
              className="action-item"
              onClick={() => handleDecline(record.id)}
            >
              <DeleteOutlined />
              Huỷ
            </div>
          </div>
        ),
    },
  ];

  useEffect(() => {
    dispatch(filterAppointmentThunk(params)).then((res) => {
      const temp = res?.payload;
      if (temp) {
        setAppointments(temp.contents);
        setTotal((preVal) => ({
          ...preVal,
          pages: temp.totalPages,
          items: temp.totalItems,
        }));
      }
      setStatus(null);
    });
  }, [params]);

  useEffect(() => {
    status !== null &&
      dispatch(filterAppointmentThunk(params)).then((res) => {
        const temp = res?.payload;
        if (temp) {
          setAppointments(temp.contents);
          setTotal((preVal) => ({
            ...preVal,
            pages: temp.totalPages,
            items: temp.totalItems,
          }));
        }
        setStatus(null);
      });
  }, [status]);
  const handleAccept = (id) => {
    dispatch(confirmAppointmentThunk({ workingId: id })).then((res) => {
      if (res?.payload?.message === "successfully") {
        toast.success("Duyệt lịch khám thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#D7F1FD" },
        });
        setStatus("successfully");
      } else {
        toast.error("Duyệt lịch khám thất bại", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#DEF2ED" },
        });
      }
    });
  };
  const handleDecline = (id) => {
    dispatch(declineAppointmentThunk({ workingId: id })).then((res) => {
      if (res?.payload?.message === "successfully") {
        toast.success("Huỷ lịch khám thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#D7F1FD" },
        });
        setStatus("successfully");
      } else {
        toast.error("Huỷ lịch khám thất bại", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#DEF2ED" },
        });
      }
    });
  };

  const handleTablePageChange = (page) => {
    if (page) {
      setParams((preVal) => ({
        ...preVal,
        pageNumber: page,
      }));
    }
  };
  const isDeepEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };
  const handleSearchChange = debounce((values) => {
    const { pageNumber, pageSize, ...restData } = params;
    !isDeepEqual(values, restData) &&
      setParams((preVal) => ({
        ...preVal,
        isConfirm: values.isConfirm,
        staffId: values.staffId,
      }));
  }, 300);
  const handleSubmitSearch = debounce((values) => {
    const { pageNumber, pageSize, ...restData } = params;
    !isDeepEqual(values, restData) &&
      setParams((preVal) => ({
        ...preVal,
        isConfirm: values.isConfirm,
        staffId: values.staffId,
      }));
  }, 300);

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
            list={appointment}
            totalItems={total.items}
            totalPages={total.pages}
            pageSize={params.pageSize}
            no={params.pageNumber}
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
