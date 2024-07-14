import { internshipTransport } from "../../config/http/transport";

const staff = {

    filter: (data) => {
        let url = `/api/staff/filter`;
        let params = [];

        // Kiểm tra từng tham số và thêm vào mảng params nếu có giá trị
        if (data.keyword) {
            params.push(`keyword=${encodeURIComponent(data.keyword)}`);
        }
        if (data.positionId) {
            params.push(`positionId=${data.positionId}`);
        }
        if (data.pageNumber) {
            params.push(`pageNumber=${data.pageNumber}`);
        }
        if (data.pageSize) {
            params.push(`pageSize=${data.pageSize}`);
        }

        // Nếu có tham số nào, nối chúng vào URL
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        return internshipTransport.get(url, data);
    },
    filterForPatient: (data) => {
        let url = `/api/staff/patient/filter`;
        let params = [];

        // Kiểm tra từng tham số và thêm vào mảng params nếu có giá trị
        if (data.keyword) {
            params.push(`keyword=${encodeURIComponent(data.keyword)}`);
        }
        if (data.pageNumber) {
            params.push(`pageNumber=${data.pageNumber}`);
        }
        if (data.pageSize) {
            params.push(`pageSize=${data.pageSize}`);
        }

        // Nếu có tham số nào, nối chúng vào URL
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        return internshipTransport.get(url, data);
    },
    getStaffByToken: (data) => {
        const url = `/api/staff/token`;

        return internshipTransport.get(
            url,
            data
        );
    },
    create: (data) => {
        const url = `/api/staff`;

        return internshipTransport.post(
            url,
            data
        );
    },
    update: (data) => {
        const { staffId, ...restData } = data
        const url = `/api/staff/${staffId}`;

        return internshipTransport.put(
            url,
            restData.staffDTO
        );
    },
};

export default staff;