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
const data = [
  { id: 1, date: "2024-01-01", amountPaid: 150000, remaining: 50000 },
  { id: 2, date: "2024-01-08", amountPaid: 200000, remaining: 100000 },
  { id: 3, date: "2024-01-15", amountPaid: 250000, remaining: 150000 },
  { id: 4, date: "2024-01-22", amountPaid: 300000, remaining: 200000 },
  { id: 5, date: "2024-01-29", amountPaid: 350000, remaining: 250000 },
  { id: 6, date: "2024-02-05", amountPaid: 150000, remaining: 50000 },
  { id: 7, date: "2024-02-12", amountPaid: 200000, remaining: 100000 },
  { id: 8, date: "2024-02-19", amountPaid: 250000, remaining: 150000 },
  { id: 9, date: "2024-02-26", amountPaid: 300000, remaining: 200000 },
  { id: 10, date: "2024-03-04", amountPaid: 150000, remaining: 50000 },
  { id: 11, date: "2024-03-11", amountPaid: 200000, remaining: 100000 },
  { id: 12, date: "2024-03-18", amountPaid: 250000, remaining: 150000 },
  { id: 13, date: "2024-03-25", amountPaid: 300000, remaining: 200000 },
  { id: 14, date: "2024-04-01", amountPaid: 150000, remaining: 50000 },
  { id: 15, date: "2024-04-08", amountPaid: 200000, remaining: 100000 },
  { id: 16, date: "2024-04-15", amountPaid: 250000, remaining: 150000 },
  { id: 17, date: "2024-04-22", amountPaid: 300000, remaining: 200000 },
  { id: 18, date: "2024-04-29", amountPaid: 350000, remaining: 250000 },
  { id: 19, date: "2024-05-06", amountPaid: 150000, remaining: 50000 },
  { id: 20, date: "2024-05-13", amountPaid: 200000, remaining: 100000 },
  { id: 21, date: "2024-05-20", amountPaid: 250000, remaining: 150000 },
  { id: 22, date: "2024-05-27", amountPaid: 300000, remaining: 200000 },
  { id: 23, date: "2024-06-03", amountPaid: 150000, remaining: 50000 },
  { id: 24, date: "2024-06-10", amountPaid: 200000, remaining: 100000 },
  { id: 25, date: "2024-06-17", amountPaid: 250000, remaining: 150000 },
  { id: 26, date: "2024-06-24", amountPaid: 300000, remaining: 200000 },
  { id: 27, date: "2024-07-01", amountPaid: 150000, remaining: 50000 },
  { id: 28, date: "2024-07-08", amountPaid: 200000, remaining: 100000 },
  { id: 29, date: "2024-07-15", amountPaid: 250000, remaining: 150000 },
];
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
        console.log(res);
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

      test = data.filter((item) => {
        // console.log(moment(new Date(selectedWeek.start)));
        return (
          moment(selectedWeek.start) <= moment(item.date) &&
          moment(item.date) <= moment(selectedWeek.start)
        );
      });
      console.log(test);
    }

    if (timeFrame === "month" && selectedMonth) {
      test = data.filter((item) => {
        return (
          moment(item.date).month() === dayjs(selectedMonth).month() &&
          moment(item.date).year() === dayjs(selectedMonth).year()
        );
      });
      console.log(test);

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
