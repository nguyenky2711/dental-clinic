import { Form, Button } from "antd";
import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
const MedicalRecordInforSearch = ({ handleSubmit, handleChange }) => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {};

  return (
    <>
      <Form
        name="normal_search"
        className="search-form medical_record"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item className="search-form-btn submit-btn">
          <Button
            type="primary"
            htmlType="button"
            onClick={() =>
              navigate(`/manage/patient/${patientId}/medical-record/create`)
            }
          >
            Thêm bệnh án
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default MedicalRecordInforSearch;
