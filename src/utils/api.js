import { setCookie, getCookie } from "../utils/cookies";
import { BASE_URL, request, checkResponse } from "../utils/constants";


export const registerUserApi = (data) => {
    console.log("data from registerUserApi", data)
    return fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    }).then(res => {
        console.log("res", res);
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log("data", data);
        if (data?.success) return data;
        return Promise.reject(data)
    });
};

export const loginUserApi = (data) => {
    return fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    }).then(checkResponse)
        .then(data => {
            if (data?.success) return data;
            return Promise.reject(data)
        })
};

export const forgotPasswordApi = (data) => {
    return fetch(`${BASE_URL}password-reset`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    }).then(checkResponse)
        .then(data => {
            if (data?.success) return data;
            return Promise.reject(data)
        })
};

export const logoutApi = () => {
    return fetch(`${BASE_URL}auth/logout`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ "token":  getCookie("refreshToken") })
    }).then(checkResponse)
        .then(data => {
            console.log("data from logout", data)
            if (data?.success) return data;
            return Promise.reject(data)
        })
};
