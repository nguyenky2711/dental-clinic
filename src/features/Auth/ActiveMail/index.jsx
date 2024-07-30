import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import { Button, Form, Input, InputNumber } from "antd";
import {
  confirmWithOTPThunk,
  loginThunk,
  sendActiveMailThunk,
} from "../../../redux/action/auth";
import { AuthContext } from "../../../provider/AuthContext";
const ActiveMailPage = () => {
  const { login } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendMail, setSendMail] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (data) => {
    console.log(data);
    if (!sendMail) {
      dispatch(sendActiveMailThunk({ email: data.email })).then((res) => {
        console.log(res);
        if (res?.payload?.message === "check your email") {
          toast.success("Hãy kiểm tra mail của bạn", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#D7F1FD" },
          });
          setSendMail(true);
        } else if (
          res?.payload?.response?.data?.errors?.message ===
          "the account not active email"
        ) {
          toast.error("Kiểm tra lại email được nhập", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "red", backgroundColor: "#DEF2ED" },
          });
        }
      });
    }
    if (sendMail) {
      dispatch(confirmWithOTPThunk(data)).then((res) => {
        console.log(res);
        if (res?.payload?.message === "successfully") {
          toast.success("Đã kích hoạt tài khoản thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#D7F1FD" },
          });
          navigate("/appointment");
        }
      });
    }
  };
  return (
    <div className="container">
      <div className="login_container">
        <div className="login-header">Xác thực người dùng</div>
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
            <Form.Item name="otp" label="Mã OTP">
              <Input
                style={{ width: "300px" }}
                placeholder="Nhập mã OTP"
                disabled={!sendMail}
              />
            </Form.Item>
            <Form.Item className="submitBtn">
              <Button type="submit" htmlType="submit">
                {!sendMail ? "Gửi OTP qua email" : "Kích hoạt tài khoản"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ActiveMailPage;
