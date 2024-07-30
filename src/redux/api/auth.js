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
    changePasssword: (data) => {
        const url = `/api/user/change-password`;

        return internshipTransport.put(
            url,
            data
        );
    },
    confirmMail: (data) => {
        const url = `/api/user/mail/forget-password`;
        return internshipTransport.post(
            url,
            data,
        );
    },
    confirmResetPasswordOTP: (data) => {
        const url = `/api/user/mail/otp`;

        return internshipTransport.post(
            url,
            data,
        );
    },
    changePassswordWhenForgot: (data) => {
        const url = `/api/user/password`;

        return internshipTransport.put(
            url,
            data
        );
    },
};

export default auth;