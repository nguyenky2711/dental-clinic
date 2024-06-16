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
    showForClient: (data) => {
        console.log(data)
        let url = `/api/working`;
        let params = [];

        // Kiểm tra từng tham số và thêm vào mảng params nếu có giá trị
        if (data.keyword) {
            params.push(`keyword=${encodeURIComponent(data.keyword)}`);
        }
        if (data.periodId) {
            params.push(`periodId=${data.periodId}`);
        }
        if (data.date) {
            params.push(`date=${data.date}`);
        }

        // Nếu có tham số nào, nối chúng vào URL
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        return internshipTransport.get(url, data);
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