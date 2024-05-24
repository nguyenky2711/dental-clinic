import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "antd";
import "./style.scss";
const ConfirmModalAntd = ({
  open = false,
  onCancel,
  onOk,
  header = "",
  title = "",
  content = "",
  footer = true,
}) => {
  const handleOk = () => {
    onOk(true);
    onCancel(true);
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel(true);
    }
  };
  return (
    <div className="modal_container">
      <Modal
        // title=
        visible={open}
        // open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal_information"
        footer={
          footer && [
            <Button
              key="ok"
              type="primary"
              className="custom-ok-button"
              onClick={handleOk}
            >
              Hoàn thành
            </Button>,
            <Button
              key="cancel"
              className="custom-cancel-button"
              onClick={handleCancel}
            >
              Hủy
            </Button>,
          ]
        }
      >
        <div className="modal_header">
          <h4>{header != "" && header}</h4>
        </div>
        <div className="modal_title">
          <p>{title != "" && title}</p>
        </div>
        <div className="modal_content">
          <p>{content != "" && content}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmModalAntd;
