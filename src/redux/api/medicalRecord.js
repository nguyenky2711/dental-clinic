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
    addProcedureForRecord: (data) => {
        const { recordId, ...restData } = data;
        const url = `/api/procedure/record/${recordId}`;
        return internshipTransport.post(
            url,
            restData
        );
    },
    deleteProcedureById: (data) => {
        const url = `/api/procedure/${data.procedureId}`;

        return internshipTransport.delete(
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