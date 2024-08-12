import { Select, Input, Form, DatePicker, Dropdown, Space, Button } from "antd";
import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  DownOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import "./styles.scss";
const StaffinforSearch = ({ handleSubmit, handleChange }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (data) => {
    const sendData = {
      keyword: data?.keyword ? data.keyword.toLowerCase() : null,
      positionId: data?.positionId ? data.positionId : null,
    };
    handleSubmit(sendData);
  };

  return (
    <>
      <Form
        name="normal_search"
        className="employee-searchForm"
        onFinish={onFinish}
        form={form}
      >
        <div className="keyWord_search-container">
          <Form.Item name="keyword" className="employee-searchForm-input">
            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="Tìm kiếm theo tên, sdt"
            />
          </Form.Item>
          <Form.Item name="positionId" className="employee-searchForm-select">
            <Select
              suffixIcon={<ContactsOutlined className="site-form-item-icon" />}
              placeholder="Chọn vị trí"
              options={[
                {
                  value: "",
                  label: "Chọn",
                },
                {
                  value: 1,
                  label: "Bác sĩ",
                },
                {
                  value: 2,
                  label: "Lễ tân ",
                },
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item className="employee-searchForm-btn">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
          <Form.Item className="employee-searchForm-btn">
            <Button
              type="primary"
              htmlType="button"
              onClick={() => navigate(`/manage/staff/create`)}
            >
              Thêm nhân viên
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default StaffinforSearch;
