import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import { Button, Form, Input, Select } from "antd";
import {
  getStaffByTokenThunk,
  updateStaffThunk,
} from "../../../../redux/action/staff";
const StaffInfPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [staffResult, setStaffResult] = useState();
  useEffect(() => {
    dispatch(getStaffByTokenThunk()).then((res) => {
      const staffResult = res?.payload;
      if (staffResult) {
        form.setFieldValue("name", staffResult.name);
        form.setFieldValue(
          "professionalQualification",
          staffResult.professionalQualification
        );
        form.setFieldValue("phoneNumber", staffResult.phoneNumber);
        setStaffResult(res?.payload);
      }
    });
  }, []);

  const onFinish = (data) => {
    const staffDTO = {
      name: data.name,
      professionalQualification: data.professionalQualification,
      phoneNumber: data.phoneNumber,
    };
    let sendData = {
      staffId: staffResult.id,
      staffDTO,
    };
    dispatch(updateStaffThunk(sendData)).then((res) => {
      if (res?.payload?.message === "successfully") {
        toast.success("Cập nhật thông tin thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
        navigate("/manage/queue");
      } else {
        if (res?.payload?.response?.data?.message === "DATA EXISTING") {
          toast.error("Số điện thoại đã được dùng để đăng ký tài khoản", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "red", backgroundColor: "#DEF2ED" },
          });
        } else {
          toast.error("Cập nhật thông tin thất bại", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "red", backgroundColor: "#DEF2ED" },
          });
        }
      }
    });
  };
  return (
    <div className="container">
      <div className="register_container">
        <div className="register-header">Thông tin nhân viên</div>
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
              className="staff_item name"
              label="Trình độ chuyên môn"
              name="professionalQualification"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trình độ chuyên môn",
                },
                {
                  pattern: new RegExp(
                    /^[A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+( [A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+)*$/
                  ),
                  message: "Trình độ chuyên môn không hợp lệ",
                },
                {
                  validator: (_, value) => {
                    if (value) {
                      if (value.length < 2 || value.length > 64) {
                        return Promise.reject(
                          "Trình độ chuyên môn phải có độ dài từ 2 đến 64 ký tự"
                        );
                      }
                      if (value.trim() == "") {
                        return Promise.reject(
                          "Vui lòng nhập trình độ chuyên môn"
                        );
                      }
                      return Promise.resolve();
                    } else if (!value || value == "") {
                      return Promise.reject();
                    }
                  },
                },
              ]}
            >
              <Input placeholder="Nhập trình độ chuyên môn" />
            </Form.Item>
            <Form.Item
              className="staff_item phone"
              label={"Số điện thoại"}
              name={staffResult ? "phoneNumber" : "userName"}
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

            <Form.Item className="submitBtn">
              <Button type="submit" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                className="cancleBtn"
                type="button"
                onClick={() => navigate(`/manage/queue`)}
              >
                Huỷ
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default StaffInfPage;
