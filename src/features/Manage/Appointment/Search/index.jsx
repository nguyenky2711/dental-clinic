import {
  Select,
  Input,
  Form,
  DatePicker,
  Dropdown,
  Space,
  Button,
  AutoComplete,
} from "antd";
import React, { useState, useEffect, useContext } from "react";
import {
  SearchOutlined,
  BarsOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./styles.scss";
import moment from "moment";
import {
  filterStaffThunk,
  getStaffByTokenThunk,
} from "../../../../redux/action/staff";
import { debounce } from "lodash";
import { AuthContext } from "../../../../provider/AuthContext";
const AppointmentInforSearch = ({ handleSubmit, handleChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [activeFilter, setActiveFilter] = useState(false);
  const [dentistOptions, setDentistOptions] = useState([]);
  const { token, role, logout, position } = useContext(AuthContext);

  const [paramsDentist, setParamsDentist] = useState({
    positionId: 1,
    keyword: null,
  });

  const [searchObj, setSearchObj] = useState({
    isConfirm: null,
    staffId: null,
  });

  useEffect(() => {
    if (position === "dentist") {
      dispatch(getStaffByTokenThunk()).then((res) => {
        if (res) {
          setSearchObj((prevVal) => ({
            ...prevVal,
            staffId: res?.payload?.id,
          }));
        }
      });
    } else {
      dispatch(filterStaffThunk(paramsDentist)).then((res) => {
        const tempList = res?.payload?.contents.map((item) => {
          return {
            id: item.id,
            value: item.name,
            label: item.name,
          };
        });
        setDentistOptions(tempList);
      });
    }
  }, [paramsDentist, role]);
  useEffect(() => {
    handleChange(searchObj);
  }, [searchObj]);

  const handleSearch = debounce((value) => {
    setParamsDentist((prevParams) => ({
      ...prevParams,
      keyword: value ? value.toLowerCase() : null,
    }));
  }, 300); // Thời gian debounce là 300ms

  const onFinish = (values) => {
    handleSubmit(searchObj);
  };

  return (
    <>
      <Form
        name="normal_search"
        className="treatment-searchForm"
        onFinish={onFinish}
        form={form}
      >
        <div className="keyWord_search-container">
          {position !== "dentist" && (
            <Form.Item
              className="staff_item name"
              name="staffId"
              style={{ flexBasis: "30%" }}
            >
              <AutoComplete
                // style={{ width: "500px" }}
                options={dentistOptions}
                onSearch={handleSearch} // Gọi hàm tìm kiếm debounce
                onSelect={(val) => {
                  if (val) {
                    const dentistInf = dentistOptions.find(
                      (item) => item.value == val
                    );

                    setSearchObj((preVal) => ({
                      ...preVal,
                      staffId: dentistInf?.id ?? null,
                    }));
                  } else {
                  }
                }}
                onChange={(val) => {
                  if (!val) {
                    setSearchObj((preVal) => ({
                      ...preVal,
                      staffId: null,
                    }));
                  }
                }}
                allowClear
                placeholder="Nhập tên bác sĩ khám"
              />
            </Form.Item>
          )}

          <Form.Item
            name="isConfirm"
            className="staff_item select"
            style={{ flexBasis: "20%" }}
          >
            <Select
              placeholder="Chọn trạng thái"
              options={[
                {
                  value: true,
                  label: "Đã duyệt",
                },
                {
                  value: false,
                  label: "Chưa duyệt",
                },
              ]}
              onChange={(val) =>
                setSearchObj((preVal) => ({
                  ...preVal,
                  isConfirm: val ?? null,
                }))
              }
              allowClear
            />
          </Form.Item>
          <Form.Item className="treatment-searchForm-btn">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
          {position === "dentist" && (
            <Form.Item className="treatment-searchForm-btn">
              <Button
                type="primary"
                htmlType="button"
                onClick={() => navigate("/manage/appointment/create")}
              >
                Thêm thông tin lịch khám
              </Button>
            </Form.Item>
          )}

          {/* <Form.Item className="treatment-searchForm-btn">
            <Button
              type="primary"
              htmlType="button"
              onClick={() => navigate("/manage/medical-record/create")}
            >
              Thêm bệnh án
            </Button>
          </Form.Item> */}

          {/* <Form.Item
            className={`treatment-searchForm-filterBtn ${
              activeFilter ? "active" : ""
            }`}
          >
            <FilterOutlined onClick={handleActive} />
          </Form.Item> */}

          {/* <Form.Item
            name="role"
            // label="Vai trò"
            className="treatment-searchForm-select service"
          >
            <Select
              suffixIcon={<BarsOutlined className="site-form-item-icon" />}
              placeholder="Chọn"
              options={listPosstions}
              onChange={(value) => setSendRole(value)}
              allowClear={() => {
                setSendRole();
                return true;
              }}
            />
          </Form.Item>
          <Form.Item
            name="level"
            // label="Giá"
            className="treatment-searchForm-select price"
          >
            <Select
              suffixIcon={<DollarOutlined className="site-form-item-icon" />}
              placeholder="Chọn"
              options={[
                {
                  value: "",
                  label: "Chọn",
                },
                {
                  value: "asc",
                  label: "Nhỏ đến lớn",
                },
                {
                  value: "desc",
                  label: "Lớn đến nhỏ ",
                },
              ]}
              onChange={(value) => setSendLevel(value)}
              allowClear={() => {
                setSendLevel();
                return true;
              }}
            />
          </Form.Item> */}
        </div>

        {activeFilter ? (
          <div className="filter_search-container">
            {/* <Form.Item name="status" label="Trạng thái">
              <Select
                suffixIcon={<HddFilled className="site-form-item-icon" />}
                placeholder={"Chọn"}
                options={[
                  {
                    value: "",
                    label: "Chọn",
                  },
                  {
                    value: "Active",
                    label: (
                      <>
                        <span
                          style={{
                            backgroundColor: "#25A71C",
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            marginRight: "15px",
                            display: "inline-block", // Add this to make the element visible
                          }}
                        ></span>
                        Active
                      </>
                    ),
                  },
                  {
                    value: "Not Active",
                    label: (
                      <>
                        <span
                          style={{
                            backgroundColor: "#DC2020",
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            marginRight: "15px",
                            display: "inline-block", // Add this to make the element visible
                          }}
                        ></span>
                        Not Active
                      </>
                    ),
                  },
                  {
                    value: "Lock",
                    label: (
                      <>
                        <span
                          style={{
                            backgroundColor: "#E6E6E6",
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            marginRight: "15px",
                            display: "inline-block", // Add this to make the element visible
                          }}
                        ></span>
                        Lock
                      </>
                    ),
                  },
                ]}
                onChange={(value) => setSendStatus(value)}
                allowClear={() => {
                  setSendStatus();
                  return true;
                }}
              />
            </Form.Item> */}
            {/* <Form.Item name="date" label="Ngày đăng ký">
              <DatePicker
                placeholder="Chọn ngày"
                onChange={(value) =>
                  value != undefined
                    ? setSendDate(moment(new Date(value)).format("YYYY-MM-DD"))
                    : setSendDate()
                }
                allowClear={() => {
                  setSendDate();
                  return true;
                }}
              />
            </Form.Item> */}
          </div>
        ) : (
          <></>
        )}
      </Form>
    </>
  );
};

export default AppointmentInforSearch;
