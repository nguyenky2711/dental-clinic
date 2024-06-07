import { internshipTransport } from "../../config/http/transport";

const workingTime = {

    create: (data) => {
        const url = `/api/working`;

        return internshipTransport.post(
            url,
            data
        );
    },
    showForStaffByWeek: (data) => {
        const url = `/api/working/${data.week}/${data.year}`;

        return internshipTransport.get(
            url,
            data
        );
    },
    deleteWorkingTime: (data) => {
        const url = `/api/working/${data.date}/${data.periodId}`;
        return internshipTransport.delete(
            url,
            data
        );
    },
};

export default workingTime;