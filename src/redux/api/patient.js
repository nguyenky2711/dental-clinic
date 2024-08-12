import { internshipTransport } from "../../config/http/transport";

const patient = {

    filter: (data) => {
        let url = `/api/patient/filter`;
        let params = [];

        // Kiểm tra từng tham số và thêm vào mảng params nếu có giá trị
        if (data.keyword) {
            params.push(`keyword=${encodeURIComponent(data.keyword)}`);
        }
        if (data.pageNumber >= 0) {
            params.push(`pageNumber=${data.pageNumber - 1}`);
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
    getPatientByToken: (data) => {
        const url = `/api/patient/token`;

        return internshipTransport.get(
            url,
            data
        );
    },

    create: (data) => {
        const url = `/api/patient`;

        return internshipTransport.post(
            url,
            data
        );
    },
    update: (data) => {
        const { patientId, ...restData } = data
        console.log(data)
        const url = `/api/patient/${data.patientId}`;

        return internshipTransport.put(
            url,
            restData.patientDTO
        );
    },
};

export default patient;