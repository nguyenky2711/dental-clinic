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
  const [sendData, setSendData] = useState({
    keyword: null,
    positionId: null,
  });
  const onFinish = (data) => {
    const sendData = {
      keyword:
        data?.keyword?.trim() != "" ? data.keyword.trim().toLowerCase() : null,
      positionId: data?.positionId ? data.positionId : null,
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
        className="search-form"
        onFinish={onFinish}
        form={form}
      >
        <div className="keyWord_search-container">
          <Form.Item name="keyword" className="search-form-input">
            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="Tìm kiếm theo tên, sdt"
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
          <Form.Item name="positionId" className="search-form-select">
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
              onChange={(value) =>
                setSendData((preVal) => ({
                  ...preVal,
                  positionId: value ? value : null,
                }))
              }
            />
          </Form.Item>
          <Form.Item className="search-form-btn submit-btn">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
          <Form.Item className="search-form-btn add-btn">
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
