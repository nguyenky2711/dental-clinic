import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { loginThunk } from "../../../store/action/auth";
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
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (data) => {
    // console.log(data);

    dispatch(loginThunk(data)).then((res) => {
      if (res?.payload?.email == data.email && res?.payload?.token) {
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#D7F1FD" },
        });
        navigate("/manage/patient");
      } else {
        toast.error("Hãy kiểm tra lại tài khoản hoặc mật khẩu", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#DEF2ED" },
        });
      }
    });
  };
  return (
    <div className="container">
      <div className="login_container">
        <div className="login-header">Đăng nhập</div>
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
                        return Promise.reject("Vui lòng nhập email");
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
            <div className="flex justify-between">
              <p>
                <Link to="/resetPassword/request">Quên mật khẩu? </Link>
              </p>
              <p>
                <NavLink to="/signup">Đăng ký </NavLink>
              </p>
            </div>
            {/* <div className="register-button">
                <Form.Item className="checkBtn" name="continue">
                  <Checkbox
                    onChange={(e) =>
                      form.setFieldValue("continue", e.target.checked)
                    }
                  >
                    Tiếp tục đăng ký ?
                  </Checkbox>
                </Form.Item>
                <Form.Item className="submitBtn">
                  <Button
                    type="submit"
                    htmlType="submit"
                    onClick={() => !hadErrors && setOpenModal(true)}
                  >
                    Đăng ký
                  </Button>
                </Form.Item>
                
              </div> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
