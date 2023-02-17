import { setCookie, getCookie } from "../utils/cookies";

export const BASE_URL = "https://norma.nomoreparties.space/api/";

// функция проверки ответа на `ok`
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // выкидываем ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// функция проверки ответа на `success`
const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  // выкидываем ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// универсальная фукнция запроса с проверкой ответа на `ok` и `success`
// В вызов приходят `endpoint`(часть урла, которая идет после базового) и options
export const request = (endpoint, options) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export const getUserApi = () => {
    return request("auth/user", {
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
    });
};

export const registerUserApi = (data) => {
    return request("auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    });
};

export const updateUserApi = (data) => {
    return request("auth/user", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: getCookie('accessToken')
        },
        body: JSON.stringify(data)
    });
};

export const loginUserApi = (data) => {
    return request("auth/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    });
};

export const forgotPasswordApi = (data) => {
    return request("password-reset", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    });
};

export const logoutApi = () => {
    return request("auth/logout", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            "token":  getCookie("refreshToken")
        })
    });
};

export const refreshToken = () => {
    return request("auth/token", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            "token":  getCookie("refreshToken")
        }),
    });
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
