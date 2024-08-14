import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteMedicalRecordThunk,
  doneRecordThunk,
  getRecordByPatientIdThunk,
  getRecordByTokenThunk,
  reopenRecordThunk,
} from "../../../redux/action/medicalRecord";
import MedicalRecordInforSearch from "./Search";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Tag } from "antd";
import { toast } from "react-toastify";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import { AuthContext } from "../../../provider/AuthContext";

function MedicalRecordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [total, setTotal] = useState({
    pages: null,
    items: null,
  });
  const [params, setParams] = useState({
    patientId: patientId,
    pageNumber: 1,
    pageSize: 5,
  });
  const [records, setRecords] = useState();
  const { token, role, logout, position, email } = useContext(AuthContext);

  const columnsMedicalRecord = [
    {
      title: "Ngày khám",
      key: "name",
      width: "10%",
      render: (text) => {
        return moment(new Date(text.examinationDate)).format("DD/MM/YYYY");
      },
    },
    {
      title: "Chẩn đoán sơ bộ",
      key: "email",
      width: "40%",
      render: (text) => {
        return text.diagnosis;
      },
    },
    {
      title: "Bác sĩ khám",
      key: "phone",
      align: "center",
      width: "15%",
      render: (text) => {
        return text.staffDTO.name;
      },
    },
    {
      title: "Trạng thái",
      key: "phone",
      width: "15%",
      align: "center",
      render: (text) => {
        return text.status !== "Ongoing" ? (
          <Tag color="#25A71C">Đã hoàn thành</Tag>
        ) : (
          <Tag color="#F3BD50">Đang chữa trị</Tag>
        );
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
                      `/manage/patient/${patientId}/medical-record/${record.id}/visit`
                    )
                  : navigate(`/medical-record/${record.id}/visit`)
              }
            >
              <EditOutlined />
              <p>Xem chi tiết</p>
            </div>
            {role === "Role_Staff" && position === "dentist" && (
              <>
                {record.status === "Ongoing" ? (
                  <div
                    className="action-item"
                    onClick={() => showModal("put", record)}
                  >
                    <CheckOutlined />
                    Hoàn thành
                  </div>
                ) : (
                  <div
                    className="action-item"
                    onClick={() => showModal("put", record)}
                  >
                    <RedoOutlined />
                    Mở lại
                  </div>
                )}
                <div
                  className="action-item"
                  onClick={() => showModal("delete", record)}
                >
                  <DeleteOutlined />
                  Xoá bệnh án
                </div>
              </>
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
    method: null,
    data: null,
  });

  const showModal = (method, val) => {
    console.log(val);

    setModal((prevVal) => ({
      ...prevVal,
      visible: true,
      data: val,
      title:
        method === "put"
          ? val?.status === "Ongoing"
            ? "Hoàn thành bệnh án"
            : "Mở lại bệnh án"
          : "Xoá bệnh án",
      content:
        method === "put"
          ? val?.status === "Ongoing"
            ? "Xác nhận hoàn thành bệnh án ?"
            : "Xác nhận mở lại bệnh án"
          : "Xác nhận xoá bệnh án",
      method: method,
    }));
  };

  const handleOk = () => {
    if (modal.method === "delete") {
      dispatch(deleteMedicalRecordThunk({ recordId: modal.data.id }))
        .then((res) => {
          if (res?.payload?.message === "successfully") {
            toast.success("Xoá bệnh án thành công", {
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
            } else {
              toast.error("Xoá bệnh án thất bại", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "$color-default", backgroundColor: "#DEF2ED" },
              });
            }
          }
        })
        .finally(() => {
          setModal((prevVal) => ({
            ...prevVal,
            visible: false,
            method: null,
            data: null,
          }));
        });
    } else if (modal.method === "put") {
      dispatch(
        modal.data.status === "Ongoing"
          ? doneRecordThunk({ recordId: modal.data.id })
          : reopenRecordThunk({ recordId: modal.data.id })
      )
        .then((res) => {
          console.log(res);
          if (res?.payload?.message === "successfully") {
            toast.success(
              modal.data.status === "Ongoing"
                ? "Kết thúc bệnh án thành công"
                : "Mở lại bệnh án thành công",
              {
                position: "top-right",
                autoClose: 3000,
                style: { color: "$color-default", backgroundColor: "#DEF2ED" },
              }
            );
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
            } else {
              toast.error(
                modal.data.status === "Ongoing"
                  ? "Kết thúc bệnh án thất bại"
                  : "Mở lại bệnh án thất bại",
                {
                  position: "top-right",
                  autoClose: 3000,
                  style: {
                    color: "$color-default",
                    backgroundColor: "#DEF2ED",
                  },
                }
              );
            }
          }
        })
        .finally(() => {
          setModal((prevVal) => ({
            ...prevVal,
            visible: false,
            method: null,
            data: null,
          }));
        });
    }
  };

  const handleCancel = () => {
    // Hàm xử lý khi nhấn "Hủy" hoặc nhấn ra ngoài modal
    console.log("Đã nhấn Hủy");
    setModal((prevVal) => ({
      ...prevVal,
      visible: false,
      data: null,
      method: null,
    }));
  };
  useEffect(() => {
    role === "Role_Patient"
      ? dispatch(getRecordByTokenThunk()).then((res) => {
          const temp = res?.payload;
          if (temp) {
            setRecords(temp.contents);
            setTotal((preVal) => ({
              ...preVal,
              pages: temp.totalPages,
              items: temp.totalItems,
            }));
          }
          const doctorDTOString = JSON.stringify(
            temp?.contents?.[temp?.contents?.length - 1]?.staffDTO
          );
          sessionStorage.setItem("doctorDTO", doctorDTOString);
        })
      : dispatch(getRecordByPatientIdThunk(params)).then((res) => {
          if (
            res?.payload?.response?.data?.errors?.message ===
            "You are not allowed to view someone else's medical records"
          ) {
            toast.error("Bạn chỉ xem được bệnh án của bản thân", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "$color-default", backgroundColor: "#DEF2ED" },
            });
          } else {
            const temp = res?.payload;
            if (temp) {
              setRecords(temp.contents);
              setTotal((preVal) => ({
                ...preVal,
                pages: temp.totalPages,
                items: temp.totalItems,
              }));
            }
          }
        });
  }, [modal]);
  useEffect(() => {
    if (role === "Role_Patient") {
      if (!email) {
        navigate("/active/mail");
      }
    }
  }, [email]);

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
  return (
    <div>
      <div className="staffPage-header">
        <h1>Sổ bệnh án</h1>
        {role !== "Role_Patient" && (
          <MedicalRecordInforSearch
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
        onOk={handleOk}
        onCancel={handleCancel}
      />
      {/* <ReusableModal
        visible={modal.visible}
        title={modal.title}
        content={modal.content}
        onOk={handleOk}
        onCancel={handleCancel}
      /> */}
    </div>
  );
}

export default MedicalRecordPage;
