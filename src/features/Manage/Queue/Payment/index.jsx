import { Button, Form, Input, InputNumber, Radio, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import {
  addDebitPayThunk,
  createInvoiceThunk,
} from "../../../../redux/action/revenue";
import axios from "axios";

const downloadPdf = async (invoiceId) => {
  try {
    const response = await axios({
      url: `http://localhost:8085/api/invoice/export-pdf/${invoiceId}`,
      method: "GET",
      responseType: "blob", // Quan trọng: nhận về dữ liệu dưới dạng blob
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `HoaDon#${invoiceId}.pdf`; // Tên file muốn tải xuống
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("There was an error!", error);
  }
};

const PaymentPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState("pay");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    form.resetFields();
  };
  const onFinish = (data) => {
    dispatch(
      selectedOption === "pay"
        ? createInvoiceThunk(data)
        : addDebitPayThunk(data)
    ).then((res) => {
      console.log(res);
      if (res?.payload?.message === "successfully") {
        downloadPdf(res?.payload?.id);
        form.resetFields();
      }
    });
  };

  return (
    <div className="container">
      <div className="payment-form-container">
        <div className="register-header">
          {" "}
          {selectedOption === "pay" ? "Thanh toán" : "Trả nợ"}
        </div>
        <Radio.Group onChange={handleOptionChange} value={selectedOption}>
          <Radio value="pay">Thanh toán</Radio>
          <Radio value="repay">Trả nợ</Radio>
        </Radio.Group>
        <div className="form_register">
          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            onFieldsChange={(changeField, allFields) => {}}
            initialValues={{ paymentMethod: "Tiền mặt" }}
          >
            <Form.Item
              className="staff_item name"
              label={selectedOption === "pay" ? `Mã khám` : `Mã hoá đơn`}
              name={selectedOption === "pay" ? "objectiveId" : "invoiceId"}
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập mã ${
                    selectedOption === "pay" ? "khám" : "hoá đơn"
                  }`,
                },
              ]}
            >
              <Input
                placeholder={`Nhập mã ${
                  selectedOption === "pay" ? "khám" : "hoá đơn"
                }`}
              />
            </Form.Item>
            {selectedOption === "pay" && (
              <Form.Item
                className="staff_item name"
                label="Phương thức thanh toán"
                name="paymentMethod"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn phương thức thanh toán",
                  },
                ]}
              >
                <Select
                  // defaultValue="Tiền mặt"
                  placeholder="Chọn phương thức thanh toán"
                >
                  <Option value="Tiền mặt">Tiền mặt</Option>
                  <Option value="Chuyển khoản">Chuyển khoản</Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item
              className="discount_value"
              label="Khách hàng trả"
              name={selectedOption === "pay" ? "amountPaid" : "paidDebit"}
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