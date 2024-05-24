import { internshipTransport } from "../../config/http/transport";

const medicalRecord = {

    getRecordByPatientId: (data) => {
        const url = `/api/record/patient/${data}`;

        return internshipTransport.get(
            url,
            data
        );
    },
    getProceduredByRecorId: (data) => {
        const url = `/api/procedure/record/${data.recordId}`;

        return internshipTransport.get(
            url,
            data
        );
    },
    create: (data) => {
        const url = `/api/record`;

        return internshipTransport.post(
            url,
            data
        );
    },
};

export default medicalRecord;