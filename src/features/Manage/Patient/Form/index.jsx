import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
import { createPatientThunk } from "../../../../redux/action/patient";
const CreatePatientPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();
  const onFinish = (data) => {
    console.log(data);
    const sendData = {
      patientDTO: {
        name: data.name,
        birthday: moment(new Date(data.birthday)).format("YYYY-MM-DD"),
        address: data.address,
        phoneNumber: data.phoneNumber,
        medicalHistory: "No significant medical history",
      },
      loginDTO: {
        email: data.email,
        password: data.password,
      },
    };
    dispatch(createPatientThunk(sendData)).then((res) => {
      console.log(res);
      if (res?.payload?.message === "successfully") {
        toast.success("Đăng ký tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
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
        <div className="register-header">Đăng ký tài khoản khách hàng</div>
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

            <Form.Item
              className="staff_item phone"
              label="Số điện thoại"
              name="phoneNumber"
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
            <Form.Item
              className="staff_item email"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ email",
                },
                {
                  type: "email",
                  message: "Địa chỉ email không hợp lệ",
                },
                {
                  validator: (_, value) => {
                    if (value && value.length <= 256 && value.trim() != "") {
                      return Promise.resolve();
                    } else {
                      if (value && value.length > 256) {
                        return Promise.reject("Vui lòng nhập tối đa 256 ký tự");
                      }
                      if (!value || value == "") {
                        return Promise.reject();
                      }
                      if (value.trim() == "") {
                        return Promise.reject("Vui lòng nhập họ và tên");
                      }
                    }
                  },
                },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              className="staff_item password"
              name="password"
              label={
                <>
                  <p>Mật khẩu</p>{" "}
                </>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  pattern: new RegExp(/^(?=.*[A-Z])(?=.*[0-9]).*$/),
                  message: "Vui lòng nhập ít nhất 1 chữ in hoa và 1 chữ số",
                },
                {
                  validator: (_, value) => {
                    if (value) {
                      if (value.trim() === "") {
                        return Promise.reject("Mật khẩu không được bỏ trống");
                      }
                      if (value.length < 6 || value.length > 32) {
                        return Promise.reject(
                          "Mật khẩu phải có độ dài từ 6 đến 32 ký tự"
                        );
                      }
                    }
                    return Promise.resolve(); // Resolve if the value is valid
                  },
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Nhập lại mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu không trùng khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="submitBtn">
              <Button type="submit" htmlType="submit">
                Tạo
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePatientPage;
