import "./style.scss";
import React from "react";
import { Modal, Button } from "antd";

const ReusableModal = ({ visible, title, content, onOk, onCancel }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="ok" type="primary" onClick={onOk}>
          Đồng ý
        </Button>,
      ]}
    >
      {content}
    </Modal>
  );
};

export default ReusableModal;
