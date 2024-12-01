import { Select, Input, Form, DatePicker, Dropdown, Space, Button } from "antd";
import React, { useState, useEffect } from "react";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import "./styles.scss";
import PatientLogo from "../../../../assets/patient_2376100.png";
const PatientInforSearch = ({ handleSubmit, handleChange }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [sendData, setSendData] = useState({
    keyword: null,
  });
  const onFinish = (data) => {
    const sendData = {
      keyword:
        data?.keyword?.trim() != "" ? data.keyword.trim().toLowerCase() : null,
    };
    handleSubmit(sendData);
  };
  useEffect(() => {
    handleChange(sendData);
  }, [sendData]);

  return (
    <>
      <Form
        name="normal_search"
        className="search-form patient"
        onFinish={onFinish}
        form={form}
      >
        <div className="keyWord_search-container">
          <Form.Item name="keyword" className="search-form-input">
            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="Tìm kiếm theo tên"
              onChange={(e) =>
                setSendData((preVal) => ({
                  ...preVal,
                  keyword:
                    e.target.value.trim() != ""
                      ? e.target.value.trim().toLowerCase()
                      : null,
                }))
              }
            />
          </Form.Item>
          <Form.Item className="search-form-btn submit-btn">
            <Button type="primary" htmlType="submit">
              <SearchOutlined />
              <p>Tìm kiếm</p>
            </Button>
          </Form.Item>
          <Form.Item className="search-form-btn add-btn">
            <Button
              type="primary"
              htmlType="button"
              onClick={() => navigate("/manage/patient/create")}
            >
              <UserAddOutlined />
              <p>Thêm thông tin bệnh nhân</p>
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default PatientInforSearch;
