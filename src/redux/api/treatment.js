import { internshipTransport } from "../../config/http/transport";

const treatment = {

    getServices: (data) => {
        const url = `/api/treatment/service`;

        return internshipTransport.get(
            url,
            data
        );
    },
    createService: (data) => {
        const url = `/api/treatment/service`;

        return internshipTransport.post(
            url,
            data
        );
    },
    updateService: (data) => {
        const { serviceId, ...restData } = data
        const url = `/api/treatment/service/${serviceId}`;

        return internshipTransport.put(
            url,
            restData
        );
    },
    deleteService: (data) => {
        const { serviceId, ...restData } = data
        const url = `/api/treatment/service/${serviceId}`;

        return internshipTransport.delete(
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
    createTreatment: (data) => {
        const url = `/api/treatment`;

        return internshipTransport.post(
            url,
            data
        );
    },
    updateTreatment: (data) => {
        const { treatmentId, ...restData } = data
        const url = `/api/treatment/${treatmentId}`;

        return internshipTransport.put(
            url,
            restData
        );
    },
    deleteTreatment: (data) => {
        const { treatmentId, ...restData } = data
        const url = `/api/treatment/${treatmentId}`;

        return internshipTransport.delete(
            url,
            restData
        );
    },
};

export default treatment;