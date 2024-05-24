import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import "./style.scss";
import ConfirmModalAntd from "../../../../components/ConfirmModalAntd";
import { filterTreatmentsThunk } from "../../../../redux/action/treatment";
import { createMedicalRecordThunk } from "../../../../redux/action/medicalRecord";
// import ConfirmModalAntd from "src/component/shared/ConfirmModalAntd";
const MedicalRecordFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params, setParams] = useState({
    serviceId: null,
    keyword: null,
    sortOrder: null,
  });
  const [sendData, setSendData] = useState();
  const [treatments, setTreatments] = useState();
  const patients = useSelector((state) => {
    const reduxResult = state.patient.listPatients.contents;
    return reduxResult.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  });

  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(filterTreatmentsThunk(params)).then((res) => {
      setTreatments(
        res?.payload?.map((item) => {
          return {
            value: item?.id,
            label: item?.name + " - " + item?.serviceDTO?.name,
          };
        })
      );
    });
  }, [params]);

  const [openModal, setOpenModal] = useState(false);
  const [hadOpenModal, setHadOpenModal] = useState(false);
  const [hadErrors, setHadErrors] = useState(true);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleModalCancel = (cancelled) => {
    if (cancelled) {
    }
    setOpenModal(false);
  };

  const onFinish = (values) => {
    // console.log(values);
    const lastData = {
      diagnosis: values.diagnosis,
      note: values.note,
      patientId: values.patientId,
      procedureCreationDTOS: values.procedureCreationDTOS,
    };
    setSendData(lastData);
    setOpenModal(true);
  };
  const handleOkModal = (value) => {
    value &&
      dispatch(createMedicalRecordThunk(sendData)).then((res) => {
        console.log(res);
        if (res?.payload?.message === "successfully") {
          toast.success("Thêm bệnh án thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "$color-default", backgroundColor: "#DEF2ED" },
          });
          navigate("/manage/patient");
        } else {
          toast.error("Thêm bệnh án thất bại", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "$color-default", backgroundColor: "#DEF2ED" },
          });
        }
      });
  };
  return (
    <div className="courseForm-container">
      <Form
        name="dynamic_form_nest_item"
        form={form}
        onFinish={onFinish}
        style={{
          maxWidth: "100%",
        }}
        autoComplete="off"
        onFieldsChange={(changeField, allFields) => {}}
      >
        <div className="courseContent_container">
          <div className="leftSide_container">
            <div className="patient_name">
              <Form.Item
                className="patient_item name"
                label="Họ tên bệnh nhân"
                name="patientId"
                rules={[
                  { required: true, message: "Vui lòng nhập họ tên bệnh nhân" },
                ]}
              >
                <Select allowClear options={patients} />
              </Form.Item>
              <Form.Item
                className="patient_item diagnosis"
                label="Chẩn đoán"
                name="diagnosis"
                rules={[
                  { required: true, message: "Vui lòng nhập chẩn đoán" },

                  {
                    validator: (_, value) => {
                      if (value && value.length <= 256 && value.trim() != "") {
                        return Promise.resolve();
                      } else {
                        if (value && value.length > 256) {
                          return Promise.reject(
                            "Vui lòng nhập tối đa 256 ký tự"
                          );
                        }
                        if (!value || value == "") {
                          return Promise.reject();
                        }
                        if (value.trim() == "") {
                          return Promise.reject("Vui lòng nhập  chẩn đoán");
                        }
                      }
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="patient_item note"
                label="Ghi chú"
                name="note"
                rules={[{ required: false, message: "Vui lòng nhập ghi chú" }]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="rightSide_container">
            <Form.List name="procedureCreationDTOS" initialValue={[{}]}>
              {(fields, { add, remove }) => {
                if (fields.length == 0) {
                  add();
                }
                return (
                  <>
                    {fields?.length > 0 &&
                      fields.map((field, index) => (
                        <Space
                          className="treament_item"
                          key={field.key}
                          style={{
                            display: "flex",
                            // marginBottom: 17,
                            gap: "15px",
                          }}
                          align="baseline"
                        >
                          <div className="treatment_infor">
                            <Form.Item
                              {...field}
                              className="treatment"
                              label="Phương thức điều trị"
                              name={[field.name, "treatmentId"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn phương thức điều trị",
                                },
                              ]}
                            >
                              <Select
                                // defaultValue="lucy"

                                allowClear
                                // onChange={(value) => handleSelectMethod(value)}
                                options={treatments}
                              ></Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              className="count"
                              label="Số lượng"
                              name={[field.name, "count"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập số lượng",
                                },

                                {
                                  validator: (_, value) => {
                                    if (value != undefined && value != null) {
                                      if (value == 0) {
                                        return Promise.reject(
                                          "Vui lòng nhập số lượng"
                                        );
                                      }
                                      if (value > 100000000) {
                                        return Promise.reject(
                                          "Học phí tối đa là 100.000.000"
                                        );
                                      }
                                    } else {
                                      return Promise.resolve(); // Resolve if the value is valid
                                    }
                                    return Promise.resolve(); // Resolve if the value is valid
                                  },
                                },
                              ]}
                            >
                              <InputNumber
                                onKeyDown={(event) => {
                                  if (
                                    !(
                                      /[0-9]/.test(event.key) ||
                                      event.key === "Backspace" ||
                                      event.key === "Delete" ||
                                      event.key.startsWith("Arrow")
                                    )
                                  ) {
                                    event.preventDefault();
                                  }
                                }}
                              />
                            </Form.Item>
                          </div>
                          <div className="treatment_note">
                            <Form.Item
                              {...field}
                              className="patient_item note"
                              label="Ghi chú"
                              name={[field.name, "note"]}
                              rules={[
                                {
                                  required: false,
                                  message: "Vui lòng nhập ghi chú",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </div>

                          {index >= 0 && (
                            <DeleteOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          )}
                        </Space>
                      ))}
                    <Form.Item
                      style={{
                        margin: "50px auto",
                        width: "180px",
                      }}
                    >
                      <Button
                        type="dashed"
                        onClick={() => add()} // Make sure 'add' is a valid function
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm phương thức
                      </Button>
                    </Form.Item>
                    {/* {fields.length > 0 &&
                      groupListFromAPI !== undefined &&
                      fields.length < groupListFromAPI.length && (
                        <Form.Item
                          style={{
                            margin: "50px auto",
                            width: "180px",
                          }}
                        >
                          <Button
                            type="dashed"
                            onClick={() => add()} // Make sure 'add' is a valid function
                            block
                            icon={<PlusOutlined />}
                          >
                            Thêm phương thức
                          </Button>
                        </Form.Item>
                      )} */}

                    {/* {fields.length == 0 && add()} */}
                  </>
                );
              }}
            </Form.List>
          </div>
        </div>

        <div className="buttonGroup">
          <Form.Item className="submitBtn">
            <Button
              type="submit"
              htmlType="submit"
              // onClick={() => !hadErrors && setOpenModal(true)}
            >
              Thêm
            </Button>
          </Form.Item>
          <Form.Item className="cancelBtn">
            <Button type="button" onClick={() => navigate("/manage/patient")}>
              Huỷ
            </Button>
          </Form.Item>
        </div>
      </Form>
      <ConfirmModalAntd
        open={openModal}
        onCancel={handleModalCancel}
        onOk={() => handleOkModal(sendData)}
        header={"Thêm bệnh án "}
        title={"Bạn có muốn lưu bệnh án"}
      ></ConfirmModalAntd>
    </div>
  );
};

export default MedicalRecordFormPage;
