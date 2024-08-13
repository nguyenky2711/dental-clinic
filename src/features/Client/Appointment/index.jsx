import React, { useContext, useEffect, useState } from "react";
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
  Radio,
} from "antd";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import {
  showForClientThunk,
  showForStaffByWeekThunk,
} from "../../../redux/action/workingTime";
import { filterStaffForPatientThunk } from "../../../redux/action/staff";
import {
  createAppointmentByClientThunk,
  createAppointmentByStaffThunk,
} from "../../../redux/action/appoitment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../provider/AuthContext";
import moment from "moment";
import { filterPatientThunk } from "../../../redux/action/patient";
import { useNavigate } from "react-router-dom";

const AppointmentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { token, role, logout } = useContext(AuthContext);
  // Lấy chuỗi JSON từ sessionStorage
  const doctorDTOString = sessionStorage.getItem("doctorDTO");

  // Chuyển đổi chuỗi JSON thành đối tượng
  const doctorDTO = JSON.parse(doctorDTOString);
  let currentWeek = moment().startOf("isoWeek").format("WW");
  let nextWeek = moment().add(1, "weeks").startOf("isoWeek").format("WW");
  let year = moment().subtract(1, "weeks").startOf("isoWeek").format("YYYY");

  const [staffOptions, setStaffOptions] = useState([]); // State lưu trữ danh sách gợi ý
  const [patientOptions, setPatientOptions] = useState([]); // State lưu trữ danh sách gợi ý
  const [appoitmentOptions, setAppointmentOptions] = useState([]); // State lưu trữ danh sách gợi ý
  const [filterAppoitmentOptions, setFilterAppointmentOptions] = useState([]); // State lưu trữ danh sách gợi ý

  const [paramsStaff, setParamsStaff] = useState({
    keyword: null,
  });
  const [paramsPatient, setParamsPatient] = useState({
    keyword: null,
    pageNumber: 1,
    pageSize: 10,
  });
  const [paramsAppointment, setParamsAppointment] = useState({
    keyword: null,
    periodId: null,
    date: null,
  });
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    if (role !== "Role_Staff") {
      dispatch(filterStaffForPatientThunk(paramsStaff)).then((res) => {
        const tempStaffList = res?.payload?.contents?.map((item) => {
          return {
            value: item.name,
            label: item.name,
          };
        });
        setStaffOptions(tempStaffList);
      });
    } else {
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
    }
  }, [paramsStaff, paramsPatient]);
  useEffect(() => {
    if (role === "Role_Staff") {
      let tempAppointmentList = null;
      dispatch(showForStaffByWeekThunk({ year, week: currentWeek })).then(
        (res) => {
          let currentWeekResult = res?.payload?.filter(
            (item) => new Date(item.workingDTO.date) > new Date()
          );
          currentWeekResult = currentWeekResult
            .sort(
              (a, b) =>
                new Date(a.workingDTO.date) - new Date(b.workingDTO.date)
            )
            .map((item) => ({
              value: item.id,
              label: `Ngày: ${moment(new Date(item.workingDTO.date)).format(
                "DD/MM/YYYY"
              )}`,
              workingDTO: item.workingDTO,
            }));

          dispatch(showForStaffByWeekThunk({ year, week: nextWeek })).then(
            (resp) => {
              let nextWeekResult = resp?.payload?.filter(
                (item) => new Date(item.workingDTO.date) > new Date()
              );
              nextWeekResult = nextWeekResult
                .sort(
                  (a, b) =>
                    new Date(a.workingDTO.date) - new Date(b.workingDTO.date)
                )
                .map((item) => ({
                  value: item.id,
                  label: `Ngày: ${moment(new Date(item.workingDTO.date)).format(
                    "DD/MM/YYYY"
                  )}`,
                  workingDTO: item.workingDTO,
                }));
              tempAppointmentList = [...currentWeekResult, ...nextWeekResult];
              tempAppointmentList && setAppointmentOptions(tempAppointmentList);
            }
          );
        }
      );
    } else {
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
            label: `Ngày: ${moment(new Date(item.workingDTO.date)).format(
              "DD/MM/YYYY"
            )}  - Số người đã đặt lịch: ${item.countPatientScheduled}`,
            workingDTO: item.workingDTO,
          };
        });
        setAppointmentOptions(tempAppointmentList);
      });
    }
  }, [paramsAppointment]);

  const processAppointments = async (week) => {
    try {
      const res = await dispatch(showForStaffByWeekThunk({ year, week }));
      let tempAppointmentList = res?.payload?.filter(
        (item) => new Date(item.workingDTO.date) > new Date()
      );

      tempAppointmentList = tempAppointmentList
        .sort(
          (a, b) => new Date(a.workingDTO.date) - new Date(b.workingDTO.date)
        )
        .map((item) => ({
          value: item.id,
          label: `Ngày: ${moment(new Date(item.workingDTO.date)).format(
            "DD/MM/YYYY"
          )}`,
          workingDTO: item.workingDTO,
        }));

      return tempAppointmentList;
    } catch (error) {
      console.error("Error processing appointments:", error);
      return [];
    }
  };
  const handleSelectTime = (target) => {
    const filAppointments = appoitmentOptions.filter((item) => {
      const periodId = item?.workingDTO?.periodId;

      // Chọn chỉ buổi sáng
      if (target.target.value === "morning") {
        return periodId === 1;
      }

      // Chọn chỉ buổi chiều
      if (target.target.value === "afternoon") {
        return periodId === 2;
      }

      return false;
    });
    form.resetFields(["workingId"]);

    setFilterAppointmentOptions(filAppointments);
  };

  // Hàm tìm kiếm với debounce
  const handleSearch = debounce((value) => {
    role !== "Role_Staff"
      ? setParamsStaff((prevParams) => ({
          ...prevParams,
          keyword: value ? value.toLowerCase() : null,
        }))
      : setParamsPatient((prevParams) => ({
          ...prevParams,
          keyword: value ? value.toLowerCase() : null,
        }));
  }, 300); // Thời gian debounce là 300ms

  const handleSelect = (value) => {
    if (role !== "Role_Staff") {
      form.setFieldValue("name", value);

      setParamsAppointment((prevParams) => ({
        ...prevParams,
        keyword: value.toLowerCase(),
      }));
    } else {
      const client = patientOptions.find((item) => item.value === value);
      console.log(client);

      setPatientId(client?.id);
    }
    form.resetFields(["timeOfDay", "workingId"]);
  };

  const onFinish = (data) => {
    const { name, ...restData } = data;
    const sendData = role === "Role_Staff" && { ...restData, patientId };
    console.log(sendData);

    role !== "Role_Staff"
      ? dispatch(createAppointmentByClientThunk(restData)).then((res) => {
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
        })
      : dispatch(createAppointmentByStaffThunk(sendData)).then((res) => {
          console.log(res);
          if (res?.payload?.message === "successfully") {
            toast.success("Đặt lịch thành công", {
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
            {role !== "Role_Staff" ? (
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
                  defaultValue={doctorDTO?.name}
                  style={{ width: "400px" }}
                  options={staffOptions}
                  onSearch={handleSearch} // Gọi hàm tìm kiếm debounce
                  onSelect={handleSelect}
                  allowClear
                  placeholder="Nhập tên"
                />
              </Form.Item>
            ) : (
              <Form.Item
                className="staff_item name"
                label="Bệnh nhân đặt lịch"
                name="name"
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
                  onSearch={handleSearch} // Gọi hàm tìm kiếm debounce
                  onSelect={handleSelect}
                  allowClear
                  placeholder="Nhập tên"
                />
              </Form.Item>
            )}
            <Form.Item
              className="time-of-day"
              label="Thời gian trong ngày"
              name="timeOfDay"
              style={{ textAlign: "left" }}
            >
              <Radio.Group onChange={handleSelectTime}>
                <Radio value="morning">Buổi sáng</Radio>
                <Radio value="afternoon">Buổi chiều</Radio>
              </Radio.Group>
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
                options={
                  filterAppoitmentOptions ? filterAppoitmentOptions : null
                }
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
            <Form.Item className="cancleBtn">
              <Button
                type="button"
                onClick={() => navigate("/manage/appointment")}
              >
                Quay lại
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
