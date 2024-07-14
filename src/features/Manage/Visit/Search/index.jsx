import { Select, Input, Form, DatePicker, Dropdown, Space, Button } from "antd";
import React, { useState, useEffect } from "react";

import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
const VisitInforSearch = ({ handleSubmit, handleChange }) => {
  const { patientId, recordId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {};

  return (
    <>
      <Form
        name="normal_search"
        className="medical_record-searchForm"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item className="medical_record-searchForm-btn">
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
      </Form>
    </>
  );
};

export default VisitInforSearch;
