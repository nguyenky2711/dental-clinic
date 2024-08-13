import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import dentalLogo from "../../../src/dental_logo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthContext";
import { Menu, Dropdown, Button } from "antd";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getStaffByTokenThunk } from "../../redux/action/staff";

const Header = () => {
  const { role, logout, userName, position } = useContext(AuthContext);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState("Chào bạn");

  const handleLogout = () => {
    logout(); // Gọi hàm logout từ AuthContext khi người dùng click vào nút đăng xuất
  };

  const isActive = (path) => {
    if (path === "/manage/working-time/past") {
      return location.pathname === path;
    }
    if (path === "/manage/working-time") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    if (role === "Role_Admin") {
      setWelcome("Xin chào Admin");
    } else if (role === "Role_Staff") {
      if (position === "dentist") {
        setTimeout(() => {
          dispatch(getStaffByTokenThunk()).then((res) => {
            const result = res?.payload;
            setWelcome(`Xin chào Bác sĩ, ${result?.name}`);
          });
        }, 300); // 300ms delay
      } else {
        setWelcome(`Xin chào Lễ tân, ${userName}`);
      }
    } else if (role === "Role_Patient") {
      setWelcome(`Chào bạn`);
    }
  }, [role]);

  const menu = (
    <Menu>
      <Menu.Item key="0" disabled>
        <span>{welcome}</span>
      </Menu.Item>
      {role === "Role_Patient" && (
        <>
          <Menu.Item
            key="3"
            className={isActive("/appointment") ? "active-menu-item" : ""}
            onClick={() => navigate("/appointment")}
          >
            Lịch khám
          </Menu.Item>
          <Menu.Item
            key="4"
            className={isActive("/medical-record") ? "active-menu-item" : ""}
            onClick={() => navigate("/medical-record")}
          >
            Bệnh án
          </Menu.Item>
        </>
      )}
      <Menu.Item
        key="1"
        icon={<KeyOutlined />}
        className={isActive("/change-password") ? "active-menu-item" : ""}
        onClick={() => navigate("/change-password")}
      >
        Đổi mật khẩu
      </Menu.Item>
      {role !== "Role_Admin" && (
        <Menu.Item
          key="2"
          icon={<UserOutlined />}
          className={isActive("/information") ? "active-menu-item" : ""}
          onClick={() => navigate("/information")}
        >
          Thông tin tài khoản
        </Menu.Item>
      )}

      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={dentalLogo} alt="Dental Logo" />
        </Link>
      </div>
      <div className="header-middle">
        {role === "Role_Admin" && (
          <>
            <Link
              to="/manage/staff"
              className={isActive("/manage/staff") ? "active" : ""}
            >
              Quản lý nhân viên
            </Link>
            <Link
              to="/manage/patient"
              className={isActive("/manage/patient") ? "active" : ""}
            >
              Quản lý bệnh nhân
            </Link>
            <Link
              to="/manage/income"
              className={isActive("/manage/income") ? "active" : ""}
            >
              Thống kê doanh thu
            </Link>
          </>
        )}
        {role === "Role_Staff" && (
          <>
            <Link
              to="/manage/patient"
              className={isActive("/manage/patient") ? "active" : ""}
            >
              Quản lý bệnh nhân
            </Link>
            <Link
              to="/manage/working-time"
              className={isActive("/manage/working-time") ? "active" : ""}
            >
              Lịch làm việc tuần tới
            </Link>
            <Link
              to="/manage/working-time/past"
              className={isActive("/manage/working-time/past") ? "active" : ""}
            >
              Lịch làm việc những tuần trước
            </Link>
            <Link
              to="/manage/appointment"
              className={isActive("/manage/appointment") ? "active" : ""}
            >
              Quản lý lịch đặt khám
            </Link>
            <Link
              to="/manage/queue"
              className={isActive("/manage/queue") ? "active" : ""}
            >
              Bệnh nhân đến khám
            </Link>
          </>
        )}
        <Link
          to="/treatment"
          className={isActive("/treatment") ? "active" : ""}
        >
          Điều trị- Dịch vụ
        </Link>
      </div>
      <div className="header-right">
        {role ? (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<UserOutlined />}>
              <DownOutlined />
            </Button>
          </Dropdown>
        ) : (
          <>
            <Link to="/login" className={isActive("/login") ? "active" : ""}>
              Đăng nhập
            </Link>
            <Link to="/signup" className={isActive("/signup") ? "active" : ""}>
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
