import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { changePasswordThunk } from "../../../../store/action/auth";
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
const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (data) => {
    let dataSend = new FormData();
    dataSend.append("newPassword", data.newPassword);
    dataSend.append("oldPassword", data.oldPassword);
    dispatch(changePasswordThunk(dataSend)).then((res) => {
      console.log(res);
      if (
        res?.payload?.response?.data?.message == "Current password is incorrect"
      ) {
        toast.error("Mật khẩu cũ không đúng", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#DEF2ED" },
        });
      } else {
        toast.success("Đổi mật khẩu thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="container">
      <div className="changePw_container">
        <div className="changePw_header">Đổi mật khẩu</div>
        <div className="form_changePw">
          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            onFieldsChange={(changeField, allFields) => {}}
          >
            <Form.Item
              className="staff_item password"
              name="oldPassword"
              label={
                <>
                  <p>Mật khẩu cũ</p>{" "}
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

            <Form.Item className="submitBtn">
              <Button type="submit" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
