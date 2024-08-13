import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { PlusSquareOutlined } from "@ant-design/icons";
import TableAntdCustom from "../../../../components/TableAntd";
import {
  getNextByStaffIdThunk,
  getQueueByStaffIdThunk,
} from "../../../../redux/action/queue";
import {
  filterStaffThunk,
  getStaffByTokenThunk,
} from "../../../../redux/action/staff";
import { AuthContext } from "../../../../provider/AuthContext";
import moment from "moment";
import { Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const DoctorQueuePage = () => {
  const { token, role, logout, position } = useContext(AuthContext);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openFormPage, setOpenFormPage] = useState(false);
  const [selectDoctor, setSelectDoctor] = useState(false);
  const [staffOptions, setStaffOptions] = useState([]); // State lưu trữ danh sách gợi ý
  const [queueList, setQueueList] = useState([]); // State lưu trữ danh sách gợi ý
  const [paramsStaff, setParamsStaff] = useState({
    keyword: null,
  });
  const [modalProps, setModalProps] = useState({
    open: false,
    data: null,
  });

  const columnsPatient = [
    {
      title: "Họ và tên",
      key: "name",
      width: "15%",
      render: (text) => {
        return text.name;
      },
    },
    {
      title: "Ngày sinh",
      key: "birthday",
      align: "center",
      width: "10%",
      render: (text) => {
        return moment(new Date(text.birthday)).format("DD/MM/YYYY");
      },
    },
    {
      title: "Số điện thoại",
      key: "phone",
      align: "center",
      width: "10%",
      render: (text) => {
        return (
          <>
            <p>SĐT: {text.phoneNumber}</p>
          </>
        );
      },
    },
    {
      title: "Địa chỉ",
      key: "address",
      width: "20%",
      render: (text) => {
        return (
          <>
            <p>Địa chỉ: {text.address}</p>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getStaffByTokenThunk()).then((res) => {
      res?.payload && setSelectDoctor(res.payload);
    });
  }, [paramsStaff]);
  useEffect(() => {
    if (selectDoctor) {
      dispatch(getQueueByStaffIdThunk({ staffId: selectDoctor.id })).then(
        (res) => {
          console.log(res);
          setQueueList(res?.payload);
        }
      );
    }
  }, [selectDoctor]);
  useEffect(() => {
    if (location.pathname === "/manage/queue") {
      // Initialize SockJS and STOMP client
      const socket = new SockJS("http://localhost:8085/ws");
      const stompClient = Stomp.over(socket);

      // Connect to the WebSocket server
      stompClient.connect({}, (frame) => {
        console.log("Connected: " + frame);

        // Subscribe to the /topic/queue endpoint
        stompClient.subscribe("/topic/queue", (message) => {
          const parse = JSON.parse(message.body);
          if (parse.length === 0) {
            setQueueList([]);
          } else {
            if (!deepEqual(parse, queueList)) {
              setQueueList(parse);
            }
          }
        });
      });

      // Cleanup on component unmount
      return () => {
        if (stompClient && stompClient.connected) {
          stompClient.disconnect(() => {
            console.log("Disconnected");
          });
        }
      };
    }
  }, [queueList, location.pathname]); // Add dependencies if needed

  const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const callNextPatient = () => {
    dispatch(getNextByStaffIdThunk({ staffId: selectDoctor.id })).then(
      (res) => {
        res?.payload?.id &&
          setModalProps((preVal) => ({
            ...preVal,
            data: res?.payload,
          }));
      }
    );
  };

  return (
    <>
      <h1>
        Danh sách bệnh nhân đang chờ{" "}
        {position === "receptionist" && (
          <PlusSquareOutlined
            onClick={() => {
              setOpenFormPage(true);
              setSelectDoctor();
              setQueueList();
            }}
          />
        )}
      </h1>
      {position === "dentist" && queueList.length != 0 && (
        <a
          className="hoverEffect"
          onClick={() => {
            callNextPatient();
            setModalProps((preVal) => ({ ...preVal, open: true, data: null }));
          }}
        >
          Thông tin bệnh nhân tiếp theo
        </a>
      )}
      <Modal
        open={modalProps.open}
        onCancel={() => {
          setModalProps((preVal) => ({ ...preVal, open: false, data: null }));
          navigate(`/manage/patient/${modalProps?.data?.id}/medical-record`);
        }}
        footer={null} // Hide the default footer
        width={500}
      >
        <p>Bệnh nhân: {modalProps?.data?.name}</p>
        <p>
          Ngày sinh:{" "}
          {modalProps?.data?.birthday &&
            moment(new Date(modalProps?.data?.birthday)).format("DD/MM/YYYY")}
        </p>
        <p>Tiền sử bệnh: {modalProps?.data?.medicalHistory}</p>
      </Modal>
      <TableAntdCustom
        list={queueList}
        pagination={false}
        columns={columnsPatient}
        className={"staffinfor-table"}
        emptyText="Hiện chưa có bệnh nhân nào"
      />
    </>
  );
};

export default DoctorQueuePage;
