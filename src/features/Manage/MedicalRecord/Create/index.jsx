import {
  DeleteOutlined,
  PlusOutlined,
  SaveFilled,
  SaveOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
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
  updateProcedureByIdThunk,
} from "../../../../redux/action/medicalRecord";
import { AuthContext } from "../../../../provider/AuthContext";
import { debounce } from "lodash";
// import ConfirmModalAntd from "src/component/shared/ConfirmModalAntd";
const MedicalRecordFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, role, logout } = useContext(AuthContext);

  const [params, setParams] = useState({
    serviceId: null,
    keyword: null,
    sortOrder: null,
  });
  const [sendData, setSendData] = useState();
  let [treatments, setTreatments] = useState();
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
      console.log(res);
      setTreatments(
        res?.payload?.map((item) => {
          return {
            id: item?.id,
            label: item?.name + " - " + item?.serviceDTO?.name,
            value: item?.id,
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
  // Hàm tìm kiếm với debounce
  const handleSearch = debounce((value) => {
    setParams((prevParams) => ({
      ...prevParams,
      keyword: value ? value.toLowerCase() : null,
    }));
  }, 300); // Thời gian debounce là 300ms

  const handleSelect = (value) => {};
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
    console.log(lastData);
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
          if (
            res?.payload?.response?.data?.errors?.message ===
            "you aren't a dentist"
          ) {
            toast.error(
              recordId
                ? visitId
                  ? "Chỉnh sửa tiến trình thất bại"
                  : "Thêm tiến trình thất bại"
                : "Chỉ có bác sĩ mới được tạo bệnh án",
              {
                position: "top-right",
                autoClose: 3000,
                style: { color: "$color-default", backgroundColor: "#DEF2ED" },
              }
            );
          } else if (
            res?.payload?.response?.data?.errors?.message ===
            "this is not yours"
          ) {
            toast.error("Chỉ bác sĩ có thẩm quyền mới thực hiện được", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "$color-default", backgroundColor: "#DEF2ED" },
            });
          } else if (
            res?.payload?.response?.data?.errors?.message ===
            `can't update record done`
          ) {
            toast.error("Bệnh án đã hoàn thành", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "$color-default", backgroundColor: "#DEF2ED" },
            });
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
        onFieldsChange={(changeField, allFields) => {
          console.log(changeField);
        }}
      >
        <div className="courseContent_container">
          <div
            className="leftSide_container"
            style={recordId ? {} : { width: "900px", margin: "0px auto" }}
          >
            <div className="patient_name">
              {role !== "Role_Patient" && (
                <Form.Item
                  className="patient_item name"
                  label="Họ tên bệnh nhân"
                  name="patientId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ tên bệnh nhân",
                    },
                  ]}
                >
                  <Input readOnly />
                </Form.Item>
              )}

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
                <Input readOnly={role === "Role_Patient"} />
              </Form.Item>
              <Form.Item
                className="patient_item note"
                label="Ghi chú"
                name="note"
                rules={[{ required: false, message: "Vui lòng nhập ghi chú" }]}
              >
                <Input readOnly={role === "Role_Patient"} />
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
                                  if (
                                    res?.payload?.response?.data?.errors
                                      ?.message === "this is not yours"
                                  ) {
                                    toast.error(
                                      "Chỉ bác sĩ có thẩm quyền mới thực hiện được",
                                      {
                                        position: "top-right",
                                        autoClose: 3000,
                                        style: {
                                          color: "$color-default",
                                          backgroundColor: "#DEF2ED",
                                        },
                                      }
                                    );
                                  } else if (
                                    res?.payload?.response?.data?.errors
                                      ?.message === `can't update record done`
                                  ) {
                                    toast.error("Bệnh án đã hoàn thành", {
                                      position: "top-right",
                                      autoClose: 3000,
                                      style: {
                                        color: "$color-default",
                                        backgroundColor: "#DEF2ED",
                                      },
                                    });
                                  }
                                }
                              });
                            }
                          };
                          const handleSave = (id, fieldName) => {
                            const treatmentId = form.getFieldValue([
                              "procedureCreationDTOS",
                              fieldName,
                              "treatmentId",
                            ]);
                            const count = form.getFieldValue([
                              "procedureCreationDTOS",
                              fieldName,
                              "count",
                            ]);
                            const note = form.getFieldValue([
                              "procedureCreationDTOS",
                              fieldName,
                              "note",
                            ]);
                            const sendData = {
                              procedureId: id,
                              treatmentId,
                              count,
                              note,
                            };

                            dispatch(updateProcedureByIdThunk(sendData)).then(
                              (res) => {
                                if (res?.payload?.message === "successfully") {
                                  toast.success(
                                    "Chỉnh sửa tiến trình thành công",
                                    {
                                      position: "top-right",
                                      autoClose: 3000,
                                      style: {
                                        color: "$color-default",
                                        backgroundColor: "#DEF2ED",
                                      },
                                    }
                                  );
                                } else {
                                  if (
                                    res?.payload?.response?.data?.errors
                                      ?.message === "this is not yours"
                                  ) {
                                    toast.error(
                                      "Chỉ bác sĩ có thẩm quyền mới thực hiện được",
                                      {
                                        position: "top-right",
                                        autoClose: 3000,
                                        style: {
                                          color: "$color-default",
                                          backgroundColor: "#DEF2ED",
                                        },
                                      }
                                    );
                                  } else if (
                                    res?.payload?.response?.data?.errors
                                      ?.message === `can't update record done`
                                  ) {
                                    toast.error("Bệnh án đã hoàn thành", {
                                      position: "top-right",
                                      autoClose: 3000,
                                      style: {
                                        color: "$color-default",
                                        backgroundColor: "#DEF2ED",
                                      },
                                    });
                                  } else {
                                    toast.error(
                                      "Chỉnh sửa tiến trình thất bại",
                                      {
                                        position: "top-right",
                                        autoClose: 3000,
                                        style: {
                                          color: "$color-default",
                                          backgroundColor: "#DEF2ED",
                                        },
                                      }
                                    );
                                  }
                                }
                              }
                            );
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
                                    showSearch
                                    onSearch={handleSearch}
                                    allowClear
                                    // options={treatments}
                                    disabled={role === "Role_Patient"}
                                    optionFilterProp="children"
                                  >
                                    {treatments?.map((treatment) => (
                                      <Select.Option
                                        key={treatment.value}
                                        value={treatment.value}
                                      >
                                        {treatment.label}
                                      </Select.Option>
                                    ))}
                                  </Select>
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
                                              "Số lượng tối đa là 60"
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
                                    readOnly={role === "Role_Patient"}
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
                                  <Input readOnly={role === "Role_Patient"} />
                                </Form.Item>
                              </div>

                              {index >= 0 && (
                                <DeleteOutlined
                                  onClick={() => {
                                    if (role !== "Role_Patient") {
                                      visitId
                                        ? handleRemove(id, field.name)
                                        : remove(field.name);
                                    }
                                  }}
                                />
                              )}
                              {id && (
                                <SaveOutlined
                                  onClick={() => {
                                    if (role !== "Role_Patient") {
                                      visitId && handleSave(id, field.name);
                                    }
                                  }}
                                />
                              )}
                            </Space>
                          );
                        })}
                      {role !== "Role_Patient" && (
                        <Form.Item
                          style={{
                            margin: "50px auto",
                            width: "180px",
                          }}
                        >
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                              setParams((prevParams) => ({
                                ...prevParams,
                                keyword: null,
                              }));
                            }} // Make sure 'add' is a valid function
                            block
                            icon={<PlusOutlined />}
                          >
                            Thêm phương thức
                          </Button>
                        </Form.Item>
                      )}
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
                role !== "Role_Patient"
                  ? recordId
                    ? navigate(
                        `/manage/patient/${patientId}/medical-record/${recordId}/visit`
                      )
                    : navigate(`/manage/patient/${patientId}/medical-record`)
                  : navigate(`/medical-record/${recordId}/visit`)
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
