import { URL } from './constans';
import useAxios from '../config/axios.config';

export async function getRequestToken(payload) {
    const header = {
        contentType: 'application/json',
    };
    const AXIOS = useAxios(header);
    return await AXIOS.get(`${process.env.API_HOST}/${URL.GET_REQUEST_TOKEN}?api_key=${process.env.API_KEY}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export async function getSessionId(payload) {
    const header = {
        contentType: 'application/json',
    };
    const AXIOS = useAxios(header);
    return AXIOS.post(`${process.env.API_HOST}/${URL.LOGIN_PART2}?api_key=${process.env.API_KEY}`, payload)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export async function getAccountDetails(payload) {
    const header = {
        contentType: 'application/json',
    };
    const AXIOS = useAxios(header);
    return AXIOS.get(
        `${process.env.API_HOST}/${URL.ACCOUNT_DETAILS}?api_key=${process.env.API_KEY}&session_id=${payload.session_id}`,
    )
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export async function logIn(payload) {
    const header = {
        contentType: 'application/json',
    };
    const AXIOS = useAxios(header);
    return AXIOS.post(`${process.env.API_HOST}/${URL.LOGIN_PART1}?api_key=${process.env.API_KEY}`, payload)
        .then(async (response) => {
            if (response.status === 200) {
                const obj = response.data;
                const getSesssionId = await getSessionId({
                    request_token: payload.request_token,
                });
                if (getSesssionId.status === 200) {
                    obj.session_id = getSesssionId.data.session_id;
                    const accountDetails = await getAccountDetails({
                        session_id: obj.session_id,
                    });
                    if (accountDetails.status === 200) {
                        obj.account = accountDetails.data;
                        return obj;
                    } else {
                        return response;
                    }
                } else {
                    return response;
                }
            } else {
                return response;
            }
        })
        .catch((error) => {
            return error;
        });
}

export async function logOut(payload) {
    const header = {
        contentType: 'application/json',
    };
    const AXIOS = useAxios(header);
    return AXIOS.delete(
        `${process.env.API_HOST}/${URL.LOG_OUT}?api_key=${process.env.API_KEY}&session_id=${payload.session_id}`,
    )
        .then(async (response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
