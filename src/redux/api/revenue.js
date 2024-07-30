import { internshipTransport } from "../../config/http/transport";

const revenue = {

    createInvoice: (data) => {
        const url = `/api/invoice`;

        return internshipTransport.post(
            url,
            data
        );
    },
    findInvoiceByVisitId: (data) => {
        console.log(data)
        const { visitId, ...restData } = data
        const url = `/api/invoice/objective/${visitId}`;

        return internshipTransport.post(
            url,
            data,
        );
    },
    getRevenueByWeek: (data) => {
        let url = `/api/invoice/revenue/week`;
        let params = [];


        if (data.year) {
            params.push(`year=${data.year}`);
        }

        if (data.week) {
            params.push(`week=${data.week}`);
        }

        // Nếu có tham số nào, nối chúng vào URL
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        return internshipTransport.get(url, data);
    },
    getRevenueByMonth: (data) => {
        let url = `/api/invoice/revenue/month`;
        let params = [];


        if (data.month) {
            params.push(`month=${data.month}`);
        }
        if (data.year) {
            params.push(`year=${data.year}`);
        }
        // Nếu có tham số nào, nối chúng vào URL
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        return internshipTransport.get(url, data);
    },
    getRevenueByYear: (data) => {
        let url = `/api/invoice/revenue/year`;
        let params = [];


        if (data.year) {
            params.push(`year=${data.year}`);
        }

        // Nếu có tham số nào, nối chúng vào URL
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        return internshipTransport.get(url, data);
    },
};

export default revenue;