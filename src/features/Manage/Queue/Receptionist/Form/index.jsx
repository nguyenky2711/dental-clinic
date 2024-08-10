import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { debounce, values } from "lodash";
import { AutoComplete, Button, Form } from "antd";
import moment from "moment";
import { filterStaffThunk } from "../../../../../redux/action/staff";
import { AuthContext } from "../../../../../provider/AuthContext";
import { filterPatientThunk } from "../../../../../redux/action/patient";
import { addPatientToQueueThunk } from "../../../../../redux/action/queue";

const ReceptionistQueueFormPage = ({ action = null }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { token, role, logout } = useContext(AuthContext);
  const [paramsStaff, setParamsStaff] = useState({
    keyword: null,
  });
  const [paramsPatient, setParamsPatient] = useState({
    keyword: null,
    pageNumber: 0,
    pageSize: 10,
  });
  const [paramsQueue, setParamsQueue] = useState({
    staffId: null,
    patientId: null,
  });
  const [staffOptions, setStaffOptions] = useState([]); // State lưu trữ danh sách gợi ý
  const [patientOptions, setPatientOptions] = useState([]); // State lưu trữ danh sách gợi ý

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
    dispatch(filterPatientThunk(paramsPatient)).then((res) => {
      const tempList = res?.payload?.contents?.map((item) => {
        return {
          id: item.id,
          value:
            item.name +
            " - " +
            moment(new Date(item.birthday)).format("DD/MM/YYYY"),
          label:
            item.name +
            " - " +
            moment(new Date(item.birthday)).format("DD/MM/YYYY"),
        };
      });
      setPatientOptions(tempList);
    });
  }, [paramsPatient]);

  // Hàm tìm kiếm với debounce
  const handleSearch = debounce((value, posi) => {
    if (posi === "doctor") {
      setParamsStaff((prevParams) => ({
        ...prevParams,
        keyword: value ? value.toLowerCase() : null,
      }));
    } else if (posi === "patient") {
      setParamsPatient((prevParams) => ({
        ...prevParams,
        keyword: value ? value.toLowerCase() : null,
      }));
    }
  }, 300); // Thời gian debounce là 300ms
  const handleSearchDoctor = (value) => {
    handleSearch(value, "doctor");
  };
  const handleSearchPatient = (value) => {
    handleSearch(value, "patient");
  };

  const handleSelect = (value, posi) => {
    if (posi === "doctor") {
      const doctor = staffOptions.find((item) => item.value === value);
      setParamsQueue((prevParams) => ({
        ...prevParams,
        staffId: doctor ? doctor.id : null,
      }));
    } else if (posi === "patient") {
      const patient = patientOptions.find((item) => item.value === value);

      setParamsQueue((prevParams) => ({
        ...prevParams,
        patientId: patient ? patient.id : null,
      }));
    }
    console.log(value);
  };
  const handleSelectDoctor = (value) => {
    handleSelect(value, "doctor");
  };
  const handleSelectPatient = (value) => {
    handleSelect(value, "patient");
  };

  const onFinish = (data) => {
    dispatch(addPatientToQueueThunk(paramsQueue)).then((res) => {
      if (res?.payload?.message === "successfully") {
      }
    });
  };

  return (
    <div className="container">
      <div className="queue-form-container">
        <div className="register-header">Thêm vào hàng chờ</div>
        <div className="form_register">
          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            onFieldsChange={(changeField, allFields) => {}}
          >
            <Form.Item
              className="staff_item name"
              label="Bác sĩ đặt lịch"
              name="nameDoctor"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên",
                },
                {
                  pattern: new RegExp(
                    /^[A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+( [A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+)*$/
                  ),
                  message: "Họ tên không hợp lệ",
                },
              ]}
            >
              <AutoComplete
                // defaultValue={doctorDTO?.name}
                style={{ width: "400px" }}
                options={staffOptions}
                onSearch={handleSearchDoctor} // Gọi hàm tìm kiếm debounce
                onSelect={handleSelectDoctor}
                allowClear
                placeholder="Nhập tên"
              />
            </Form.Item>
            <Form.Item
              className="staff_item name"
              label="Bệnh nhân đặt lịch"
              name="namePatient"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên",
                },
              ]}
            >
              <AutoComplete
                style={{ width: "400px" }}
                options={patientOptions}
                onSearch={handleSearchPatient} // Gọi hàm tìm kiếm debounce
                onSelect={handleSelectPatient}
                allowClear
                placeholder="Nhập tên"
              />
            </Form.Item>

            <Form.Item className="submitBtn">
              <Button type="submit" htmlType="submit">
                Thêm vào danh sách chờ
              </Button>
            </Form.Item>
            <Form.Item className="cancleBtn">
              <Button type="button" onClick={() => action("cancle")}>
                Quay lại
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistQueueFormPage;
