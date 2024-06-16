import { internshipTransport } from "../../config/http/transport";

const appointment = {

    filter: (data) => {

        let url = `/api/schedule`;
        let params = [];

        // Kiểm tra từng tham số và thêm vào mảng params nếu có giá trị

        if (data.isConfirm) {
            params.push(`isConfirm=${data.isConfirm}`);
        }
        if (data.staffId) {
            params.push(`staffId=${data.staffId}`);
        }

        // Nếu có tham số nào, nối chúng vào URL
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        return internshipTransport.get(url, data);
    },

    createByClient: (data) => {
        const url = `/api/schedule/patient`;

        return internshipTransport.post(
            url,
            data
        );
    },
    createByStaff: (data) => {
        const url = `/api/schedule/staff`;

        return internshipTransport.post(
            url,
            data
        );
    },
    confirm: (data) => {
        const { workingId, ...restData } = data
        const url = `/api/schedule/${workingId}/true`;

        return internshipTransport.put(
            url,
            restData
        );
    },
    decline: (data) => {
        const { workingId, ...restData } = data
        const url = `/api/schedule/${workingId}/false`;

        return internshipTransport.put(
            url,
            restData
        );
    },
};

export default appointment;