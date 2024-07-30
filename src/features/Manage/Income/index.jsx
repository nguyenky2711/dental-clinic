import React, { useState, useEffect } from "react";
import { Select, DatePicker, Button } from "antd";
import {
  BarChart,
  Bar,
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

// Hàm để lấy ngày bắt đầu và kết thúc của tuần trong một tháng
const getWeeksInMonth = (year, month) => {
  // Thay đổi tháng từ 1-indexed (1 = January) sang 0-indexed (0 = January)
  month -= 1;

  // Tạo đối tượng Date cho ngày đầu tháng
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0); // Ngày cuối tháng

  const weeks = [];
  let current = new Date(startOfMonth);

  // Đảm bảo tuần bắt đầu từ Chủ Nhật
  while (current.getDay() !== 0) {
    current.setDate(current.getDate() - 1);
  }

  // Lặp qua từng tuần trong tháng
  while (current <= endOfMonth) {
    const weekStart = new Date(current);
    const weekEnd = new Date(current);
    weekEnd.setDate(weekStart.getDate() + 6);

    if (weekEnd > endOfMonth) {
      weekEnd.setDate(endOfMonth.getDate());
    }

    weeks.push({
      week: Math.ceil((weekStart.getDate() - 1 + weekStart.getDay()) / 7),
      start: weekStart.toISOString().split("T")[0],
      end: weekEnd.toISOString().split("T")[0],
    });

    // Tiến đến tuần tiếp theo
    current.setDate(current.getDate() + 7);
  }

  return weeks;
};

// Ví dụ sử dụng hàm
const year = 2024;
const month = 7; // Tháng 7

const weeksInMonth = getWeeksInMonth(year, month);

console.log(weeksInMonth);

const IncomePage = () => {
  const dispatch = useDispatch();
  const [timeFrame, setTimeFrame] = useState("month"); // Default to month
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(moment().startOf("month"));
  const [filteredData, setFilteredData] = useState([]);

  const currentYear = new Date().getFullYear();
  // Function to get weeks of a given month
  const getWeeksInMonth = (date) => {
    const startOfMonth = moment(date).startOf("month");
    const endOfMonth = moment(date).endOf("month");
    const weeks = [];
    let current = startOfMonth.clone();

    while (current.isBefore(endOfMonth)) {
      const startOfWeek = current.clone().startOf("isoWeek");
      const endOfWeek = current.clone().endOf("isoWeek");
      weeks.push({
        week: startOfWeek.isoWeek(),
        start: startOfWeek.format("YYYY-MM-DD"),
        end: endOfWeek.format("YYYY-MM-DD"),
      });
      current.add(1, "week");
    }

    return weeks;
  };

  const showRevenueResult = () => {
    if (timeFrame === "week") {
      dispatch(
        getRevenueByWeekThunk({
          week: JSON.parse(selectedWeek).week,
          year: currentYear,
        })
      ).then((res) => {
        console.log(res);
      });
    } else if (timeFrame === "month") {
      dispatch(
        getRevenueByMonthThunk({
          month: dayjs(selectedMonth).month() + 1,
          year: currentYear,
        })
      ).then((res) => {
        // console.log(res); --> need change here
      });
    }
  };
  // Function to get weeks in the current year
  const getWeeksInYear = () => {
    const weeks = [];
    const now = moment();
    const startOfYear = moment().startOf("year");
    const endOfYear = moment().endOf("year");

    let current = startOfYear.clone().startOf("isoWeek");

    while (current.isBefore(endOfYear)) {
      const endOfWeek = current.clone().endOf("isoWeek");

      // Lọc tuần không quá tuần hiện tại
      if (endOfWeek.isBefore(now) || endOfWeek.isSame(now, "week")) {
        weeks.push({
          week: current.isoWeek(),
          start: current.format("YYYY-MM-DD"),
          end: endOfWeek.format("YYYY-MM-DD"),
        });
      }

      current.add(1, "week");
    }

    // Sắp xếp tuần từ tuần hiện tại trở về trước
    weeks.sort((a, b) => b.week - a.week);
    return weeks;
  };

  // Compute filtered data based on the selected time frame and options
  const computeFilteredData = () => {
    let test = [];
    if (timeFrame === "week" && selectedWeek) {
      //   console.log(selectedWeek[start]);
      // test = data.filter((item) => {
      //   // console.log(moment(new Date(selectedWeek.start)));
      //   return (
      //     moment(selectedWeek.start) <= moment(item.date) &&
      //     moment(item.date) <= moment(selectedWeek.start)
      //   );
      // });
      // console.log(test);
    }

    if (timeFrame === "month" && selectedMonth) {
      // test = data.filter((item) => {
      //   return (
      //     moment(item.date).month() === dayjs(selectedMonth).month() &&
      //     moment(item.date).year() === dayjs(selectedMonth).year()
      //   );
      // });
      // console.log(test);
      //   setFilteredData(test);
      // return data.filter((item) =>
      //   moment(item.date).isSame(dayjs(selectedMonth).month() + 1, "month")
      // );
    }
    return test;
  };

  // Update filtered data whenever the time frame or selected options change
  useEffect(() => {
    // setFilteredData(computeFilteredData());
  }, [timeFrame, selectedWeek, selectedMonth]);

  return (
    <div>
      <Select
        value={timeFrame}
        onChange={(value) => {
          setTimeFrame(value);
          if (value === "month") {
            setSelectedWeek(null);
            setSelectedMonth(moment().startOf("month"));
          } else {
            setSelectedMonth(null);
          }
        }}
        style={{ width: 200, marginBottom: 16 }}
      >
        <Option value="week">Tuần</Option>
        <Option value="month">Tháng</Option>
      </Select>

      {timeFrame === "week" && (
        <Select
          placeholder="Chọn tuần"
          onChange={(value) => setSelectedWeek(value)}
          style={{ width: 200, marginBottom: 16 }}
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
          onChange={(date) =>
            //  console.log(dayjs(date))
            setSelectedMonth(date ? date : null)
          }
          value={selectedMonth ? dayjs(selectedMonth) : null}
          style={{ width: 200, marginBottom: 16 }}
          disabledDate={(current) =>
            current && current > moment().endOf("month")
          }
        />
      )}

      <Button
        type="primary"
        onClick={() => {
          // setFilteredData(computeFilteredData())
          console.log(timeFrame);
          console.log(JSON.parse(selectedWeek));
          console.log(selectedMonth);
          showRevenueResult();
        }}
        style={{ marginBottom: 16 }}
      >
        Xem
      </Button>

      {/* <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amountPaid" fill="#8884d8" />
          <Bar dataKey="remaining" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer> */}

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amountPaid" stroke="#8884d8" />
          <Line type="monotone" dataKey="remaining" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomePage;
