import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import {
//   changeInforThunk,
//   getUserByIdThunk,
// } from "../../../../store/action/auth";
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
const ChangeInforPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth.login.currentUser);
  const [realData, setRealData] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getUserByIdThunk(data?.userDTO?.id)).then((res) => {
      setRealData(res?.payload?.data);
    });
  }, []);

  const onFinish = (value) => {
    let dataSend = new FormData();
    dataSend.append("name", value.name);
    dataSend.append("address", value.address);
    dataSend.append("phone", value.phone);
    // dispatch(changeInforThunk([data?.userDTO?.id, dataSend])).then((res) => {
    //   console.log(res);
    //   if (res?.payload == undefined) {
    //     toast.error("Cập nhật tài khoản thất bại", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       style: { color: "red", backgroundColor: "#DEF2ED" },
    //     });
    //   } else {
    //     toast.success("Cập nhật tài khoản thành công", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       style: { color: "green", backgroundColor: "#DEF2ED" },
    //     });
    //     data?.userDTO?.role != "admin"
    //       ? navigate("/")
    //       : navigate("/manage/product");
    //   }
    // });
  };
  console.log(realData);
  return (
    <div className="container">
      <div className="updateInfo_container">
        <div className="updateInfo-header">Thông tin tài khoản</div>
        <div className="form_updateInfo">
          {realData != undefined && (
            //  defaultValue={realData?.userDTO?.email}
            // defaultValue={realData?.userDTO?.name}
            // defaultValue={realData?.userDTO?.address}
            // defaultValue={realData?.userDTO?.phone}

            <Form
              name="dynamic_form_nest_item"
              form={form}
              onFinish={onFinish}
              onFieldsChange={(changeField, allFields) => {}}
              initialValues={{
                email: realData?.userDTO?.email,
                name: realData?.userDTO?.name,
                address: realData?.userDTO?.address,
                phone: realData?.userDTO?.phone,
              }}
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
                          return Promise.reject(
                            "Vui lòng nhập tối đa 256 ký tự"
                          );
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
                <Input placeholder="Nhập email nhân viên" disabled />
              </Form.Item>
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
                name="phone"
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
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeInforPage;
