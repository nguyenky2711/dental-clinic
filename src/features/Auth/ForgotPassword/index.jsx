import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import { Button, Form, Input, InputNumber } from "antd";
import {
  changePassswordWhenForgotThunk,
  confirmMailThunk,
  confirmResetPasswordOTPThunk,
  confirmWithOTPThunk,
  loginThunk,
  sendActiveMailThunk,
} from "../../../redux/action/auth";
import { AuthContext } from "../../../provider/AuthContext";
const ForgotPasswordPage = () => {
  const { login } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendMail, setSendMail] = useState(false);
  const [confirmTrue, setConfirmTrue] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (data) => {
    if (confirmTrue) {
      const { confirm, ...sendData } = data;
      dispatch(changePassswordWhenForgotThunk(sendData)).then((res) => {
        if (res?.payload?.message === "successfully") {
          toast.success("Đổi mật khẩu thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#D7F1FD" },
          });
          navigate("/login");
        }
      });
    } else {
      if (!sendMail) {
        dispatch(confirmMailThunk({ email: data.email })).then((res) => {
          console.log(res);
          if (res?.payload?.message === "check your email") {
            toast.success("Hãy kiểm tra mail của bạn", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "green", backgroundColor: "#D7F1FD" },
            });
            setSendMail(true);
          }
        });
      }
      if (sendMail) {
        dispatch(confirmResetPasswordOTPThunk(data)).then((res) => {
          console.log(res);
          if (res?.payload === true) {
            setConfirmTrue(true);
          }
        });
      }
    }
  };
  return (
    <div className="container">
      <div className="login_container">
        <div className="login-header">Kích hoạt tài khoản</div>
        <div className="form_login">
          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            onFieldsChange={(changeField, allFields) => {}}
          >
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
                        return Promise.reject("Vui lòng nhập địa chỉ email");
                      }
                    }
                  },
                },
              ]}
            >
              <Input placeholder="Nhập địa chỉ email" />
            </Form.Item>
            {confirmTrue ? (
              <>
                <Form.Item
                  className="staff_item password"
                  name="newPassword"
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
                      validator: (_, value) => {
                        if (value) {
                          if (value.trim() === "") {
                            return Promise.reject(
                              "Mật khẩu không được bỏ trống"
                            );
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
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng xác nhận mật khẩu!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
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
              </>
            ) : (
              <Form.Item name="otp" label="Mã OTP">
                <Input
                  style={{ width: "300px" }}
                  placeholder="Nhập mã OTP"
                  disabled={!sendMail}
                />
              </Form.Item>
            )}

            <Form.Item className="submitBtn">
              <Button type="submit" htmlType="submit">
                {confirmTrue
                  ? "Đổi mật khẩu"
                  : !sendMail
                  ? "Gửi OTP qua email"
                  : "Xác thực người dùng"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
