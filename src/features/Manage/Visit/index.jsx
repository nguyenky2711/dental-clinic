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

const downloadPdf = async (visitId) => {
  try {
    const response = await axios({
      url: `http://localhost:8085/api/objective/pdf/${visitId}`,
      method: "GET",
      responseType: "blob", // Quan trọng: nhận về dữ liệu dưới dạng blob
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `DonKham#${visitId}.pdf`; // Tên file muốn tải xuống
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
  const { token, role, logout } = useContext(AuthContext);
  const [total, setTotal] = useState({
    pages: null,
    items: null,
  });
  const [params, setParams] = useState({
    recordId: recordId,
    pageNumber: 1,
    pageSize: 5,
  });

  const columnsMedicalRecord = [
    {
      title: "Lần khám",
      key: "stt",
      align: "center",
      width: "8%",
      render: (text, record, index) => {
        return (params.pageNumber - 1) * params.pageSize + index + 1;
      },
    },
    {
      title: "Ngày khám",
      key: "name",
      width: "10%",
      render: (text) => {
        return moment(new Date(text.examinationDate)).format("DD/MM/YYYY");
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
      align: "center",
      width: "25%",
      render: (text) => {
        return text.note;
      },
    },

    {
      title: "",
      align: "center",
      width: "20%",
      render: (_, record) => {
        return (
          <div className="action">
            <div
              className="action-item"
              onClick={() =>
                role !== "Role_Patient"
                  ? navigate(
                      `/manage/patient/${patientId}/medical-record/${recordId}/visit/${record.id}`
                    )
                  : navigate(`/medical-record/${recordId}/visit/${record.id}`)
              }
            >
              <EditOutlined />
              <p>Xem chi tiết</p>
            </div>
            {role == "Role_Staff" && (
              <div
                className="action-item"
                onClick={() => handleExportPDF(record.id)}
              >
                <FilePdfOutlined />
                <p>Xuất file</p>
              </div>
            )}

            {role !== "Role_Patient" && (
              <div
                className="action-item"
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
  const handleSearchChange = (values) => {};
  const handleSubmitSearch = (values) => {};
  const handleExportPDF = (visitId) => {
    dispatch(exportVisitToPDFThunk({ visitId: visitId })).then((res) =>
      downloadPdf(visitId)
    );
  };

  useEffect(() => {
    dispatch(getVisitByRecordIdThunk(params)).then((res) => {
      const temp = res?.payload;
      if (temp) {
        setRecords(temp.contents);
        setTotal((preVal) => ({
          ...preVal,
          pages: temp.totalPages,
          items: temp.totalItems,
        }));
      }
    });
  }, [params]);

  return (
    <div>
      <div className="staffPage-header">
        <h1>Chi tiết các lần khám</h1>
        {role !== "Role_Patient" && (
          <VisitInforSearch
            handleSearchChange={null}
            handleSubmitSearch={null}
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
