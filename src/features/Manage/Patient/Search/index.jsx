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
  const [activeFilter, setActiveFilter] = useState(false);
  const onReset = () => {
    form.resetFields(["status", "date", "role", "level"]);
  };
  const onFinish = (values) => {
    const sendData = {
      keyword:
        values.name != undefined && values.name.trim() != ""
          ? values.name
          : null,
    };
    handleSubmit(sendData);
  };

  return (
    <>
      <Form
        name="normal_search"
        className="treatment-searchForm"
        onFinish={onFinish}
        form={form}
      >
        <div className="keyWord_search-container">
          <Form.Item name="name" className="treatment-searchForm-input">
            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="Tìm kiếm theo tên"
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
          <Form.Item className="treatment-searchForm-btn">
            <Button
              type="primary"
              htmlType="button"
              onClick={() => navigate("/manage/medical-record/create")}
            >
              Thêm bệnh án
            </Button>
          </Form.Item>

          {/* <Form.Item
            className={`treatment-searchForm-filterBtn ${
              activeFilter ? "active" : ""
            }`}
          >
            <FilterOutlined onClick={handleActive} />
          </Form.Item> */}

          {/* <Form.Item
            name="role"
            // label="Vai trò"
            className="treatment-searchForm-select service"
          >
            <Select
              suffixIcon={<BarsOutlined className="site-form-item-icon" />}
              placeholder="Chọn"
              options={listPosstions}
              onChange={(value) => setSendRole(value)}
              allowClear={() => {
                setSendRole();
                return true;
              }}
            />
          </Form.Item>
          <Form.Item
            name="level"
            // label="Giá"
            className="treatment-searchForm-select price"
          >
            <Select
              suffixIcon={<DollarOutlined className="site-form-item-icon" />}
              placeholder="Chọn"
              options={[
                {
                  value: "",
                  label: "Chọn",
                },
                {
                  value: "asc",
                  label: "Nhỏ đến lớn",
                },
                {
                  value: "desc",
                  label: "Lớn đến nhỏ ",
                },
              ]}
              onChange={(value) => setSendLevel(value)}
              allowClear={() => {
                setSendLevel();
                return true;
              }}
            />
          </Form.Item> */}
        </div>

        {activeFilter ? (
          <div className="filter_search-container">
            {/* <Form.Item name="status" label="Trạng thái">
              <Select
                suffixIcon={<HddFilled className="site-form-item-icon" />}
                placeholder={"Chọn"}
                options={[
                  {
                    value: "",
                    label: "Chọn",
                  },
                  {
                    value: "Active",
                    label: (
                      <>
                        <span
                          style={{
                            backgroundColor: "#25A71C",
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            marginRight: "15px",
                            display: "inline-block", // Add this to make the element visible
                          }}
                        ></span>
                        Active
                      </>
                    ),
                  },
                  {
                    value: "Not Active",
                    label: (
                      <>
                        <span
                          style={{
                            backgroundColor: "#DC2020",
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            marginRight: "15px",
                            display: "inline-block", // Add this to make the element visible
                          }}
                        ></span>
                        Not Active
                      </>
                    ),
                  },
                  {
                    value: "Lock",
                    label: (
                      <>
                        <span
                          style={{
                            backgroundColor: "#E6E6E6",
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            marginRight: "15px",
                            display: "inline-block", // Add this to make the element visible
                          }}
                        ></span>
                        Lock
                      </>
                    ),
                  },
                ]}
                onChange={(value) => setSendStatus(value)}
                allowClear={() => {
                  setSendStatus();
                  return true;
                }}
              />
            </Form.Item> */}
            {/* <Form.Item name="date" label="Ngày đăng ký">
              <DatePicker
                placeholder="Chọn ngày"
                onChange={(value) =>
                  value != undefined
                    ? setSendDate(moment(new Date(value)).format("YYYY-MM-DD"))
                    : setSendDate()
                }
                allowClear={() => {
                  setSendDate();
                  return true;
                }}
              />
            </Form.Item> */}
          </div>
        ) : (
          <></>
        )}
      </Form>
    </>
  );
};

export default PatientInforSearch;
