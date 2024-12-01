import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteVisitByIdThunk,
  exportVisitToPDFThunk,
  getVisitByRecordIdThunk,
} from "../../../redux/action/medicalRecord";
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import moment from "moment";
import VisitInforSearch from "./Search";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import { AuthContext } from "../../../provider/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal } from "antd";
import MedicalRecordFormPage from "../MedicalRecord/Create";
import { debounce } from "lodash";
import { findInvoiceByVisitIdThunk } from "../../../redux/action/revenue";

const downloadPdf = async (obj, id, token) => {
  try {
    const response = await axios({
      url:
        obj === "visit"
          ? `http://localhost:8085/api/objective/pdf/${id}`
          : `http://localhost:8085/api/invoice/export-pdf/${id}`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = obj === "visit" ? `DonKham#${id}.pdf` : `HoaDon#${id}.pdf`;
    // Tên file muốn tải xuống
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("There was an error!", error);
  }
};

const VisitPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientId, recordId } = useParams();
  const [records, setRecords] = useState();
  const { token, role, logout, position } = useContext(AuthContext);
  const [total, setTotal] = useState({
    pages: null,
    items: null,
  });
  const [params, setParams] = useState({
    recordId: recordId,
    visitId: null,
    pageNumber: 1,
    pageSize: 5,
  });
  const screenWidth = window.innerWidth;

  const columnsMedicalRecord = [
    ...(screenWidth < 768
      ? [
          {
            title: "Thông tin khám",
            key: "name",
            width: "40%",
            render: (text) => (
              <>
                <p>
                  Ngày khám:
                  <br />
                  {moment(new Date(text.examinationDate)).format("DD/MM/YYYY")}
                </p>
                <p>
                  Chẩn đoán chi tiết:
                  <br /> {text.diagnosis}
                </p>
              </>
            ),
          },
        ]
      : [
          {
            title: "Ngày khám",
            key: "name",
            width: "15%",
            render: (text) => {
              return moment(new Date(text.examinationDate)).format(
                "DD/MM/YYYY"
              );
            },
          },
          {
            title: "Chẩn đoán chi tiết",
            width: "30%",
            render: (text) => {
              return text.diagnosis;
            },
          },
          {
            title: "Ghi chú",
            align: "left",
            width: "22%",
            render: (text) => {
              return text.note;
            },
          },
        ]),

    {
      title: "",
      align: "center",
      width: "20%",
      render: (_, record) => {
        console.log(record);
        return (
          <div className="action">
            <div
              className="action-item"
              style={{ width: "150px" }}
              onClick={() => {
                if (
                  (role === "Role_Staff" && position !== "dentist") ||
                  role === "Role_Patient"
                ) {
                  openProcModal(record.id);
                } else {
                  if (record?.invoice?.id) {
                    openProcModal(record.id);
                  } else {
                    navigate(
                      `/manage/patient/${patientId}/medical-record/${recordId}/visit/${record.id}`
                    );
                  }
                }
              }}
            >
              <EditOutlined />
              <p>Xem chi tiết</p>
            </div>
            <div
              className="action-item"
              style={{ width: "150px" }}
              onClick={() => handleExportPDF("visit", record.id)}
            >
              <FilePdfOutlined />
              <p>Xuất file đơn khám</p>
            </div>
            {record?.invoice?.id && (
              <div
                className="action-item"
                style={{ width: "150px" }}
                onClick={() => handleExportPDF("invoice", record?.invoice?.id)}
              >
                <FilePdfOutlined />
                <p>Xuất file hoá đơn</p>
              </div>
            )}
            {role === "Role_Staff" &&
              position === "dentist" &&
              !record.invoice && (
                <div
                  className="action-item"
                  style={{ width: "150px" }}
                  onClick={() => showModal("delete", record)}
                >
                  <DeleteOutlined />
                  Xoá lần khám
                </div>
              )}
          </div>
        );
      },
    },
  ];

  const [modal, setModal] = useState({
    visible: false,
    title: null,
    content: null,
  });
  const [procModal, setProcModal] = useState({
    open: false,
    visitId: null,
  });

  const openProcModal = (visitId) => {
    setProcModal((preVal) => ({
      ...preVal,
      open: true,
      visitId: visitId,
    }));
  };

  const showModal = (method, val) => {
    setModal((prevVal) => ({
      val,
      visible: true,
      title: "Xoá lịch sử khám",
      content: `Bạn xác nhận xoá lịch sử khám ngày ${moment(
        new Date(val.examinationDate)
      ).format("DD/MM/YYYY")}`,
    }));
  };

  const handleOk = () => {
    // Hàm xử lý khi nhấn "Đồng ý"
  };

  const handleClick = (prop) => {
    if (prop === "ok") {
      console.log("Đã nhấn Đồng ý");
      dispatch(deleteVisitByIdThunk({ visitId: modal?.val?.id })).then(
        (res) => {
          if (res?.payload?.message === "successfully") {
            const newRecords = records.filter(
              (item) => item.id !== modal?.val?.id
            );
            setRecords(newRecords);
            toast.success("Xoá lần khám thành công", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "$color-default", backgroundColor: "#DEF2ED" },
            });
          } else {
            if (
              res?.payload?.response?.data?.errors?.message ===
              "this is not yours"
            ) {
              toast.error("Chỉ bác sĩ có thẩm quyền mới thực hiện được", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "$color-default", backgroundColor: "#DEF2ED" },
              });
            } else if (
              res?.payload?.response?.data?.errors?.message ===
              `can't update record done`
            ) {
              toast.error("Bệnh án đã hoàn thành", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "$color-default", backgroundColor: "#DEF2ED" },
              });
            } else if (
              res?.payload?.response?.data?.errors?.message ===
              `the customer have been paid for the obj`
            ) {
              toast.error("Tiến trình đã được trả tiền", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "$color-default", backgroundColor: "#DEF2ED" },
              });
            } else {
              toast.error("Xoá lần khám thất bại", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "$color-default", backgroundColor: "#DEF2ED" },
              });
            }
          }
        }
      );
    } else {
      console.log("Đã nhấn Hủy");
    }
    setModal((prevVal) => ({
      ...prevVal,
      visible: false,
    }));
    return;
    // Hàm xử lý khi nhấn "Hủy" hoặc nhấn ra ngoài modal
  };
  const handleTablePageChange = (page, additionalData) => {
    if (page) {
      setParams((preVal) => ({
        ...preVal,
        pageNumber: page,
      }));
    }
  };
  const isDeepEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };
  const handleSearchChange = debounce((values) => {
    const { pageNumber, pageSize, recordId, ...restData } = params;
    !isDeepEqual(values, restData) &&
      setParams((preVal) => ({
        ...preVal,
        visitId: values.visitId,
      }));
  }, 300);
  const handleSubmitSearch = debounce((values) => {
    const { pageNumber, pageSize, recordId, ...restData } = params;
    !isDeepEqual(values, restData) &&
      setParams((preVal) => ({
        ...preVal,
        visitId: values.visitId,
      }));
  }, 300);
  const handleExportPDF = (obj, id) => {
    if (obj === "visit") {
      downloadPdf("visit", id, token);
    } else if (obj === "invoice") {
      downloadPdf("invoice", id, token);
    }
  };

  useEffect(() => {
    dispatch(getVisitByRecordIdThunk(params)).then(async (res) => {
      let temp = res?.payload;
      if (temp) {
        // Fetch invoices for all visits
        const updatedContents = await Promise.all(
          temp.contents.map(async (item) => {
            try {
              const invoiceRes = await dispatch(
                findInvoiceByVisitIdThunk({ visitId: item.id })
              );
              const invoice = invoiceRes?.payload?.id
                ? invoiceRes?.payload
                : null;
              return { ...item, invoice };
            } catch (error) {
              return { ...item, invoice: null };
            }
          })
        );

        // Update state with visits and invoices
        setRecords(updatedContents);
        setTotal({
          pages: temp.totalPages,
          items: temp.totalItems,
        });
      }
    });
  }, [params]);

  return (
    <div className="manage-page-container visit">
      <div className="staffPage-header">
        <h1>Chi tiết các lần khám</h1>
        {role === "Role_Staff" && (
          <VisitInforSearch
            handleSearchChange={handleSearchChange}
            handleSubmitSearch={handleSubmitSearch}
          />
        )}
      </div>
      {records && (
        <div className="staffinfor-tableWrapper">
          <TableAntdCustom
            list={records}
            totalItems={total.items}
            totalPages={total.pages}
            pageSize={params.pageSize}
            no={params.pageNumber}
            columns={columnsMedicalRecord}
            onChange={handleTablePageChange}
            className={"staffinfor-table"}
            emptyText="Hiện chưa có lịch sử khám"
          ></TableAntdCustom>
        </div>
      )}
      <Modal
        open={procModal.open}
        onCancel={() => setProcModal((preVal) => ({ ...preVal, open: false }))}
        footer={null} // Hide the default footer
        width={"100vw"}
      >
        <MedicalRecordFormPage visitInfor={procModal.visitId} />
      </Modal>
      <ConfirmModalAntd
        open={modal.visible}
        header={modal.title}
        title={modal.content}
        onOk={() => handleClick("ok")}
        onCancel={() => handleClick("cancel")}
      />
    </div>
  );
};

export default VisitPage;
