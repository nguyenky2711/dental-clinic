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

import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import ConfirmModalAntd from "../../../../components/ConfirmModalAntd";
import { filterTreatmentsThunk } from "../../../../redux/action/treatment";
import {
  addProceduredByVisitdIdThunk,
  addProcedureForRecordThunk,
  addVisitForRecordThunk,
  createMedicalRecordThunk,
  deleteProcedureByIdThunk,
  getProceduredByRecorIdThunk,
  getProceduredByVisitIdThunk,
} from "../../../../redux/action/medicalRecord";
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
  const [canRemove, setCanRemove] = useState(false);
  const [form] = Form.useForm();
  const { patientId, recordId, visitId } = useParams();
  const reduxResult = useSelector(
    (state) => state.patient.listPatients.contents
  );
  useEffect(() => {
    const patientResult = reduxResult.find((item) => item.id == patientId);
    if (patientResult) {
      form.setFieldValue("patientId", patientResult.name);
    }
  }, [patientId]);

  useEffect(() => {
    visitId &&
      dispatch(getProceduredByVisitIdThunk({ visitId: visitId })).then(
        (res) => {
          const result = res?.payload?.procedureShowDTOS?.map((item) => {
            return {
              id: item.id,
              treatmentId: item.treatmentDTO.id,
              count: item.count,
              note: item.note,
            };
          });

          form.setFieldsValue({ procedureCreationDTOS: result });
          form.setFieldValue("diagnosis", res?.payload?.diagnosis);
          form.setFieldValue("note", res?.payload?.note);
        }
      );
  }, [visitId]);

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

  useEffect(() => {
    if (canRemove) setCanRemove(false);
  }, [canRemove]);

  const [modal, setModal] = useState({
    open: false,
    title: null,
    content: null,
  });

  const handleOpenModal = () => {
    setModal((prevVal) => ({ ...prevVal, open: true }));
  };

  const handleModalCancel = (cancelled) => {
    if (cancelled) {
    }
    setModal((prevVal) => ({ ...prevVal, open: false }));
  };
  // const handleRemove = (id) => {
  //   if (id) {
  //     dispatch(deleteProcedureByIdThunk({ procedureId: id })).then((res) => {
  //       console.log(res);
  //       if (res?.payload?.message === "successfully") {
  //         toast.success("Xoá liệu trình thành công", {
  //           position: "top-right",
  //           autoClose: 3000,
  //           style: { color: "green", backgroundColor: "#DEF2ED" },
  //         });
  //         setCanRemove(true);
  //       } else {
  //         toast.error("Chỉ có bác sĩ khám mới có quyền thay đổi!", {
  //           position: "top-right",
  //           autoClose: 3000,
  //           style: { color: "red", backgroundColor: "#DEF2ED" },
  //         });
  //       }
  //     });
  //   }
  // };
  const onFinish = (values) => {
    const lastData = recordId
      ? visitId
        ? {
            visitId: visitId,
            records: values.procedureCreationDTOS.filter((item) => !item.id),
          } // Khi `recordId` và `visitId` là `true`
        : {
            recordId: recordId,
            records: [
              // Đặt tên cho khóa là `records`
              {
                diagnosis: values.diagnosis,
                note: values.note,
                procedureCreationDTOList: values.procedureCreationDTOS,
              },
            ],
          } // Khi `recordId` là `true` và `visitId` là `false`
      : {
          diagnosis: values.diagnosis,
          note: values.note,
          patientId: patientId,
          objectivesCreationDTOS: [],
        }; // Khi `recordId` là `false`

    setSendData(lastData);
    setModal((prevVal) => ({
      ...prevVal,
      open: true,
      title: recordId
        ? visitId
          ? "Chỉnh sửa tiến trình"
          : "Thêm tiến trình"
        : "Thêm bệnh án",
      content: recordId
        ? visitId
          ? "Xác nhận chỉnh sửa tiến trình"
          : "Xác nhận thêm tiến trình"
        : "Xác nhận thêm bệnh án",
    }));
  };
  const handleOkModal = (value) => {
    value &&
      dispatch(
        recordId
          ? visitId
            ? addProceduredByVisitdIdThunk(sendData)
            : addVisitForRecordThunk(sendData)
          : createMedicalRecordThunk(sendData)
      ).then((res) => {
        console.log(res);
        if (res?.payload?.message === "successfully") {
          toast.success(
            recordId
              ? visitId
                ? "Chỉnh sửa tiến trình thành công"
                : "Thêm tiến trình thành công"
              : "Thêm bệnh án thành công",
            {
              position: "top-right",
              autoClose: 3000,
              style: { color: "$color-default", backgroundColor: "#DEF2ED" },
            }
          );
          recordId
            ? navigate(
                `/manage/patient/${patientId}/medical-record/${recordId}/visit`
              )
            : navigate(`/manage/patient/${patientId}/medical-record`);
        } else {
          toast.error(
            recordId
              ? visitId
                ? "Chỉnh sửa tiến trình thất bại"
                : "Thêm tiến trình thất bại"
              : "Thêm bệnh án thất bại",
            {
              position: "top-right",
              autoClose: 3000,
              style: { color: "$color-default", backgroundColor: "#DEF2ED" },
            }
          );
        }
      });
  };
  return (
    <div
      className="courseForm-container"
      style={recordId ? {} : { width: "900px", margin: "0px auto" }}
    >
      <h1>
        {recordId
          ? visitId
            ? "Tiến trình khám"
            : "Thêm tiến trình khám"
          : "Tạo mới bệnh án"}
      </h1>
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
          <div
            className="leftSide_container"
            style={recordId ? {} : { width: "900px", margin: "0px auto" }}
          >
            <div className="patient_name">
              <Form.Item
                className="patient_item name"
                label="Họ tên bệnh nhân"
                name="patientId"
                rules={[
                  { required: true, message: "Vui lòng nhập họ tên bệnh nhân" },
                ]}
              >
                <Input readOnly />
              </Form.Item>
              <Form.Item
                className="patient_item diagnosis"
                label={recordId ? "Chẩn đoán chi tiết" : "Chẩn đoán sơ bộ"}
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
          {recordId && (
            <div className="rightSide_container">
              <Form.List name="procedureCreationDTOS" initialValue={[{}]}>
                {(fields, { add, remove }) => {
                  if (fields.length == 0) {
                    add();
                  }

                  return (
                    <>
                      {fields?.length > 0 &&
                        fields.map((field, index) => {
                          const id = form.getFieldValue([
                            "procedureCreationDTOS",
                            field.name,
                            "id",
                          ]);
                          const handleRemove = (id, fieldName) => {
                            if (id) {
                              dispatch(
                                deleteProcedureByIdThunk({ procedureId: id })
                              ).then((res) => {
                                console.log(res);
                                if (res?.payload?.message === "successfully") {
                                  toast.success("Xoá liệu trình thành công", {
                                    position: "top-right",
                                    autoClose: 3000,
                                    style: {
                                      color: "green",
                                      backgroundColor: "#DEF2ED",
                                    },
                                  });
                                  // Directly remove the field here after successful deletion
                                  remove(fieldName);
                                } else {
                                  toast.error(
                                    "Chỉ có bác sĩ khám mới có quyền thay đổi!",
                                    {
                                      position: "top-right",
                                      autoClose: 3000,
                                      style: {
                                        color: "red",
                                        backgroundColor: "#DEF2ED",
                                      },
                                    }
                                  );
                                }
                              });
                            }
                          };
                          return (
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
                                      message:
                                        "Vui lòng chọn phương thức điều trị",
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
                                        if (
                                          value != undefined &&
                                          value != null
                                        ) {
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
                                    visitId
                                      ? handleRemove(id, field.name)
                                      : remove(field.name);
                                  }}
                                />
                              )}
                            </Space>
                          );
                        })}
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
                    </>
                  );
                }}
              </Form.List>
            </div>
          )}
        </div>

        <div className="buttonGroup">
          <Form.Item className="submitBtn">
            <Button type="submit" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
          <Form.Item className="cancelBtn">
            <Button
              type="button"
              onClick={() =>
                navigate(
                  `/manage/patient/${patientId}/medical-record/${recordId}/visit`
                )
              }
            >
              Huỷ
            </Button>
          </Form.Item>
        </div>
      </Form>
      <ConfirmModalAntd
        open={modal.open}
        onCancel={handleModalCancel}
        onOk={() => handleOkModal(sendData)}
        header={modal.title}
        title={modal.content}
      ></ConfirmModalAntd>
    </div>
  );
};

export default MedicalRecordFormPage;
