import { setCookie, getCookie } from "../utils/cookies";
import { BASE_URL, request, checkResponse } from "../utils/constants";

export const getUserApi = () => {
    console.log("start getUserApi");
    return fetch(`${BASE_URL}auth/user`, {
        method: "GET",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    }).then(res => {
        console.log("res from getUserApi", res);
        if (res.ok) return res.json()
    })
        .then(data => {
            console.log("data from getUserApi", data);
            if (data?.success) return data;
            return Promise.reject(data);
        });
};

export const registerUserApi = (data) => {
    console.log("data from registerUserApi", data)
    return fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    }).then(res => {
        console.log("RES", res);
        if (res.ok) return res.json();
    })
    .then(data => {
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
            console.log("DATA FROM LOGIN", data);
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
