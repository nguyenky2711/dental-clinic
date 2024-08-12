import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Layout, Menu, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import { useDispatch } from "react-redux";
import {
  createServiceMedicalThunk,
  deleteServiceMedicalThunk,
  deleteTreatmentThunk,
  filterTreatmentsThunk,
  updateServiceMedicalThunk,
} from "../../../redux/action/treatment";
import TreatmentFormPage from "./Form";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import { AuthContext } from "../../../provider/AuthContext";
import { toast } from "react-toastify";

const groupByServiceDTO = (items) => {
  return items.reduce((result, item) => {
    const serviceName = item.serviceDTO.name;
    const serviceId = item.serviceDTO.id;

    if (!result[serviceName]) {
      result[serviceName] = {
        id: serviceId,
        items: [],
      };
    }

    result[serviceName].items.push(item);
    return result;
  }, {});
};

const TreatmentPage = () => {
  const dispatch = useDispatch();
  const { token, role, logout } = useContext(AuthContext);

  const [paramsTreatment, setParamsTreatment] = useState({
    keyword: null,
    serviceId: null,
    sortOrder: null,
  });
  const [treatmentData, setTreatmentData] = useState({});
  const [selectedService, setSelectedService] = useState("all");
  const [selectedTreatment, setSelectedTreatment] = useState();
  const [openFormPage, setOpenFormPage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState({
    service: false,
    treatment: false,
  });
  const [deleteModalParams, setDeleteModalParams] = useState({
    open: false,
    title: null,
    content: null,
    data: null,
    for: null,
  });
  const [modalTreatmentParams, setModalTreatmentParams] = useState({
    open: false,
    action: null,
  });
  const [currentService, setCurrentService] = useState({
    serviceName: null,
    details: null,
  });
  const [editValue, setEditValue] = useState("");
  const filteredData =
    selectedService === "all"
      ? treatmentData
      : treatmentData[selectedService]
      ? {
          [selectedService]: {
            id: treatmentData[selectedService].id,
            items: treatmentData[selectedService].items,
          },
        }
      : {}; // Fallback in case selectedService is not in treatmentData

  const columnsTreament = [
    {
      title: "Tên phương thức",
      key: "name",
      width: "20%",
      render: (text) => {
        return text.name;
      },
    },
    {
      title: "Giá tiền",
      align: "center",
      width: "15%",
      render: (text) => {
        return text.cost.toLocaleString() + "VND/ " + text.unit;
      },
    },
    {
      title: "Ghi chú",
      align: "center",
      width: "12%",
      render: (text) => {
        return text.note;
      },
    },
  ];

  // Conditionally add the action column if the user is an admin
  if (role === "Role_Admin") {
    columnsTreament.push({
      title: "",
      align: "center",
      width: "15%",
      render: (_, record) => {
        return (
          <div className="action">
            <div
              className="action-item"
              onClick={() => {
                setSelectedTreatment(record);
                // setOpenFormPage(true);
                setModalTreatmentParams((preVal) => ({
                  ...preVal,
                  open: true,
                  action: "edit",
                }));
              }}
            >
              <EditOutlined />
              <p>Xem chi tiết</p>
            </div>
            <div
              className="action-item"
              onClick={() => showDeleteModal("treatment", record)}
            >
              <DeleteOutlined />
              Xoá
            </div>
          </div>
        );
      },
    });
  }

  useEffect(() => {
    dispatch(filterTreatmentsThunk(paramsTreatment)).then((res) => {
      setTreatmentData(groupByServiceDTO(res.payload));
    });
  }, [paramsTreatment, dispatch]);

  const showServiceModal = (serviceName, data) => {
    serviceName ? setEditValue(serviceName) : setEditValue("");
    setIsModalVisible((prevVal) => ({
      ...prevVal,
      service: true,
    }));
  };
  const handleOk = () => {
    if (selectedService !== "add") {
      const sendData = {
        name: editValue,
        serviceId: treatmentData[currentService.serviceName].id,
      };
      dispatch(updateServiceMedicalThunk(sendData)).then((res) => {
        if (res?.payload?.message === "successfully") {
          toast.success("Cập nhật phương thức điều trị thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#D7F1FD" },
          });
          setTreatmentData((prevData) => {
            const { [currentService.serviceName]: oldData, ...rest } = prevData;
            return {
              ...rest,
              [editValue]: {
                id: oldData.id,
                items: oldData.items,
              },
            };
          });
          setCurrentService({
            serviceName: null,
            details: null,
          });
        } else {
          toast.error("Cập nhật phương thức điều trị thất bại!", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "red", backgroundColor: "#DEF2ED" },
          });
        }
      });
    } else {
      const sendData = { name: editValue };
      dispatch(createServiceMedicalThunk(sendData)).then((res) => {
        if (res?.payload?.message === "successfully") {
          toast.success("Tạo mới dịch vụ thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#D7F1FD" },
          });
          setTreatmentData((prevData) => {
            return {
              ...prevData,
              [editValue]: {
                id: res?.payload?.id,
                items: [],
              },
            };
          });
        } else {
          toast.error("Tạo mới dịch vụ thất bại!", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "red", backgroundColor: "#DEF2ED" },
          });
        }
      });
    }
    setSelectedService("all");
    setIsModalVisible((prevVal) => ({
      ...prevVal,
      service: false,
    }));
  };
  const handleCancel = () => {
    setEditValue("");
    setIsModalVisible(false);
  };
  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };
  const handleForm = (e) => {
    if (e == "cancle") {
      setSelectedTreatment();
      setModalTreatmentParams((preVal) => ({
        ...preVal,
        open: false,
        action: null,
      }));
      dispatch(filterTreatmentsThunk(paramsTreatment)).then((res) => {
        setTreatmentData(groupByServiceDTO(res.payload));
      });
    }
  };

  const handleSelect = ({ key }) => {
    setSelectedService(key);
    setCurrentService({
      serviceName: key,
      details: treatmentData[key],
    });
  };
  const showDeleteModal = (name, data) => {
    if (name === "treatment") {
      setDeleteModalParams((preVal) => ({
        ...preVal,
        open: true,
        title: "Xoá phương thức ",
        content: "Bạn xác nhận xoá phương thức này ?",
        data: data,
        for: name,
      }));
    } else if (name === "service") {
      setDeleteModalParams((preVal) => ({
        ...preVal,
        open: true,
        title: "Xoá dịch vụ ",
        content: "Bạn xác nhận xoá dịch vụ này ?",
        data: data,
        for: name,
      }));
    }
  };
  const handleDeleteModalCancel = () => {
    setDeleteModalParams((preVal) => ({
      ...preVal,
      open: false,
      title: null,
      content: null,
      data: null,
      for: null,
    }));
  };
  const handleOkDeleteModal = (data) => {
    if (deleteModalParams.for === "treatment") {
      const treatmentId = deleteModalParams?.data?.id;
      dispatch(deleteTreatmentThunk({ treatmentId: treatmentId })).then(
        (res) => {
          if (res?.payload?.message === "successfully") {
            toast.success("Xoá phương thức điều trị thành công", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "green", backgroundColor: "#D7F1FD" },
            });
            setTreatmentData((prevData) => {
              const { [currentService.serviceName]: oldData, ...rest } =
                prevData;
              return {
                ...rest,
                [currentService.serviceName]: {
                  id: oldData.id,
                  items: oldData.items.filter((item) => item.id != treatmentId),
                },
              };
            });
          } else {
            if (
              res?.payload?.response?.data?.errors?.message ===
              "treatment has been used"
            ) {
              toast.error("Phương thức điều trị đang được sử dụng", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "$color-default", backgroundColor: "#DEF2ED" },
              });
            } else {
              toast.error("Xoá phương thức điều trị thất bại!", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "red", backgroundColor: "#DEF2ED" },
              });
            }
          }
        }
      );
    } else if (deleteModalParams.for === "service") {
      const serviceId = deleteModalParams?.data?.details?.id;
      dispatch(deleteServiceMedicalThunk({ serviceId: serviceId })).then(
        (res) => {
          if (res?.payload?.message === "successfully") {
            toast.success("Xoá dịch vụ thành công", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "green", backgroundColor: "#D7F1FD" },
            });
            setTreatmentData((prevData) => {
              const newTreatmentData = { ...prevData };
              delete newTreatmentData[currentService.serviceName];
              return newTreatmentData;
            });
            setSelectedService("all");
          } else {
            if (
              res?.payload?.response?.data?.errors?.message ===
              "service has been used"
            ) {
              toast.error("Vui lòng xoá các phương thức trước", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "$color-default", backgroundColor: "#DEF2ED" },
              });
            } else {
              toast.error("Xoá dịch vụ thất bại!", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "red", backgroundColor: "#DEF2ED" },
              });
            }
          }
        }
      );
    }
    setDeleteModalParams((preVal) => ({
      ...preVal,
      open: false,
      title: null,
      content: null,
      for: null,
      data: null,
    }));
  };

  const handleTreatmentModalCancel = () => {
    setSelectedTreatment();
    setModalTreatmentParams((preVal) => ({
      ...preVal,
      open: false,
      action: null,
    }));
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
          defaultSelectedKeys={["all"]}
          onClick={handleSelect}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="all">Tất cả</Menu.Item>
          {Object.keys(treatmentData).map((serviceName) => (
            <Menu.Item key={serviceName}>
              {serviceName}
              {role === "Role_Admin" && (
                <>
                  <EditOutlined
                    className="menu-icon-right-upd"
                    onClick={() =>
                      showServiceModal(
                        serviceName,
                        treatmentData[selectedService]
                      )
                    }
                  />
                  <DeleteOutlined
                    className="menu-icon-right-del"
                    onClick={() => showDeleteModal("service", currentService)}
                  />
                </>
              )}
            </Menu.Item>
          ))}
          {role === "Role_Admin" && (
            <Menu.Item
              key="add"
              style={{ marginTop: "auto" }}
              onClick={() => {
                showServiceModal();
              }}
            >
              <PlusOutlined className="menu-icon-left" />
              Thêm mới
            </Menu.Item>
          )}
        </Menu>
        <Modal
          title={editValue ? "Chinh sửa tên dịch vụ" : "Thêm mới dịch vụ"}
          open={isModalVisible.service}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Huỷ
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              {editValue ? "Lưu" : "Thêm"}
            </Button>,
          ]}
        >
          <Input
            value={editValue}
            onChange={handleInputChange}
            placeholder="Tên dịch vụ"
          />
        </Modal>
      </Layout.Sider>
      {openFormPage ? (
        <TreatmentFormPage
          style={{ marginLeft: 300, padding: "24px" }}
          propsData={{ selectedTreatment, currentService }}
          action={handleForm}
        ></TreatmentFormPage>
      ) : (
        <Layout style={{ marginLeft: 300, padding: "24px" }}>
          <div className="staffPage-header">
            <h1>
              Danh sách phương thức điều trị{" "}
              {/* <PlusSquareOutlined onClick={() => setOpenFormPage(true)} /> */}
              {role === "Role_Admin" && (
                <PlusSquareOutlined
                  onClick={() =>
                    setModalTreatmentParams((preVal) => ({
                      ...preVal,
                      open: true,
                      action: "add",
                    }))
                  }
                />
              )}
            </h1>
          </div>
          {filteredData &&
            Object.keys(filteredData).map((key) => {
              return (
                <div key={key}>
                  <h2
                    className="header-treatment"
                    style={{ cursor: "pointer" }}
                  >
                    <p>{key}</p>
                  </h2>
                  {filteredData[key] && (
                    <TableAntdCustom
                      list={filteredData[key].items}
                      pagination={false}
                      columns={columnsTreament}
                      className={"staffinfor-table"}
                      emptyText="Hiện chưa có phương thức điều trị nào"
                    ></TableAntdCustom>
                  )}
                </div>
              );
            })}
        </Layout>
      )}
      <Modal
        open={modalTreatmentParams.open}
        onCancel={handleTreatmentModalCancel}
        footer={null} // Hide the default footer
        width={600}
      >
        <TreatmentFormPage
          style={{ padding: "24px" }}
          propsData={{ selectedTreatment, currentService }}
          action={handleForm}
        />
      </Modal>
      <ConfirmModalAntd
        open={deleteModalParams.open}
        onCancel={handleDeleteModalCancel}
        onOk={() => handleOkDeleteModal()}
        header={deleteModalParams.title}
        title={deleteModalParams.content}
      ></ConfirmModalAntd>
    </Layout>
  );
};

export default TreatmentPage;
