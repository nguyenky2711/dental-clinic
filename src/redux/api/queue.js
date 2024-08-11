import { internshipTransport } from "../../config/http/transport";

const queue = {
    getQueueByStaffId: (data) => {
        const { staffId, ...restData } = data
        const url = `/api/queue/staff/${staffId}`;

        return internshipTransport.get(
            url,
            restData
        );
    },
    getNextByStaffId: (data) => {
        const { staffId, ...restData } = data
        const url = `/api/queue/next/staff/${staffId}`;

        return internshipTransport.get(
            url,
            restData
        );
    },
    addPatientToQueue: (data) => {
        const { staffId, patientId, ...restData } = data

        const url = `/api/queue/staff/${staffId}/patient/${patientId}`;

        return internshipTransport.post(
            url,
            restData
        );
    },
};

export default queue;