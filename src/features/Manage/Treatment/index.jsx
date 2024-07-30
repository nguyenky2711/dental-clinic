import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import "./style.scss";
import TableAntdCustom from "../../../components/TableAntd";
import { useDispatch } from "react-redux";
import { filterTreatmentsThunk } from "../../../redux/action/treatment";

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
  const [treatmentData, setTreatmentData] = useState({});
  const [selectedService, setSelectedService] = useState("all");

  useEffect(() => {
    dispatch(filterTreatmentsThunk(paramsTreatment)).then((res) => {
      setTreatmentData(groupByServiceDTO(res.payload));
    });
  }, [paramsTreatment]);

  const handleSelect = ({ key }) => {
    setSelectedService(key);
  };

  const filteredData =
    selectedService === "all"
      ? treatmentData
      : { [selectedService]: treatmentData[selectedService] };

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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        width={200}
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
            <Menu.Item key={serviceName}>{serviceName}</Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout style={{ marginLeft: 200, padding: "24px" }}>
        <div className="staffPage-header">
          <h1>Danh sách phương thức điều trị</h1>
        </div>
        {filteredData &&
          Object.keys(filteredData).map((key) => {
            return (
              <div key={key}>
                <h2 className="header-treatment" style={{ cursor: "pointer" }}>
                  <p>{key}</p>
                </h2>
                {filteredData[key] && (
                  <TableAntdCustom
                    list={filteredData[key]}
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
    </Layout>
  );
};

export default TreatmentPage;
