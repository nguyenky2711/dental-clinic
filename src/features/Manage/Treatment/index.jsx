import React, { useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import TreatmentInforSearch from "./Search";
import { useDispatch } from "react-redux";
import {
  filterTreatmentsThunk,
  getServicesMedicalThunk,
} from "../../../redux/action/treatment";

const groupByServiceDTO = (items) => {
  return items.reduce((result, item) => {
    const serviceName = item.serviceDTO.name;
    if (!result[serviceName]) {
      result[serviceName] = [];
    }
    result[serviceName].push(item);
    return result;
  }, {});
};

const TreatmentPage = () => {
  const dispatch = useDispatch();
  const [paramsTreatment, setParamsTreatment] = useState({
    keyword: null,
    serviceId: null,
    sortOrder: null,
  });
  const [treatmentData, setTreatmentData] = useState();
  const [openGroups, setOpenGroups] = useState({});

  const handleToggle = (key) => {
    setOpenGroups((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  useEffect(() => {
    dispatch(filterTreatmentsThunk(paramsTreatment)).then((res) =>
      setTreatmentData(groupByServiceDTO(res.payload))
    );
  }, [paramsTreatment]);
  const handleTablePageChange = (page, additionalData) => {};
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
        return text.cost.toLocaleString() + "VND";
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
  return (
    <div>
      <div className="staffPage-header">
        <h1>Danh sách phương thức điều trị</h1>
      </div>
      {treatmentData &&
        Object.keys(treatmentData).map((key) => {
          return (
            <div key={key}>
              <h2
                className="header-treatment"
                onClick={() => handleToggle(key)}
                style={{ cursor: "pointer" }}
              >
                <p>{key}</p>
              </h2>
              {openGroups[key] && (
                <TableAntdCustom
                  list={treatmentData[key]}
                  pagination={false}
                  columns={columnsTreament}
                  onChange={handleTablePageChange}
                  className={"staffinfor-table"}
                  emptyText="Hiện chưa có phương thức điều trị nào"
                ></TableAntdCustom>
              )}
            </div>
          );
        })}
      <div className="staffinfor-tableWrapper"></div>
    </div>
  );
};

export default TreatmentPage;
