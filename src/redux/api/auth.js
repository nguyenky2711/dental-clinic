import { internshipTransport } from "../../config/http/transport";

const auth = {

    login: (data) => {
        const url = `/api/login`;

        return internshipTransport.post(
            url,
            data
        );
    },
    sendActiveMail: (data) => {
        console.log(data)
        const url = `/api/user/mail/send`;

        return internshipTransport.post(
            url,
            data,
        );
    },
    confirmWithOTP: (data) => {
        const url = `/api/user/mail/active`;

        return internshipTransport.put(
            url,
            data
        );
    },
};

export default auth;