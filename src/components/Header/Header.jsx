// Header.js
import React, { useContext } from "react";
import "./style.scss";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../provider/AuthContext";

const Header = () => {
  const { role, logout, position } = useContext(AuthContext);
  console.log(position);
  const location = useLocation();

  const handleLogout = () => {
    logout(); // Gọi hàm logout từ AuthContext khi người dùng click vào nút đăng xuất
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

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
            {position === "receptionist" && (
              <>
                <Link
                  to="/manage/appointment"
                  className={isActive("/manage/appointment") ? "active" : ""}
                >
                  Quản lý lịch đặt khám
                </Link>
              </>
            )}
          </>
        )}
      </div>
      <div className="header-right">
        {role && (
          <button onClick={handleLogout} className="logout-button">
            Đăng xuất
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
