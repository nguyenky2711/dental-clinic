import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../../provider/AuthContext";
import {
  filterStaffForPatientThunk,
  filterStaffThunk,
} from "../../../../redux/action/staff";
import { filterPatientThunk } from "../../../../redux/action/patient";
import { debounce, values } from "lodash";
import { AutoComplete, Button, Form } from "antd";
import moment from "moment";
import { PlusSquareOutlined } from "@ant-design/icons";
import ReceptionistQueueFormPage from "./Form";
import TableAntdCustom from "../../../../components/TableAntd";
import { getQueueByStaffIdThunk } from "../../../../redux/action/queue";

const ReceptionistQueuePage = () => {
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
    dispatch(filterStaffThunk(paramsStaff)).then((res) => {
      const tempStaffList = res?.payload?.contents?.map((item) => {
        return {
          id: item.id,
          value: item.name,
          label: item.name,
        };
      });
      setStaffOptions(tempStaffList);
    });
  }, [paramsStaff]);
  useEffect(() => {
    if (selectDoctor) {
      dispatch(getQueueByStaffIdThunk({ staffId: selectDoctor.id })).then(
        (res) => {
          setQueueList(res?.payload);
        }
      );
    }
  }, [selectDoctor]);

  const handleCancelForm = () => {
    setOpenFormPage(false);
  };
  // Hàm tìm kiếm với debounce
  const handleSearchDoctor = debounce((value) => {
    setParamsStaff((prevParams) => ({
      ...prevParams,
      keyword: value ? value.toLowerCase() : null,
    }));
  }, 300); // Thời gian debounce là 300ms
  const handleSelectDoctor = (value) => {
    const doctor = staffOptions.find((item) => item.value === value);
    setSelectDoctor(doctor);
  };
  return (
    <>
      <div className="staffPage-header">
        {openFormPage ? (
          <ReceptionistQueueFormPage action={handleCancelForm} />
        ) : (
          <>
            <h1>
              Danh sách bệnh nhân đang chờ{" "}
              <PlusSquareOutlined
                onClick={() => {
                  setOpenFormPage(true);
                  setSelectDoctor();
                  setQueueList();
                }}
              />
            </h1>
            <AutoComplete
              // defaultValue={doctorDTO?.name}
              style={{ width: "400px", marginBottom: "30px" }}
              options={staffOptions}
              onSearch={handleSearchDoctor} // Gọi hàm tìm kiếm debounce
              onSelect={handleSelectDoctor}
              allowClear
              placeholder="Chọn bác sĩ"
            />
            <TableAntdCustom
              list={queueList}
              pagination={false}
              columns={columnsPatient}
              className={"staffinfor-table"}
              emptyText="Hiện chưa có bệnh nhân nào"
            />
          </>
        )}
      </div>
    </>
  );
};

export default ReceptionistQueuePage;
