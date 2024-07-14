import React, { useEffect, useState } from "react";
import "./style.scss";

import {
  Button,
  Checkbox,
  Col,
  Row,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  AutoComplete,
} from "antd";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { showForClientThunk } from "../../../redux/action/workingTime";
import { filterStaffForPatientThunk } from "../../../redux/action/staff";
import { createAppointmentByClientThunk } from "../../../redux/action/appoitment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [staffOptions, setStaffOptions] = useState([]); // State lưu trữ danh sách gợi ý
  const [appoitmentOptions, setAppointmentOptions] = useState([]); // State lưu trữ danh sách gợi ý

  const [paramsStaff, setParamsStaff] = useState({
    keyword: null,
  });
  const [paramsAppointment, setParamsAppointment] = useState({
    keyword: null,
    periodId: null,
    date: null,
  });
  useEffect(() => {
    dispatch(filterStaffForPatientThunk(paramsStaff)).then((res) => {
      const tempStaffList = res?.payload?.contents?.map((item) => {
        return {
          value: item.name,
          label: item.name,
        };
      });
      setStaffOptions(tempStaffList);
    });
  }, [paramsStaff]);
  useEffect(() => {
    dispatch(showForClientThunk(paramsAppointment)).then((res) => {
      let tempAppointmentList = res?.payload?.filter(
        (item) => new Date(item.workingDTO.date) > new Date()
      );
      tempAppointmentList.sort(
        (a, b) => new Date(a.workingDTO.date) - new Date(b.workingDTO.date)
      );
      tempAppointmentList = tempAppointmentList.map((item) => {
        return {
          value: item.id,
          label: `Ngày: ${item.workingDTO.date} - Buổi: ${
            item.workingDTO.periodId == 1 ? "Buổi sáng" : "Buổi chiều"
          }`,
        };
      });
      console.log(tempAppointmentList);
      setAppointmentOptions(tempAppointmentList);
    });
  }, [paramsAppointment]);

  // Hàm tìm kiếm với debounce
  const handleSearch = debounce((value) => {
    setParamsStaff((prevParams) => ({
      ...prevParams,
      keyword: value ? value.toLowerCase() : null,
    }));
  }, 300); // Thời gian debounce là 300ms

  const handleSelect = (value) => {
    console.log(value);
    setParamsAppointment((prevParams) => ({
      ...prevParams,
      keyword: value.toLowerCase(),
    }));
  };

  const onFinish = (data) => {
    console.log(data);
    const { name, ...restData } = data;
    dispatch(createAppointmentByClientThunk(restData)).then((res) => {
      console.log(res);
      if (
        res?.payload?.message ===
        "please check your email for getting result schedule"
      ) {
        toast.success("Hãy kiểm tra mail để nhận kết quả đặt lịch", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#D7F1FD" },
        });
        form.resetFields();
      }
    });
  };
  return (
    <div className="container">
      <div className="register_container">
        <div className="register-header">Đặt lịch khám</div>
        <div className="form_register">
          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            onFieldsChange={(changeField, allFields) => {}}
          >
            <Form.Item
              className="staff_item name"
              label="Bác sĩ muốn khám"
              name="name"
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
                style={{ width: "300px" }}
                options={staffOptions}
                onSearch={handleSearch} // Gọi hàm tìm kiếm debounce
                onSelect={handleSelect}
                allowClear
                placeholder="Nhập tên"
              />
            </Form.Item>

            <Form.Item
              className="treatment"
              label="Thời gian khám"
              name={"workingId"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian khám",
                },
              ]}
            >
              <Select
                placeholder={"Chọn thời gian khám "}
                allowClear
                options={appoitmentOptions ? appoitmentOptions : null}
              ></Select>
            </Form.Item>
            <Form.Item
              className="staff_item name"
              label="Ghi chú"
              name="note"
              rules={[
                {
                  required: false,
                  message: "Vui lòng nhập ghi chú",
                },
              ]}
            >
              <Input placeholder="Nhập ghi chú nếu có" />
            </Form.Item>

            <Form.Item className="submitBtn">
              <Button type="submit" htmlType="submit">
                Đặt lịch
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
