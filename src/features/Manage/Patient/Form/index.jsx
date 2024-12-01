import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import PatientLogo from "../../../../assets/patient_2376100.png";
import { Button, Form, Input, DatePicker } from "antd";
import moment from "moment";
import {
  createPatientThunk,
  updatePatientThunk,
} from "../../../../redux/action/patient";
import dayjs from "dayjs";
const CreatePatientPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { patientId } = useParams();
  const patientResult = useSelector((state) => {
    if (patientId) {
      return state.patient.listPatients.contents.find(
        (item) => item.id == patientId
      );
    }
    return undefined;
  });
  useEffect(() => {
    if (patientResult) {
      form.setFieldValue("name", patientResult.name);
      form.setFieldValue("birthday", dayjs(patientResult.birthday));
      form.setFieldValue("address", patientResult.address);
      form.setFieldValue("medicalHistory", patientResult.medicalHistory);
      form.setFieldValue("phoneNumber", patientResult.phoneNumber);
    }
  }, [patientResult]);

  const onFinish = (data) => {
    const patientDTO = {
      name: data.name,
      birthday: moment(new Date(data.birthday)).format("YYYY-MM-DD"),
      address: data.address ? data.address : "Chưa có thông tin",
      medicalHistory: data.medicalHistory
        ? data.medicalHistory
        : "Chưa có thông tin",

      ...(patientResult && { phoneNumber: data.phoneNumber }), // Conditionally include phoneNumber
    };

    const loginDTO = {
      userName: data.userName,
      password: "123456",
    };
    let sendData = {};
    if (patientResult) {
      sendData = {
        patientId,
        patientDTO,
      };
    } else {
      sendData = {
        patientDTO,
        loginDTO,
      };
    }
    dispatch(
      patientResult
        ? updatePatientThunk(sendData)
        : createPatientThunk(sendData)
    ).then((res) => {
      console.log(res);
      if (res?.payload?.message === "successfully") {
        toast.success(
          patientResult
            ? "Cập nhật thông tin thành công"
            : "Thêm thông tin thành công",
          {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#DEF2ED" },
          }
        );
        navigate("/manage/patient");
      } else {
        if (res?.payload?.response?.data?.message === "DATA EXISTING") {
          toast.error("Số điện thoại đã tồn tại", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "red", backgroundColor: "#DEF2ED" },
          });
        } else {
          toast.error(
            patientResult
              ? "Cập nhật thông tin thất bại"
              : "Thêm thông tin thất bại",
            {
              position: "top-right",
              autoClose: 3000,
              style: { color: "red", backgroundColor: "#DEF2ED" },
            }
          );
        }
      }
    });
  };
  return (
    <div className="form-container patient">
      <div className="form-cover">
        <div className="form-header">
          <img src={PatientLogo} alt="" />
          <p>
            {patientResult
              ? "Thông tin khách hàng"
              : "Thêm thông tin khách hàng"}
          </p>
        </div>
        <div className="form-body">
          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            onFieldsChange={(changeField, allFields) => {}}
          >
            <div className="form-part">
              <Form.Item
                className="staff_item name"
                label="Họ và tên"
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
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (value.length < 2 || value.length > 64) {
                          return Promise.reject(
                            "Họ và tên phải có độ dài từ 2 đến 64 ký tự"
                          );
                        }
                        if (value.trim() == "") {
                          return Promise.reject("Vui lòng nhập họ và tên");
                        }
                        return Promise.resolve();
                      } else if (!value || value == "") {
                        return Promise.reject();
                      }
                    },
                  },
                ]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
              <Form.Item
                className="staff_item phone"
                label={
                  patientResult
                    ? "Số điện thoại"
                    : "Tên đăng nhập (Số điện thoại)"
                }
                name={patientResult ? "phoneNumber" : "userName"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message: "Số điện thoại không hợp lệ",
                  },
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (value.trim() == "") {
                          return Promise.reject("Vui lòng nhập họ và tên");
                        }
                        if (value.length < 9 || value.length > 10) {
                          return Promise.reject(
                            "Số điện thoại phải có độ dài từ 9 đến 10 ký tự"
                          );
                        } else {
                          return value.length == 9
                            ? value.charAt(0) == 1 ||
                              value.charAt(0) == 0 ||
                              value.charAt(0) == 2 ||
                              value.charAt(0) == 4 ||
                              value.charAt(0) == 6
                              ? Promise.reject("Đầu số điện thoại không đúng")
                              : Promise.resolve()
                            : value.charAt(0) != 0
                            ? Promise.reject("Đầu số điện thoại không đúng")
                            : value.charAt(1) == 1 ||
                              value.charAt(1) == 0 ||
                              value.charAt(1) == 2 ||
                              value.charAt(1) == 4 ||
                              value.charAt(1) == 6
                            ? Promise.reject("Đầu số điện thoại không đúng")
                            : Promise.resolve();
                        }
                      } else if (!value || value == "") {
                        return Promise.reject();
                      }
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Số điện thoại bắt đầu với đầu số 03,05,07,09"
                  addonBefore="+84"
                />
              </Form.Item>
            </div>
            <div className="form-part">
              <Form.Item
                className="staff_item name"
                label="Tiền sử bệnh án"
                name="medicalHistory"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiền sử bệnh án",
                  },
                ]}
              >
                <Input placeholder="Nhập tiền sử bệnh án" />
              </Form.Item>
              <Form.Item
                className="student_item date"
                label="Ngày sinh"
                name={"birthday"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày sinh",
                  },
                ]}
              >
                <DatePicker
                  format={"DD/MM/YYYY"}
                  disabledDate={(d) => {
                    const oneYearAgo = moment()
                      .subtract(1, "year")
                      .startOf("day");
                    return !d || d.isAfter(oneYearAgo);
                  }}
                  placeholder="Chọn ngày sinh"
                />
              </Form.Item>
              <Form.Item
                className="staff_item name"
                label="Địa chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ",
                  },
                ]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </div>

            <div className="form-btn-cover">
              <Form.Item>
                <Button
                  className="cancleBtn"
                  type="button"
                  onClick={() => navigate(`/manage/patient`)}
                >
                  Huỷ
                </Button>
              </Form.Item>
              <Form.Item>
                <Button className="submitBtn" type="submit" htmlType="submit">
                  {patientResult ? "Cập nhật" : "Thêm"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePatientPage;
