import { internshipTransport } from "../../config/http/transport";

const treatment = {

    getServices: (data) => {
        const url = `/api/treatment/service`;

        return internshipTransport.get(
            url,
            data
        );
    },
    filterTreatments: (data) => {
        let url = `/api/treatment`;
        let params = [];

        // Kiểm tra từng tham số và thêm vào mảng params nếu có giá trị
        if (data.keyword) {
            params.push(`keyword=${encodeURIComponent(data.keyword)}`);
        }
        if (data.serviceId) {
            params.push(`serviceId=${data.serviceId}`);
        }
        if (data.sortOrder) {
            params.push(`sortOrder=${encodeURIComponent(data.sortOrder)}`);

            // params.push(`sortOrder=${data.sortOrder}`);
        }

        // Nếu có tham số nào, nối chúng vào URL
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        return internshipTransport.get(
            url,
            data
        );
    },
};

export default treatment;