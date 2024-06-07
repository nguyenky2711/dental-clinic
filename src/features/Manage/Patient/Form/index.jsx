import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { registerThunk } from "../../../store/action/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
} from "antd";
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
    }
  }, [patientResult]);

  const onFinish = (data) => {
    const patientDTO = {
      name: data.name,
      birthday: moment(new Date(data.birthday)).format("YYYY-MM-DD"),
      address: data.address,
      // phoneNumber: data.phoneNumber,
      medicalHistory: "No significant medical history",
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
        toast.error("Địa chỉ mail đã được dùng để đăng ký tài khoản", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#DEF2ED" },
        });
      }
    });
  };
  return (
    <div className="container">
      <div className="register_container">
        <div className="register-header">
          {patientResult ? "Thông tin khách hàng" : "Thêm thông tin khách hàng"}
        </div>
        <div className="form_register">
          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            onFieldsChange={(changeField, allFields) => {}}
          >
            <div className="name_gender">
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
            </div>
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
                disabledDate={(d) => !d || d.isAfter(new Date())}
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

            {!patientResult ? (
              <Form.Item
                className="staff_item phone"
                label="Tên đăng nhập (Số điện thoại)"
                name="userName"
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
            ) : (
              <></>
            )}

            <Form.Item className="submitBtn">
              <Button type="submit" htmlType="submit">
                {patientResult ? "Cập nhật" : "Thêm"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePatientPage;
