import React, { useEffect, useState } from "react";
import moment from "moment";
import { Table } from "antd";
import "./style.scss";
import { useDispatch } from "react-redux";
import {
  createWorkingTimeThunk,
  deleteWorkingTimeThunk,
  showForStaffByWeekThunk,
} from "../../../../redux/action/workingTime";

const ScheduleTable = () => {
  const dispatch = useDispatch();
  let week = moment().add(1, "weeks").startOf("isoWeek").format("WW");
  let year = moment().subtract(1, "weeks").startOf("isoWeek").format("YYYY");
  const [selectedWeek, setSelectedWeek] = useState(
    moment().add(1, "weeks").startOf("isoWeek")
  );
  const [checkedStates, setCheckedStates] = useState({
    morning: Array(7).fill(false),
    afternoon: Array(7).fill(false),
  });

  const startOfWeek = selectedWeek.startOf("isoWeek");
  const [dates, setDates] = useState(
    Array.from({ length: 7 }, (_, i) =>
      startOfWeek.clone().add(i, "days").format("DD/MM/YYYY")
    )
  );

  const handleCheckboxChange = (type, index, date) => {
    const newCheckedStates = { ...checkedStates };
    newCheckedStates[type][index] = !newCheckedStates[type][index];
    setCheckedStates(newCheckedStates);

    // Log thông tin ra console
    console.log({
      date,
      type,
      checked: newCheckedStates[type][index],
    });
    if (newCheckedStates[type][index]) {
      const workingCalendar = {
        "working calendar": [
          {
            periodId: type == "morning" ? 1 : 2,
            date: moment(date, "DD/MM/YYYY").format("YYYY-MM-DD"),
          },
        ],
      };
      dispatch(createWorkingTimeThunk(workingCalendar)).then((res) => {});
    } else {
      const workingCalendar = {
        periodId: type == "morning" ? 1 : 2,
        date: moment(date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      };
      dispatch(deleteWorkingTimeThunk(workingCalendar)).then((res) => {
        console.log(res);
      });
    }
  };

  const renderCell = (type, index) => (
    <div
      className={`schedule-cell ${
        checkedStates[type][index] ? "selected" : ""
      }`}
      onClick={() => handleCheckboxChange(type, index, dates[index])}
    ></div>
  );

  const columns = [
    {
      title: " ",
      dataIndex: "type",
      key: "type",
      render: (text) => <strong>{text}</strong>,
    },
    ...dates.map((date, index) => ({
      title: date,
      dataIndex: date,
      key: date,
      render: (_, __, rowIndex) => {
        if (rowIndex === 0) {
          return renderCell("morning", index);
        }
        if (rowIndex === 1) {
          return renderCell("afternoon", index);
        }
        return null;
      },
    })),
  ];

  const data = [
    { key: "morning", type: "Buổi Sáng" },
    { key: "afternoon", type: "Buổi Chiều" },
  ];

  useEffect(() => {
    dispatch(showForStaffByWeekThunk({ year, week })).then((res) => {
      const newCheckedStates = {
        morning: Array(7).fill(false),
        afternoon: Array(7).fill(false),
      };
      res?.payload?.map((item) => {
        const findDate = moment(item?.date, "YYYY-MM-DD").format("DD/MM/YYYY");
        const index = dates?.indexOf(findDate);
        if (item.periodId == 1) {
          newCheckedStates.morning[index] = true;
        }
        if (item.periodId == 2) {
          newCheckedStates.afternoon[index] = true;
        }
      });

      setCheckedStates(newCheckedStates);
    });
  }, [dates]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        rowKey="key"
      />
    </>
  );
};

export default ScheduleTable;
