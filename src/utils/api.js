import { setCookie, getCookie } from "../utils/cookies";

export const BASE_URL = "https://norma.nomoreparties.space/api/";

// функция проверки ответа от сервера
const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
    // return Promise.reject(`Ошибка ${res.status}`);
        return res.json().then(err => Promise.reject(err));
    }
}

// универсальная функция запроса с проверкой ответа
export const request = (url, options) => {
    return fetch(url, options).then(checkResponse);
}

export const getUserApi = () => {
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
        if (res.ok) return res.json()
    })
        .then(data => {
            if (data?.success) return data;
            return Promise.reject(data);
        });
};

export const registerUserApi = (data) => {
    return fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    }).then(res => {
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
        body: JSON.stringify({
            "token":  getCookie("refreshToken")
        })
    }).then(checkResponse)
        .then(data => {
            if (data?.success) return data;
            return Promise.reject(data)
        })
};

export const refreshToken = () => {
    return fetch(`${BASE_URL}auth/token`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            "token":  getCookie("refreshToken")
        }),
    }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            setCookie("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};
