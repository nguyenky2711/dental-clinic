import React, { useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecordByPatientIdThunk } from "../../../redux/action/medicalRecord";

function MedicalRecordPage() {
  const dispatch = useDispatch();
  const [records, setRecords] = useState();
  const columnsMedicalRecord = [
    {
      title: "Ngày khám",
      key: "name",
      width: "20%",
      render: (text) => {
        return text.examinationDate;
      },
    },
    {
      title: "Chẩn đoán",
      key: "email",
      width: "55%",
      render: (text) => {
        return text.diagnosis;
      },
    },
    {
      title: "Bác sĩ khám",
      key: "phone",
      align: "center",
      width: "20%",
      render: (text) => {
        return text.staffDTO.name;
      },
    },

    {
      title: "Hành động",
      align: "center",
      width: "10%",
      render: (_, record) => {},
    },
  ];
  const { patientId } = useParams();
  useEffect(() => {
    dispatch(getRecordByPatientIdThunk(patientId)).then((res) => {
      console.log(res);
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
        <h1>Sổ bệnh án</h1>
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
    </div>
  );
}

export default MedicalRecordPage;
