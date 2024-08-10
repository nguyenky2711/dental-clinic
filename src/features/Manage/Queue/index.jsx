import React, { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import DoctorQueuePage from "./Doctor";
import ReceptionistQueuePage from "./Receptionist";
import { Layout, Menu } from "antd";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import { PlusSquareOutlined } from "@ant-design/icons";
import PaymentPage from "./Payment";

const QueuePage = () => {
  const { position, role } = useContext(AuthContext);
  const [selectActive, setSelectActive] = useState("Hàng chờ");

  const handleSelect = ({ key }) => {
    setSelectActive(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        width={300}
        className="site-layout-background"
        style={{ height: "100vh", position: "fixed", overflow: "auto" }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["Hàng chờ"]}
          onClick={handleSelect}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="Hàng chờ" style={{ marginTop: "auto" }}>
            Hàng chờ
          </Menu.Item>
          {position === "receptionist" && (
            <Menu.Item key="Thanh toán" style={{ marginTop: "auto" }}>
              Thanh toán
            </Menu.Item>
          )}
        </Menu>
      </Layout.Sider>
      <Layout style={{ marginLeft: 300, padding: "24px" }}>
        <div className="staffPage-header">
          {/* <h1>
            Danh sách phương thức điều trị{" "}
            <PlusSquareOutlined onClick={() => null} />
          </h1> */}
        </div>
        {selectActive === "Hàng chờ" ? (
          position !== "receptionist" ? (
            <DoctorQueuePage />
          ) : (
            <ReceptionistQueuePage />
          )
        ) : (
          position === "receptionist" && <PaymentPage />
        )}
      </Layout>
      {/* <ConfirmModalAntd
        open={deleteModalParams.open}
        onCancel={handleDeleteModalCancel}
        onOk={() => handleOkDeleteModal()}
        header={deleteModalParams.title}
        title={deleteModalParams.content}
      ></ConfirmModalAntd> */}
    </Layout>
  );
};

export default QueuePage;
