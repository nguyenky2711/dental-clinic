import React, { useContext, useState } from "react";
import "./style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthContext";
import { Menu, Dropdown, Button } from "antd";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  KeyOutlined,
} from "@ant-design/icons";

const Header = () => {
  const { role, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Gọi hàm logout từ AuthContext khi người dùng click vào nút đăng xuất
  };
  const isActive = (path) => {
    if (
      path === "/manage/working-time" ||
      path === "/manage/working-time/past"
    ) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<KeyOutlined />}
        onClick={() => navigate(`change-password`)}
      >
        Đổi mật khẩu
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Logo</Link>
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
          </>
        )}
      </div>
      <div className="header-right">
        {role && (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<UserOutlined />}>
              <DownOutlined />
            </Button>
          </Dropdown>
        )}
      </div>
    </header>
  );
};

export default Header;
