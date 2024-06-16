import { Select, Table } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";
import "./style.scss"; // Import file CSS
import { useDispatch } from "react-redux";
import { showForStaffByWeekThunk } from "../../../../redux/action/workingTime";

const PreviousSchedules = () => {
  const dispatch = useDispatch();
  const [selectedWeek, setSelectedWeek] = useState(moment().startOf("isoWeek"));
  const [scheduleData, setScheduleData] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const handleWeekChange = (value) => {
    setSelectedWeek(moment(value, "YYYY-WW").startOf("isoWeek"));
    setDisabled(true);
  };

  useEffect(() => {
    // Giả sử bạn lấy dữ liệu từ API hoặc tạo dữ liệu mới cho tuần được chọn
    const startOfWeek = selectedWeek.startOf("isoWeek");
    const week = startOfWeek.format("WW");
    const year = startOfWeek.format("YYYY");
    dispatch(showForStaffByWeekThunk({ week, year })).then((res) => {
      let newScheduleData = [];
      for (let i = 0; i < 7; i++) {
        const date = startOfWeek.clone().add(i, "days").format("DD/MM/YYYY");
        const tempResult = res?.payload?.filter(
          (item) => moment(item.workingDTO.date).format("DD/MM/YYYY") == date
        );
        let tempObj = {
          date,
          morning: false,
          afternoon: false,
        };
        tempResult.map((item) => {
          if (item.workingDTO.periodId == 1) {
            tempObj.morning = true;
          }
          if (item.workingDTO.periodId == 2) {
            tempObj.afternoon = true;
          }
        });

        newScheduleData[i] = tempObj;
      }
      console.log(newScheduleData);
      setScheduleData(newScheduleData);
    });
  }, [selectedWeek]);

  const renderOptions = () => {
    const options = [];
    let week = moment().startOf("isoWeek");
    while (week.year() === moment().year()) {
      const startOfWeek = week.format("DD/MM/YYYY");
      const endOfWeek = week.clone().add(6, "days").format("DD/MM/YYYY");
      const label = `Tuần ${week.format("WW")} (${startOfWeek} - ${endOfWeek})`;
      options.push(
        <Select.Option
          key={week.format("YYYY-WW")}
          value={week.format("YYYY-WW")}
        >
          {label}
        </Select.Option>
      );
      week = week.subtract(1, "weeks");
    }
    return options;
  };

  const startOfWeek = selectedWeek.startOf("isoWeek");
  const dates = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.clone().add(i, "days").format("DD/MM/YYYY")
  );

  const columns = [
    {
      title: "Ngày/Buổi",
      dataIndex: "type",
      key: "type",
      render: (text) => <strong>{text}</strong>,
    },
    ...dates.map((date) => ({
      title: date,
      dataIndex: date,
      key: date,
      render: (_, record) => {
        // console.log(date);
        // console.log(scheduleData);
        const matchedData = scheduleData.find((item) => item.date === date);
        return (
          <div className="checkbox-cell">
            {matchedData && matchedData[record.key] ? (
              <div className="checkbox-true"></div>
            ) : (
              <div className="checkbox-false"></div>
            )}
          </div>
        );
      },
    })),
  ];

  return (
    <>
      <Select
        defaultValue={selectedWeek.format("YYYY-WW")}
        style={{ width: 250 }}
        onChange={handleWeekChange}
      >
        {renderOptions()}
      </Select>
      <Table
        columns={columns}
        dataSource={[
          { key: "morning", type: "Buổi Sáng" },
          { key: "afternoon", type: "Buổi Chiều" },
        ]}
        pagination={false}
        bordered
        rowKey="key"
      />
    </>
  );
};

export default PreviousSchedules;
