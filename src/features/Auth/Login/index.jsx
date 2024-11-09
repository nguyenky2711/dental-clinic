import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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
} from "antd";
import messages from "../../../config/messageCode/messages";
import { loginThunk } from "../../../redux/action/auth";
import { AuthContext } from "../../../provider/AuthContext";
const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (data) => {
    dispatch(loginThunk(data))
      .then((res) => {
        if (
          res?.payload?.message == "Request failed with status code 403" ||
          res?.payload?.message == "Request failed with status code 404"
        ) {
          toast.error("Hãy kiểm tra lại tên đăng nhập hoặc mật khẩu", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "red", backgroundColor: "#DEF2ED" },
          });
        } else {
          login(res?.payload);
          toast.success("Đăng nhập thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#D7F1FD" },
          });
        }
      })
      .finally(() => {
        // navigate("/manage/patient");
      });
  };
  return (
    <div className="auth_container">
      <div className="img_auth">
        <img src={require("../../../assets/background_auth.png")} alt="logo" />
      </div>
      <div className="auth_form">
        <div className="auth_header">
          <span style={{ color: "#4CC9FE" }}>Nha khoa</span>{" "}
          <span style={{ color: "#F5F4B3" }}>Nụ cười</span>
        </div>

        <Form
          name="dynamic_form_nest_item"
          form={form}
          onFinish={onFinish}
          onFieldsChange={(changeField, allFields) => {}}
        >
          <Form.Item
            className="staff_item email"
            label="Tên đăng nhập (Số điện thoại)"
            name="userName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập",
              },
              // {
              //   type: "email",
              //   message: "Địa chỉ email không hợp lệ",
              // },
              // {
              //   validator: (_, value) => {
              //     if (value && value.length <= 256 && value.trim() != "") {
              //       return Promise.resolve();
              //     } else {
              //       if (value && value.length > 256) {
              //         return Promise.reject("Vui lòng nhập tối đa 256 ký tự");
              //       }
              //       if (!value || value == "") {
              //         return Promise.reject();
              //       }
              //       if (value.trim() == "") {
              //         return Promise.reject("Vui lòng nhập email");
              //       }
              //     }
              //   },
              // },
            ]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
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
              // {
              //   pattern: new RegExp(/^(?=.*[A-Z])(?=.*[0-9]).*$/),
              //   message: "Vui lòng nhập ít nhất 1 chữ in hoa và 1 chữ số",
              // },
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
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
          <Form.Item className="submitBtn">
            <Button type="submit" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
          <div className="auth_footer">
            <p>
              <Link to="/forgot-password">Quên mật khẩu? </Link>
            </p>
            <p>
              <NavLink to="/signup">Đăng ký </NavLink>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
