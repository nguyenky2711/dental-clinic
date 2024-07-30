import React from "react";
import { Button, Modal } from "antd";
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
  // Hàm xử lý khi nhấn nút "Hoàn thành"
  const handleOk = () => {
    if (onOk) {
      onOk(); // Gọi hàm onOk
    }
  };

  // Hàm xử lý khi nhấn nút "Hủy" hoặc khi đóng modal ra ngoài
  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Gọi hàm onCancel
    }
  };

  return (
    <div className="modal_container">
      <Modal
        visible={open}
        open={open}
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
          <h4>{header}</h4>
        </div>
        <div className="modal_title">
          <p>{title}</p>
        </div>
        <div className="modal_content">
          <p>{content}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmModalAntd;
