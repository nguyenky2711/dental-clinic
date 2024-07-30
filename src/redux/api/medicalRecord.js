import { internshipTransport } from "../../config/http/transport";

const medicalRecord = {

    getRecordByPatientId: (data) => {
        const url = `/api/record/patient/${data}`;

        return internshipTransport.get(
            url,
            data
        );
    },
    getRecordByToken: (data) => {
        const url = `/api/record/token`;

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
    deleteRecord: (data) => {
        const { recordId, ...restData } = data
        const url = `/api/record/${recordId}`;

        return internshipTransport.delete(
            url,
            data
        );
    },
    doneRecord: (data) => {
        const { recordId, ...restData } = data
        const url = `/api/record/done/${recordId}`;

        return internshipTransport.put(
            url,
            data
        );
    },
    reopenRecord: (data) => {
        const { recordId, ...restData } = data
        const url = `/api/record/reopen/${recordId}`;

        return internshipTransport.put(
            url,
            data
        );
    },
    //Objective - visit
    getVisitByRecordId: (data) => {
        const url = `/api/objective/record/${data.recordId}`;

        return internshipTransport.get(
            url,
            data
        );
    },
    deleteVisitById: (data) => {
        const url = `/api/objective/${data.visitId}`;

        return internshipTransport.delete(
            url,
            data
        );
    },
    addVisitForRecord: (data) => {
        const { recordId, records, ...restData } = data;
        // console.log(restData)
        const url = `/api/objective/record/${recordId}`;
        return internshipTransport.post(
            url,
            records
        );
    },
    // procedure
    getProceduredByVisitdId: (data) => {
        const { visitId, ...restData } = data
        const url = `/api/procedure/objective/${visitId}`;

        return internshipTransport.get(
            url,
            restData
        );
    },
    addProceduredByVisitdId: (data) => {
        const { visitId, records, ...restData } = data
        const url = `/api/procedure/objective/${visitId}`;

        return internshipTransport.post(
            url,
            records
        );
    },
    getProceduredByRecordId: (data) => {
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
    updateProcedureById: (data) => {
        const { procedureId, ...restData } = data
        const url = `/api/procedure/${data.procedureId}`;

        return internshipTransport.put(
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
};

export default medicalRecord;