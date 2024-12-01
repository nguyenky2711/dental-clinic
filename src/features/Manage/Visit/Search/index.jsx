import { Select, Input, Form, DatePicker, Dropdown, Space, Button } from "antd";
import React, { useState, useEffect, useContext } from "react";

import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthContext";
import { SearchOutlined } from "@ant-design/icons";
const VisitInforSearch = ({ handleSubmitSearch, handleSearchChange }) => {
  const { token, role, logout, position } = useContext(AuthContext);

  const { patientId, recordId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [sendData, setSendData] = useState({
    visitId: null,
  });
  const onFinish = (values) => {
    handleSubmitSearch(values);
  };
  useEffect(() => {
    handleSearchChange(sendData);
  }, [sendData]);

  return (
    <>
      <Form
        name="normal_search"
        className="search-form visit"
        onFinish={onFinish}
        form={form}
      >
        <div className="keyWord_search-container">
          <Form.Item name="visitId" className="search-form-input">
            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="Tìm kiếm mã khám"
              onChange={(e) =>
                setSendData((preVal) => ({
                  ...preVal,
                  visitId:
                    e.target.value.trim() != "" ? e.target.value.trim() : null,
                }))
              }
            />
          </Form.Item>

          <Form.Item className="search-form-btn submit-btn">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
          {role === "Role_Staff" && position === "dentist" && (
            <Form.Item className="employee-searchForm-btn">
              <Button
                type="primary"
                htmlType="button"
                onClick={() =>
                  navigate(
                    `/manage/patient/${patientId}/medical-record/${recordId}/visit/create`
                  )
                }
              >
                Thêm lần khám
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>
    </>
  );
};

export default VisitInforSearch;
