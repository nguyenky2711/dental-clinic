import { Select, Input, Form, DatePicker, Dropdown, Space, Button } from "antd";
import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  BarsOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
// import { getAllRolesThunk } from "src/redux/action/userManager";
import { useDispatch } from "react-redux";
import "./styles.scss";
import moment from "moment";
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
        className="treatment-searchForm"
        onFinish={onFinish}
        form={form}
      >
        <div className="keyWord_search-container">
          <Form.Item name="keyword" className="treatment-searchForm-input">
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
          <Form.Item className="treatment-searchForm-btn">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
          <Form.Item className="treatment-searchForm-btn">
            <Button
              type="primary"
              htmlType="button"
              onClick={() => navigate("/manage/patient/create")}
            >
              Thêm thông tin bệnh nhân
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default PatientInforSearch;
