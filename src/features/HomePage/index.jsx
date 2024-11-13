import React, { useContext, useEffect, useRef } from "react";
import "./style.scss"; // Tạo file CSS tương ứng
import dentalLogo from "../../../src/dental_logo.jpg";
import shortBrief from "../../assets/short-brief.png";
import ShineTeeth from "../../assets/icon/shine_teeth.png";
import Nieng from "../../assets/icon/nieng.png";
import Banner from "../../assets/icon/banner.jpg";
import BG_Icon_1 from "../../assets/icon/messenger.svg";
import BG_Icon_2 from "../../assets/icon/facebook.svg";
import BG_Icon_3 from "../../assets/icon/telegram.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthContext";
import {
  FacebookOutlined,
  PhoneOutlined,
  SkypeOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

const icons = [BG_Icon_1, BG_Icon_2, BG_Icon_3];

const HomePage = () => {
  const navigate = useNavigate();
  const { token, role, position, login, userName } = useContext(AuthContext);

  return (
    <div className="home-page">
      <section className="hero-section">
        <img src={Banner} alt="Background Banner" className="hero-bg-img" />
        <div className="hero-content">
          <h1>
            <span style={{ color: "#37AFE1" }}>Nha khoa</span>{" "}
            <span style={{ color: "#F5F4B3" }}>Nụ cười</span> Tự tin trong tay
            bạn
          </h1>
          <p>
            Nụ cười của bạn, ưu tiên của chúng tôi. Khám phá các dịch vụ của
            chúng tôi và đặt lịch hẹn ngay hôm nay!
          </p>
          <div className="cover-btn" style={{ display: "flex", gap: "30px" }}>
            <button
              onClick={() =>
                !token || !role || !userName
                  ? navigate("/login")
                  : navigate("/appointment")
              }
              className="nav-toggle"
            >
              Đặt Lịch Hẹn
            </button>
            <button className="appointment-toggle">Tư vấn bác sĩ</button>
          </div>
        </div>
      </section>
      <div className="short-brief-section-cover">
        <div className="short-brief-img">
          <img src={shortBrief} alt="shortBrief-pic" />
        </div>
        <div className="short-brief-content">
          <h4>
            Chào mừng đến với <span style={{ color: "#37AFE1" }}>Nha khoa</span>{" "}
            <span style={{ color: "#F5F4B3" }}>Nụ cười</span>
          </h4>

          <h2>Nha khoa hiện đại với sự chăm sóc dịu dàng</h2>
          <p>
            {" "}
            Chúng tôi luôn coi trọng yếu tố nhân văn, áp dụng công nghệ tiên
            tiến để đảm bảo an toàn và hiệu quả cao. Sức khỏe răng miệng của bạn
            là sứ mệnh của chúng tôi.
          </p>
          <p>
            Hệ thống trang thiết bị hiện đại, đội ngũ y bác sĩ giàu kinh nghiệm,
            luôn tận tâm với từng ca điều trị. Chúng tôi cung cấp các dịch vụ
            nha khoa tổng quát, chỉnh nha, trám răng thẩm mỹ, cấy ghép Implant
            và các dịch vụ khác.
          </p>
          <div className="process-list">
            <ul className="left-list">
              <li>Quy trình khép kín, chuẩn quốc tế</li>
              <li>Thiết bị tối tân, vô trùng tuyệt đối</li>
              <li>Bác sĩ tận tâm, am hiểu nhu cầu</li>
            </ul>
            <ul>
              <li>Tư vấn kỹ lưỡng và giải pháp hợp lý</li>
              <li>Chăm sóc sau điều trị miễn phí</li>
              <li>Lịch hẹn linh hoạt</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="statistic-key-section">
        <div className="statistic-item">
          <span>30+</span>
          <p>Khu vực phục vụ phòng khám nha khoa</p>
        </div>
        <div className="divider"></div>
        <div className="statistic-item">
          <span>27K+</span>
          <p>Khách hàng hài lòng với dịch vụ chăm sóc răng miệng</p>
        </div>
        <div className="divider"></div>
        <div className="statistic-item">
          <span>20+</span>
          <p>Bác sĩ chuyên nghiệp trong lĩnh vực nha khoa</p>
        </div>
      </div>
      <div className="features-section-cover">
        <h1>Các dịch vụ nổi bật</h1>
        <p>Dịch vụ nha khoa tận tâm và thoải mái, phù hợp từng cá nhân</p>
        <section className="features-section">
          <div className="feature">
            <div className="icon">
              <img src={ShineTeeth} alt="Biểu tượng 1" />
            </div>
            <div className="content">
              <h3>Trắng Răng</h3>
              <p>Rang sáng nụ cười của bạn</p>
            </div>
          </div>
          <div className="feature">
            <div className="icon">
              <img src={Nieng} alt="Biểu tượng 2" />
            </div>
            <div className="content">
              <h3>Niềng Răng</h3>
              <p>Hoàn thiện sự căn chỉnh</p>
            </div>
          </div>
          <div className="feature">
            <div className="icon">
              <img
                src="data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMjYuODU2NzQsMi4wNTI4NGE2LjU0NzQ5LDYuNTQ3NDksMCwwLDAtNi42ODAxOC0xLjc3MWwtMi45OTcwNy44ODY3Mi0uMTYwMTYuMDQyNDhhMy42NTk3NiwzLjY1OTc2LDAsMCwxLTIuMDQuMDAxTDExLjgyMDEyLjI4MTg1YTYuNTQ3OSw2LjU0NzksMCwwLDAtNi42ODAxOCwxLjc3MUE2LjU2Miw2LjU2MiwwLDAsMCwzLjY0NDM0LDguODI4NzJsMi43NSw2LjgxOTgyLjAwMjI2LjAwMzQyYS40OTYxLjQ5NjEsMCwwLDAsLjA5NDEyLjE0MjY0Yy4wMDUzMS4wMDU4Ni4wMDc4MS4wMTQzNC4wMTMzNy4wMTk5YS43MjQ0Mi43MjQ0MiwwLDAsMCwuMzQ4MjEuMTQ1ODFsLjAwNTkyLjAwMTIySDcuOTk4MzR2Mi41YTEuNTAxNjQsMS41MDE2NCwwLDAsMCwxLjUsMS41aC41ODIxNWwxLjkyNzYxLDkuNjM4MTguMDAzNzIuMDA4NDguMDAwNjcuMDA2MTYuMDA0OTQuMDA2ODRhLjQ5NzY2LjQ5NzY2LDAsMCwwLC4yMzI4NS4zMTQ0NWwzLjUsMmEuNDk5NjUuNDk5NjUsMCwwLDAsLjQ5NjA5LDBsMy41LTJhLjUwMDIzLjUwMDIzLDAsMCwwLC4yNDIxOS0uMzM1OTRsMS4xODQzMy01LjkyMTYzLjAwMzMtLjAxNjU0Ljc0LTMuN2guNTgyMTVhMS41MDE2NCwxLjUwMTY0LDAsMCwwLDEuNS0xLjV2LTIuNWgxLjE0MDE0YS40ODY0NS40ODY0NSwwLDAsMCwuMjQ3LS4wNzQ1Mi40NjMxNy40NjMxNywwLDAsMCwuMDQ5NTYtLjAzMzM5LjQ5MTIzLjQ5MTIzLDAsMCwwLC4xNjUyMi0uMjAyNTFsLjAwMjA4LS4wMDI1NiwyLjc1OTc3LTYuODQ2NjhBNi41NTIyMiw2LjU1MjIyLDAsMCwwLDI2Ljg1Njc0LDIuMDUyODRaTTExLjEwODIsMjAuMDAxNTdoOS41MzJsLTguOTUzNDksMi44OTI1MlptNy45NDQzNCw5LjE3ODcxLTMuMDU0MiwxLjc0NTYxLTIuMzE1LTEuMzIzMTJMMTkuMzMxLDI3Ljc4Nzg5Wm0uNTAzMDUtMi41MTUtNi42ODQ4MSwyLjE0ODE5LS40MDI4My0yLjAxMzkyLDcuNTQ4NTgtMi40Mzg3OFptLjY4NTYxLTMuNDI3NjEtNy45NzA2NCwyLjU3NTA3LS4zODY0MS0xLjkzMTg4TDIwLjY4MSwyMS4wMzlabTIuNzU3MTQtNC43NzYxOGEuNTAwMzQuNTAwMzQsMCwwLDEtLjUuNWgtMTNhLjUwMDM0LjUwMDM0LDAsMCwxLS41LS41di0yLjVoMTRaTTI3LjQyNDYxLDguNDU0N2wtMi42MjM3OCw2LjUwNjg0SDcuMTk1NzlsLTIuNjE0LTYuNDhhNS41NjgxNiw1LjU2ODE2LDAsMCwxLDEuMjc5My01LjczNTg0QTUuNTY3NjgsNS41Njc2OCwwLDAsMSwxMS41Mzc0LDEuMjQwODNMMTQuNjk5LDIuMTcyYTQuNzAxNTMsNC43MDE1MywwLDAsMCwuODMwNDQuMTUxNjFBNC45OTUzNiw0Ljk5NTM2LDAsMCwwLDE0LjI2NzM4LDQuNjc1NGEuNTAwMjQuNTAwMjQsMCwwLDAsLjM4MDM3LjU5NjE5LjUxODUuNTE4NSwwLDAsMCwuMTA4NC4wMTE3Mi41MDAxNS41MDAxNSwwLDAsMCwuNDg3NzktLjM5MjA5QTQuMDI0MjYsNC4wMjQyNiwwLDAsMSwxNy41MDc4LDIuMTA5NTRsMi45NTItLjg2ODcxYTUuNTY2NTksNS41NjY1OSwwLDAsMSw1LjY3NTc4LDEuNTA0ODhBNS41NTg2NSw1LjU1ODY1LDAsMCwxLDI3LjQyNDYxLDguNDU0N1oiLz48L3N2Zz4="
                alt="Biểu tượng 3"
              />
            </div>
            <div className="content">
              <h3>Trồng răng</h3>
              <p>Bảo vệ răng của bạn</p>
            </div>
          </div>
          <div className="feature">
            <div className="icon">
              <img
                src="data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiB4PSIwIiB5PSIwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2NCA2NCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik0zOS4wNyw2NGMtMC4zMywwLTAuNjctMC4wNC0xLjAyLTAuMTJjLTAuOTktMC4yMi0xLjg3LTAuNzUtMi41NC0xLjUzYy0wLjkyLTEuMDYtMS4zNi0yLjQ4LTEuMi0zLjg5DQoJCQkJYzAuNjEtNS40MiwwLjA2LTkuNTktMS41LTExLjQ0Yy0wLjYtMC43Mi0xLjM2LTEuMS0yLjMxLTEuMTdjLTAuOTUsMC4wNy0xLjcxLDAuNDUtMi4zMiwxLjE3Yy0xLjU2LDEuODUtMi4xLDYuMDEtMS41LDExLjQzDQoJCQkJYzAuMywyLjU1LTEuMzEsNC44OC0zLjc1LDUuNDJjLTEuMjUsMC4yOC0yLjM4LDAuMDUtMy4zOC0wLjY2Yy0xLjk5LTEuNDItMy4zLTQuODMtMy44OS0xMC4xM2MtMC40LTMuNjMtMS4yNS03LjM2LTIuNTItMTEuMDgNCgkJCQljLTEuMTQtMy4zMi0xLjk0LTYuOTUtMi4zOC0xMC43OGMtMC4wNC0wLjM5LTAuMDgtMC44NS0wLjA3LTEuMzFjMC4wMS0wLjU0LDAuNDUtMC45MywwLjk5LTAuOTVjMC41NCwwLjAxLDAuOTYsMC40NiwwLjk0LDAuOTkNCgkJCQljLTAuMDEsMC4zNSwwLjAyLDAuNzMsMC4wNiwxLjA1YzAuNDIsMy42OSwxLjE5LDcuMTgsMi4yOSwxMC4zNmMxLjMyLDMuODYsMi4yLDcuNzMsMi42MSwxMS41YzAuNTEsNC41OSwxLjYxLDcuNzEsMy4wOSw4Ljc2DQoJCQkJYzAuNTQsMC4zOSwxLjEzLDAuNSwxLjgzLDAuMzRjMS40My0wLjMyLDIuNDItMS43NywyLjI0LTMuMzFjLTAuNDgtNC4yNy0wLjUzLTkuOTgsMS45NC0xMi45YzAuOTctMS4xNCwyLjIzLTEuNzcsMy43NC0xLjg2DQoJCQkJYzAuMDQsMCwwLjA3LDAsMC4xMSwwYzEuNTIsMC4wOSwyLjc3LDAuNzEsMy43NCwxLjg2YzIuNDcsMi45MywyLjQyLDguNjMsMS45NCwxMi45Yy0wLjEsMC44OCwwLjE3LDEuNzUsMC43NCwyLjQxDQoJCQkJYzAuNCwwLjQ2LDAuOTIsMC43NywxLjUsMC45YzAuNzEsMC4xNiwxLjI5LDAuMDUsMS44NC0wLjM0YzEuNDgtMS4wNiwyLjU4LTQuMTcsMy4wOC04Ljc0YzAuNDMtMy44NCwxLjMxLTcuNzIsMi42Mi0xMS41Mw0KCQkJCWMxLjA4LTMuMTUsMS44NS02LjYzLDIuMjgtMTAuMzdjMC4zNC0yLjkyLTAuNzQtNS43LTIuOTYtNy42M2MtMi4yNC0xLjk0LTUuMTctMi42Mi04LjA0LTEuODdjMCwwLTAuMTEsMC4wMy0wLjExLDAuMDMNCgkJCQljLTIuOTksMC43Ny02LjA4LDEuMDItOS4xNywwLjczYy0xLjQzLTAuMTQtMi44NC0wLjM5LTQuMTktMC43M2MtMC4wMy0wLjAxLTAuMDUtMC4wMS0wLjA4LTAuMDJjLTAuMDIsMC0wLjA0LTAuMDEtMC4wNC0wLjAxDQoJCQkJYy0yLjE5LTAuNTctNC40OC0wLjMtNi40MywwLjc3Yy0wLjQ3LDAuMjYtMS4wNiwwLjA4LTEuMzItMC4zOWMtMC4yNi0wLjQ3LTAuMDgtMS4wNiwwLjM5LTEuMzJjMi4zOS0xLjMxLDUuMTgtMS42NCw3Ljg1LTAuOTUNCgkJCQljMC4wMSwwLDAuMDgsMC4wMSwwLjE3LDAuMDVjMS4yNCwwLjMyLDIuNTMsMC41NCwzLjgzLDAuNjZjMi44NywwLjI3LDUuNzMsMC4wMyw4LjUxLTAuNjhsMC4xMy0wLjA0DQoJCQkJYzMuNDItMC45LDcuMDgtMC4wNCw5Ljc3LDIuMjljMi43MSwyLjM1LDQuMDMsNS43NSwzLjYyLDkuMzFjLTAuNDQsMy44Ny0xLjI0LDcuNS0yLjM3LDEwLjc4Yy0xLjI2LDMuNjgtMi4xMSw3LjQxLTIuNTMsMTEuMTENCgkJCQljLTAuNTgsNS4yNy0xLjg4LDguNjctMy44OCwxMC4xQzQwLjcyLDYzLjc0LDM5LjkzLDY0LDM5LjA3LDY0eiIvPjxwYXRoIGQ9Ik0xNC44NiwzNi40N2MtMC4zNSwwLTAuNjgtMC4xOS0wLjg1LTAuNWwtMi44Ni01LjE5bC01Ljg4LTMuMjFjLTAuMzEtMC4xNy0wLjUtMC41LTAuNS0wLjg1YzAtMC4zNSwwLjE5LTAuNjgsMC41LTAuODUNCgkJCQlsNS44OC0zLjIzbDIuODYtNS4yYzAuMTctMC4zMSwwLjUtMC41LDAuODUtMC41YzAsMCwwLDAsMCwwYzAuMzUsMCwwLjY4LDAuMTksMC44NSwwLjVsMi44NCw1LjE5bDUuODksMy4yMw0KCQkJCWMwLjMxLDAuMTcsMC41LDAuNSwwLjUsMC44NXMtMC4xOSwwLjY4LTAuNTEsMC44NWwtNS44OSwzLjIxbC0yLjg0LDUuMTlDMTUuNTQsMzYuMjcsMTUuMjIsMzYuNDcsMTQuODYsMzYuNDcNCgkJCQlDMTQuODYsMzYuNDcsMTQuODYsMzYuNDcsMTQuODYsMzYuNDd6IE03Ljc2LDI2LjdsNC41NywyLjVjMC4xNiwwLjA5LDAuMywwLjIyLDAuMzgsMC4zOGwyLjE0LDMuODlsMi4xMy0zLjg5DQoJCQkJYzAuMDktMC4xNiwwLjIyLTAuMywwLjM5LTAuMzlsNC41OC0yLjVsLTQuNTktMi41MWMtMC4xNi0wLjA5LTAuMy0wLjIyLTAuMzgtMC4zOWwtMi4xMy0zLjg5bC0yLjE0LDMuODkNCgkJCQljLTAuMDksMC4xNi0wLjIyLDAuMjktMC4zOCwwLjM4TDcuNzYsMjYuN3oiLz48Zz48cGF0aCBkPSJNNTYuMTIsNjRjLTEuNDQsMC0yLjkzLTAuOTktMi45OS0yLjg5QzUzLjA0LDU4LjQyLDUzLDU1LjQ5LDUzLDUyLjEzYzAtNC42MSwwLjA5LTkuNzYsMC4yNy0xNS4zMQ0KCQkJCQljMC4xNC00LjIzLDAuMjgtNy4wMSwwLjI4LTcuMDFsMC0yNy4yM0M1My41NSwxLjE1LDU0LjcsMCw1Ni4xMiwwczIuNTcsMS4xNSwyLjU3LDIuNTd2MjcuMjhjMC4wMSwwLjEyLDAuODUsMTcuNDMsMC40MiwzMS4yNQ0KCQkJCQlDNTkuMDQsNjMsNTcuNTYsNjQsNTYuMTIsNjRDNTYuMTIsNjQsNTYuMTIsNjQsNTYuMTIsNjR6IE01Ni4xMiwxLjk0Yy0wLjM1LDAtMC42MywwLjI4LTAuNjMsMC42M3YyNy4yOA0KCQkJCQljMCwwLjA1LTAuMTQsMi44Mi0wLjI4LDcuMDNjLTAuMTgsNS41My0wLjI3LDEwLjY2LTAuMjcsMTUuMjVjMCwzLjI5LDAuMDQsNi4yOSwwLjEyLDguOTFjMC4wMywwLjk3LDAuODgsMS4wMiwxLjA1LDEuMDINCgkJCQkJYzAsMCwwLDAsMCwwYzAuMTcsMCwxLjAyLTAuMDUsMS4wNS0xLjAyYzAuNDMtMTMuNzQtMC40MS0zMC45Ny0wLjQyLTMxLjE0bDAtMjcuMzNDNTYuNzUsMi4yMiw1Ni40NiwxLjk0LDU2LjEyLDEuOTR6Ii8+PHBhdGggZD0iTTU0LjUyLDE0Ljk5aC02LjA0Yy0wLjU0LDAtMC45Ny0wLjQzLTAuOTctMC45N1YzLjY4YzAtMC41NCwwLjQzLTAuOTcsMC45Ny0wLjk3aDYuMDRjMC41NCwwLDAuOTcsMC40MywwLjk3LDAuOTcNCgkJCQkJCWMwLDAuNTQtMC40MywwLjk3LTAuOTcsMC45N2gtNS4wN3Y4LjRoNS4wN2MwLjU0LDAsMC45NywwLjQzLDAuOTcsMC45N0M1NS40OSwxNC41Niw1NS4wNSwxNC45OSw1NC41MiwxNC45OXoiLz48cGF0aCBkPSJNNTQuNTIgOC4xaC02LjA0Yy0uNTQgMC0uOTctLjQzLS45Ny0uOTcgMC0uNTQuNDMtLjk3Ljk3LS45N2g2LjA0Yy41NCAwIC45Ny40My45Ny45N0M1NS40OSA3LjY2IDU1LjA1IDguMSA1NC41MiA4LjF6TTU0LjUyIDExLjU1aC02LjA0Yy0uNTQgMC0uOTctLjQzLS45Ny0uOTcgMC0uNTQuNDMtLjk3Ljk3LS45N2g2LjA0Yy41NCAwIC45Ny40My45Ny45N0M1NS40OSAxMS4xMSA1NS4wNSAxMS41NSA1NC41MiAxMS41NXoiLz48L2c+PC9zdmc+"
                alt="Biểu tượng 4"
              />
            </div>
            <div className="content">
              <h3>Vệ Sinh Răng</h3>
              <p>Duy trì vệ sinh</p>
            </div>
          </div>
        </section>
        <button onClick={() => navigate("/treatment")}>
          {" "}
          Xem bảng giá chi tiết
        </button>
      </div>
      <div className="get-service-section">
        <h1>Dễ dàng nhận được dịch vụ</h1>
        <div className="get-service-header">
          <h1>Nụ cười hoàn hảo chỉ sau 1 cuộc hẹn</h1>
          <p>
            Chăm sóc nhẹ nhàng với các kỹ thuật hiện đại, chúng tôi mang đến
            dịch vụ nha khoa chuyên nghiệp và an toàn. Đội ngũ chuyên gia của
            chúng tôi luôn tận tâm và chu đáo trong từng bước, giúp bạn cảm thấy
            thoải mái và an tâm khi sử dụng dịch vụ.
          </p>
        </div>
        <div className="get-service-steps">
          <div className="service-step" style={{ backgroundColor: "#A3DCF2" }}>
            <h4>
              Tư vấn <span>01</span>
            </h4>
            <p>
              Đội ngũ chuyên gia sẽ lắng nghe và đánh giá nhu cầu của bạn để đề
              xuất giải pháp phù hợp nhất.
            </p>
          </div>
          <div className="service-step" style={{ backgroundColor: "#5DC2E9" }}>
            <h4>
              Chọn gói dịch vụ <span>02</span>
            </h4>
            <p>
              Chúng tôi cung cấp nhiều gói dịch vụ linh hoạt, phù hợp với nhu
              cầu và điều kiện của mỗi khách hàng.
            </p>
          </div>
          <div className="service-step" style={{ backgroundColor: "#37AFE1" }}>
            <h4>
              Chọn ngày hẹn <span>03</span>
            </h4>
            <p>
              Linh hoạt sắp xếp thời gian theo lịch trình của bạn để đảm bảo sự
              thuận tiện tối đa.
            </p>
          </div>
          <div className="service-step" style={{ backgroundColor: "#2A8DB4" }}>
            <h4>
              Nhận dịch vụ <span>04</span>
            </h4>
            <p>
              Trải nghiệm dịch vụ chăm sóc nha khoa chuyên nghiệp, mang đến nụ
              cười rạng rỡ và tự tin.
            </p>
          </div>
        </div>
      </div>
      <div className="testimonials-section">
        <div className="testimonials-header">
          <h4>Đánh giá khách hàng</h4>
          <h1>Kết quả tự nói lên tất cả</h1>
          <p>
            "Đem lại sự hài lòng và tin tưởng cho khách hàng qua từng dịch vụ.
            Đội ngũ chuyên nghiệp luôn sẵn sàng đáp ứng nhu cầu của bạn
          </p>
        </div>
        <div className="testimonial-list">
          <p className="comment">
            <span>&#8220;</span> Đội ngũ rất tận tâm và chuyên nghiệp! Tôi cảm
            thấy an tâm và thoải mái trong suốt quá trình điều trị. Kết quả vượt
            xa mong đợi, tôi rất hài lòng và sẽ tiếp tục quay lại
            <span> &#8221; </span>
          </p>
          <p className="comment">
            <span>&#8220;</span> Dịch vụ tuyệt vời và không gian rất sạch sẽ,
            thoáng mát. Bác sĩ luôn giải thích rõ ràng và chăm sóc chu đáo. Chắc
            chắn tôi sẽ giới thiệu phòng khám này cho bạn bè và người thân.
            <span>&#8221;</span>
          </p>
          <p className="comment">
            <span>&#8220;</span> Tôi đã có một trải nghiệm rất tốt tại đây. Quy
            trình nhanh chóng và hiệu quả, tôi không phải chờ đợi lâu. Chất
            lượng dịch vụ rất xứng đáng với mức giá, tôi hoàn toàn hài lòng.
            <span>&#8221;</span>
          </p>
        </div>
      </div>
      <section className="background-container-ft">
        <div className="ft-header">
          <div className="name">
            <img src={dentalLogo} alt="" />
            <div className="content">
              <h1>
                <span style={{ color: "#37AFE1" }}>Nha khoa</span>{" "}
                <span style={{ color: "#F5F4B3" }}>Nụ cười</span>
              </h1>
              <h4>Một nụ cười bằng mười thang thuốc bổ</h4>
            </div>
          </div>
          <div className="infor">
            <h1>Kết nối qua</h1>
            <div className="infor-icon">
              <div className="icon-cover">
                <FacebookOutlined />
              </div>
              <div className="icon-cover">
                <WhatsAppOutlined />
              </div>
              <div className="icon-cover">
                <SkypeOutlined />
              </div>
            </div>
          </div>
        </div>
        <div className="ft-content">
          <p>
            <span style={{ color: "#37AFE1" }}>Giờ làm việc: </span>
            <span>
              Thứ 2 - Thứ 7: Sáng: 8h - 12h và Chiều: 13h30 - 19h30 | (Chủ nhật
              chỉ làm việc tới 12h)
            </span>
          </p>
          <p>
            <span style={{ color: "#37AFE1" }}>Thông tin liên hệ: </span>{" "}
            <span>
              {" "}
              0123456789 <PhoneOutlined className="phone-icon" /> |
              nhakhoanucuoi@gmail.com
            </span>
          </p>
        </div>
      </section>
      <div className="copyright">
        <p>Copyright © 2024. </p>
      </div>
    </div>
  );
};

export default HomePage;
