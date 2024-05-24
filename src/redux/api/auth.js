import { internshipTransport } from "../../config/http/transport";

const auth = {

    login: (data) => {
        const url = `/api/login`;

        return internshipTransport.post(
            url,
            data
        );
    },
};

export default auth;