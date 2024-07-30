import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteVisitByIdThunk,
  getRecordByPatientIdThunk,
  getVisitByRecordIdThunk,
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
import ReusableModal from "../../../components/ReuseModalAntd";
import VisitInforSearch from "./Search";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import { AuthContext } from "../../../provider/AuthContext";
import { toast } from "react-toastify";

const VisitPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientId, recordId } = useParams();
  const [records, setRecords] = useState();
  const { token, role, logout } = useContext(AuthContext);

  const columnsMedicalRecord = [
    {
      title: "Lần khám",
      key: "stt",
      align: "center",
      width: "8%",
      render: (text, record, index) => {
        return index + 1;
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
            toast.error("Xoá lần khám thất bại", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "$color-default", backgroundColor: "#DEF2ED" },
            });
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
  useEffect(() => {
    // dispatch(getRecordByPatientIdThunk(patientId)).then((res) => {
    //   console.log(res);
    //   setRecords(res?.payload);
    // });
    dispatch(getVisitByRecordIdThunk({ recordId: recordId })).then((res) => {
      setRecords(res?.payload);
    });
  }, []);

  const handleTablePageChange = (page, additionalData) => {
    // let temp = sendData;
    // temp.no = page;
    // setCurrentPage(page);
    // setSendData(temp);
    // dispatch(filterUserThunk(temp)).then((res) => {});
  };
  const handleSearchChange = (values) => {};
  const handleSubmitSearch = (values) => {};
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
      <div className="staffinfor-tableWrapper">
        <TableAntdCustom
          list={records ? records : null}
          totalItems={10}
          totalPages={1}
          pageSize={5}
          no={0}
          columns={columnsMedicalRecord}
          onChange={handleTablePageChange}
          className={"staffinfor-table"}
          emptyText="Hiện chưa có lịch sử khám"
        ></TableAntdCustom>
      </div>
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
