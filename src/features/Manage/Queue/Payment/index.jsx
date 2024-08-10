import { Button, Form, Input, InputNumber, Select } from "antd";
import { Option } from "antd/es/mentions";
import React from "react";
import { useDispatch } from "react-redux";
import "./style.scss";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (data) => {};
  return (
    <div className="container">
      <div className="payment-form-container">
        <div className="register-header">Thanh toán</div>
        <div className="form_register">
          <Form>
            <Form.Item
              className="staff_item name"
              label={`Mã khám`}
              name="objectiveId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã khám",
                },
              ]}
            >
              <Input placeholder="Nhập mã khám" />
            </Form.Item>
            <Form.Item
              className="staff_item name"
              label="Phương thức thanh toán"
              name="npaymentMethodote"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán",
                },
              ]}
            >
              <Select
                defaultValue="Tiền mặt"
                placeholder="Chọn phương thức thanh toán"
              >
                <Option value="Tiền mặt">Tiền mặt</Option>
                <Option value="Chuyển khoản">Chuyển khoản</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="discount_value"
              label="Khách hàng trả"
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
                        return Promise.reject("Số tiền phải lớn hơn 0");
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
                placeholder="Nhập số tiền"
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
            <Form.Item className="submitBtn">
              <Button type="submit" htmlType="submit">
                Thanh toán
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
