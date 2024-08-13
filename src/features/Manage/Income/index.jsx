import React, { useState } from "react";
import { Select, DatePicker, Button } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  getRevenueByMonthThunk,
  getRevenueByWeekThunk,
} from "../../../redux/action/revenue";

const { Option } = Select;
//For month
const getWeeksInMonth = (year, month) => {
  const weeks = [];
  const startOfMonth = moment()
    .year(year)
    .month(month - 1)
    .startOf("month");
  const endOfMonth = moment()
    .year(year)
    .month(month - 1)
    .endOf("month");

  let current = startOfMonth.clone().startOf("isoWeek");
  const end = endOfMonth.clone().endOf("isoWeek");

  while (current <= end) {
    if (
      current.isSameOrAfter(startOfMonth) &&
      current.isSameOrBefore(endOfMonth)
    ) {
      weeks.push({
        week: current.isoWeek(),
        start: current.format("YYYY-MM-DD"),
        end: current.clone().endOf("isoWeek").format("YYYY-MM-DD"),
      });
    }
    current.add(1, "week");
  }

  return weeks;
};

const addMissingWeeks = (currentData, weeks) => {
  const updatedData = [];
  const existingWeeks = new Set(currentData.map((item) => item.week));

  // Add missing weeks
  weeks.forEach((week) => {
    if (!existingWeeks.has(week.week)) {
      updatedData.push({
        totalAmountRemaining: 0,
        totalRevenue: 0,
        week: week.week,
        startDate: week.start,
        endDate: week.end,
      });
    }
  });

  // Add existing weeks, ensuring each has a start date
  currentData.forEach((item) => {
    const weekData = weeks.find((w) => w.week === item.week);
    if (weekData) {
      updatedData.push({
        ...item,
        startDate: weekData.start,
        endDate: weekData.end,
      });
    }
  });

  // Sort data by week
  updatedData.sort((a, b) => a.week - b.week);
  return updatedData;
};

const extendWithBoundaryDates = (data) => {
  let extendedData = [...data];
  if (data.length > 0) {
    extendedData = [
      {
        startDate: data[0].startDate,
        totalRevenue: 0,
        totalAmountRemaining: 0,
      },
      {
        startDate: data[1].startDate,
        totalRevenue: data[0].totalRevenue,
        totalAmountRemaining: data[0].totalAmountRemaining,
      },
      {
        startDate: data[2].startDate,
        totalRevenue: data[1].totalRevenue,
        totalAmountRemaining: data[1].totalAmountRemaining,
      },
      {
        startDate: data[3].startDate,
        totalRevenue: data[2].totalRevenue,
        totalAmountRemaining: data[2].totalAmountRemaining,
      },
      {
        startDate: data[3].endDate,
        totalRevenue: data[3].totalRevenue,
        totalAmountRemaining: data[3].totalAmountRemaining,
      },
    ];
  }

  return extendedData;
};

//For week
const getWeeksInYear = () => {
  const weeks = [];
  const now = moment();
  const startOfYear = moment().startOf("year");
  const endOfYear = moment().endOf("year");

  let current = startOfYear.clone().startOf("isoWeek");

  while (current.isBefore(endOfYear)) {
    const endOfWeek = current.clone().endOf("isoWeek");

    if (endOfWeek.isBefore(now) || endOfWeek.isSame(now, "week")) {
      weeks.push({
        week: current.isoWeek(),
        start: current.format("YYYY-MM-DD"),
        end: endOfWeek.format("YYYY-MM-DD"),
      });
    }

    current.add(1, "week");
  }

  weeks.sort((a, b) => b.week - a.week);
  return weeks;
};
const getWeekStartAndEndDates = (weekNumber, year) => {
  // Use isoWeek for consistency with getWeeksInYear
  const startDate = moment()
    .year(year)
    .isoWeek(weekNumber)
    .startOf("isoWeek")
    .format("YYYY-MM-DD");
  const endDate = moment()
    .year(year)
    .isoWeek(weekNumber)
    .endOf("isoWeek")
    .format("YYYY-MM-DD");
  return { startDate, endDate };
};
const generateWeekDays = (startDate, endDate) => {
  const days = [];
  let currentDate = moment(startDate);

  while (currentDate <= moment(endDate)) {
    days.push({
      date: currentDate.format("YYYY-MM-DD"),
      totalAmountRemaining: 0,
      totalRevenue: 0,
    });
    currentDate.add(1, "day");
  }

  return days;
};
const addDataFromAPI = (weeks, dataAPI) => {
  // Create a map for quick lookup of dataAPI values by date
  const dataMap = dataAPI.reduce((map, item) => {
    map[item.date] = item; // Use date as the key
    return map;
  }, {});

  // Iterate over weeks and update with values from dataAPI if available
  const updatedWeeks = weeks.map((week) => {
    // Check if there's data for the current week's start date in dataAPI
    const data = dataMap[week.date];
    return {
      ...week,
      totalAmountRemaining: data
        ? data.totalAmountRemaining
        : week.totalAmountRemaining,
      totalRevenue: data ? data.totalRevenue : week.totalRevenue,
    };
  });

  return updatedWeeks;
};

// const CustomTooltip = ({ payload, label }) => {
//   if (payload && payload.length) {
//     const { totalRevenue, totalAmountRemaining, startDate } =
//       payload[0].payload;
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`Ngày kết thúc: ${moment(startDate)
//           .subtract(1, "days")
//           .format("DD-MM-YYYY")}`}</p>

//         <p className="label">{`Ngày bắt đầu: ${moment(startDate).format(
//           "DD-MM-YYYY"
//         )}`}</p>
//         <p className="intro">{`Doanh thu: ${totalRevenue.toLocaleString(
//           "vi-VN",
//           { style: "currency", currency: "VND" }
//         )}`}</p>
//         <p className="intro">{`Số tiền còn lại: ${totalAmountRemaining.toLocaleString(
//           "vi-VN",
//           { style: "currency", currency: "VND" }
//         )}`}</p>
//       </div>
//     );
//   }

//   return null;
// };

// const CustomTooltip = ({ payload, label }) => {
//   if (payload && payload.length) {
//     const { totalRevenue, totalAmountRemaining, startDate } =
//       payload[0].payload;

//     // Formatting dates and currency
//     const formattedStartDate = moment(startDate).format("DD-MM-YYYY");
//     const formattedEndDate = moment(startDate)
//       .subtract(1, "days")
//       .format("DD-MM-YYYY");

//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`Ngày kết thúc: ${formattedEndDate}`}</p>
//         <p className="label">{`Ngày bắt đầu: ${formattedStartDate}`}</p>
//         <p className="intro">{`Doanh thu: ${totalRevenue.toLocaleString(
//           "vi-VN",
//           { style: "currency", currency: "VND" }
//         )}`}</p>
//         <p className="intro">{`Số tiền còn lại: ${totalAmountRemaining.toLocaleString(
//           "vi-VN",
//           { style: "currency", currency: "VND" }
//         )}`}</p>
//       </div>
//     );
//   }

//   return null;
// };
const IncomePage = () => {
  const dispatch = useDispatch();
  const [timeFrame, setTimeFrame] = useState("month");
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(moment().startOf("month"));
  const [filteredData, setFilteredData] = useState([]);

  const currentYear = new Date().getFullYear();

  const showRevenueResult = () => {
    if (timeFrame === "week" && selectedWeek) {
      const weekStartEnd = getWeekStartAndEndDates(
        JSON.parse(selectedWeek).week,
        currentYear
      );
      const weeks = generateWeekDays(
        weekStartEnd.startDate,
        weekStartEnd.endDate
      );

      dispatch(
        getRevenueByWeekThunk({
          week: JSON.parse(selectedWeek).week,
          year: currentYear,
        })
      ).then((res) => {
        const fullWeekData = addDataFromAPI(weeks, res?.payload?.revenues);
        setFilteredData(fullWeekData);
      });
    } else if (timeFrame === "month" && selectedMonth) {
      dispatch(
        getRevenueByMonthThunk({
          month: dayjs(selectedMonth).month() + 1,
          year: currentYear,
        })
      ).then((res) => {
        const weekInSelectedMonth = getWeeksInMonth(
          currentYear,
          dayjs(selectedMonth).month() + 1
        );
        const completeRevenueData = addMissingWeeks(
          res?.payload?.revenues,
          weekInSelectedMonth
        );
        const extendedData = extendWithBoundaryDates(completeRevenueData);
        setFilteredData(extendedData);
      });
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Select
        value={timeFrame}
        onChange={(value) => {
          setTimeFrame(value);
          setFilteredData([]);
          if (value === "month") {
            setSelectedWeek(null);
            setSelectedMonth(moment().startOf("month"));
          } else {
            setSelectedMonth(null);
          }
        }}
        style={{ width: 200, marginBottom: 16, marginRight: 20 }}
      >
        <Option value="week">Tuần</Option>
        <Option value="month">Tháng</Option>
      </Select>

      {timeFrame === "week" && (
        <Select
          placeholder="Chọn tuần"
          onChange={(value) => {
            setSelectedWeek(value);
            setFilteredData([]);
          }}
          style={{ width: 300, marginBottom: 16, marginRight: 20 }}
        >
          {getWeeksInYear().map((week) => (
            <Option key={week.week} value={JSON.stringify(week)}>
              Tuần {week.week} ({week.start} - {week.end})
            </Option>
          ))}
        </Select>
      )}

      {timeFrame === "month" && (
        <DatePicker
          picker="month"
          onChange={(date) => {
            setSelectedMonth(date ? date : null);
            setFilteredData();
          }}
          value={selectedMonth ? dayjs(selectedMonth) : null}
          style={{ width: 200, marginBottom: 16 }}
          disabledDate={(current) =>
            current && current > moment().endOf("month")
          }
        />
      )}

      <Button
        type="primary"
        onClick={showRevenueResult}
        style={{ marginBottom: 16 }}
      >
        Xem
      </Button>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={timeFrame === "month" ? "startDate" : "date"} />
          <YAxis />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#8884d8"
            name="Doanh thu"
          />
          <Line
            type="monotone"
            dataKey="totalAmountRemaining"
            stroke="#82ca9d"
            name="Số tiền còn lại"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomePage;
