import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";

import { filterPatientThunk } from "../../../../redux/action/patient";
import { debounce, values } from "lodash";
import { AutoComplete, Button, Form } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import TableAntdCustom from "../../../../components/TableAntd";
import { getQueueByStaffIdThunk } from "../../../../redux/action/queue";
import {
  filterStaffThunk,
  getStaffByTokenThunk,
} from "../../../../redux/action/staff";
import { AuthContext } from "../../../../provider/AuthContext";

const DoctorQueuePage = () => {
  const { token, role, logout, position } = useContext(AuthContext);

  const dispatch = useDispatch();
  const [openFormPage, setOpenFormPage] = useState(false);
  const [selectDoctor, setSelectDoctor] = useState(false);
  const [staffOptions, setStaffOptions] = useState([]); // State lưu trữ danh sách gợi ý
  const [queueList, setQueueList] = useState([]); // State lưu trữ danh sách gợi ý
  const [paramsStaff, setParamsStaff] = useState({
    keyword: null,
  });

  const columnsPatient = [
    {
      title: "Họ và tên",
      key: "name",
      width: "15%",
      render: (text) => {
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
  ];

  useEffect(() => {
    dispatch(getStaffByTokenThunk()).then((res) => {
      res?.payload && setSelectDoctor(res.payload);
    });
  }, [paramsStaff]);
  useEffect(() => {
    if (selectDoctor) {
      dispatch(getQueueByStaffIdThunk({ staffId: selectDoctor.id })).then(
        (res) => {
          console.log(res);
          setQueueList(res?.payload);
        }
      );
    }
  }, [selectDoctor]);

  return (
    <>
      <h1>
        Danh sách bệnh nhân đang chờ{" "}
        {position === "receptionist" && (
          <PlusSquareOutlined
            onClick={() => {
              setOpenFormPage(true);
              setSelectDoctor();
              setQueueList();
            }}
          />
        )}
      </h1>

      <TableAntdCustom
        list={queueList}
        pagination={false}
        columns={columnsPatient}
        className={"staffinfor-table"}
        emptyText="Hiện chưa có bệnh nhân nào"
      />
    </>
  );
};

export default DoctorQueuePage;
