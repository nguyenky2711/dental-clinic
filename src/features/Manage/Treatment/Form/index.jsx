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
import dayjs from "dayjs";
import {
  createStaffThunk,
  updateStaffThunk,
} from "../../../../redux/action/staff";
import { PlusSquareOutlined } from "@ant-design/icons";
import {
  createTreatmentThunk,
  updateTreatmentThunk,
} from "../../../../redux/action/treatment";
const TreatmentFormPage = ({ propsData = null, action }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  useEffect(() => {
    console.log(propsData);
    if (propsData?.selectedTreatment) {
      form.setFieldValue("cost", propsData?.selectedTreatment.cost);
      form.setFieldValue("note", propsData?.selectedTreatment.note);
      form.setFieldValue("name", propsData?.selectedTreatment.name);
      form.setFieldValue("unit", propsData?.selectedTreatment.unit);
    }
  }, [propsData]);
  const onFinish = (data) => {
    if (propsData?.selectedTreatment) {
      const { id, ...restTreatmentData } = propsData?.selectedTreatment;
      const sendData = {
        ...data,
        serviceId: propsData?.currentService?.details?.id,
        treatmentId: id,
      };
      console.log(sendData);
      dispatch(updateTreatmentThunk(sendData)).then((res) => {
        console.log(res);
        if (res?.payload?.message === "successfully") {
          action("cancle");
        }
      });
    } else {
      const sendData = {
        ...data,
        serviceId: propsData?.currentService?.details?.id,
      };
      console.log(sendData);
      dispatch(createTreatmentThunk(sendData)).then((res) => {
        console.log(res);
        if (res?.payload?.message === "successfully") {
          form.resetFields();
        }
      });
    }
  };
  return (
    <div className="container">
      <div className="treatment-form-container">
        <div className="register-header">
          {`${
            propsData?.selectedTreatment ? "Thông tin" : "Tạo mới"
          } phương thức điều trị `}
        </div>
        <div className="form_register">
          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            onFieldsChange={(changeField, allFields) => {}}
          >
            <>
              <Form.Item
                className="staff_item name"
                label={`Tên phương thức điều trị`}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên phương thức",
                  },
                  {
                    pattern: new RegExp(
                      /^[A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+( [A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+)*$/
                    ),
                    message: "Tên phương thức không hợp lệ",
                  },
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (value.length < 2 || value.length > 64) {
                          return Promise.reject(
                            "Tên phương thức phải có độ dài từ 2 đến 64 ký tự"
                          );
                        }
                        if (value.trim() == "") {
                          return Promise.reject(
                            "Vui lòng nhập tên phương thức"
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
                <Input placeholder="Nhập tên phương thức" />
              </Form.Item>
              <Form.Item
                className="staff_item name"
                label="Ghi chú"
                name="note"
                rules={[
                  {
                    required: false,
                    message: "Vui lòng nhập ghi chú",
                  },
                ]}
              >
                <Input placeholder="Nhập ghi chú" />
              </Form.Item>
              <Form.Item
                className="discount_value"
                label="Giá tiền"
                name={"cost"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá tiền",
                  },
                  {
                    validator: (_, value) => {
                      if (value != undefined && value != null) {
                        if (value <= 0) {
                          return Promise.reject("Giá tiền phải lớn hơn 0");
                        }
                        return Promise.resolve();
                      } else {
                        return Promise.reject();
                      }
                    },
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  placeholder="Nhập giá tiền"
                  onKeyDown={(event) => {
                    if (
                      !(
                        /[0-9]/.test(event.key) ||
                        event.key === "Backspace" ||
                        event.key === "Delete" ||
                        event.key.startsWith("Arrow")
                      )
                    ) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                className="staff_item name"
                label="Đơn vị tính"
                name="unit"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đơn vị tính",
                  },
                ]}
              >
                <Input placeholder="Nhập đơn vị tính" />
              </Form.Item>
            </>

            <Form.Item className="submitBtn">
              <Button type="submit" htmlType="submit">
                {propsData?.selectedTreatment ? "Cập nhật" : "Thêm"}
              </Button>
            </Form.Item>
            <Form.Item className="cancleBtn">
              <Button type="button" onClick={() => action("cancle")}>
                Huỷ
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TreatmentFormPage;
