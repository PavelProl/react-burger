import { setCookie, getCookie } from "./cookies";

export const BASE_URL: string = "https://norma.nomoreparties.space/api/";

interface IRequestHeaders {
    'Content-Type': string;
    Accept?: string;
    Authorization?: string;
};

interface IRequestOption {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    headers: Headers;
    body?: string;
}

type TUser = {
    id?: number;
    password?: string;
    email?: string;
    name?: string;
};

type TServerResponse<T> = {
    success: boolean;
    // user?: TUser;
    // message?: string;
    // headers?: Headers;
} & T;

type TUserResponse = TServerResponse<{
    data: TUser
}>;

// функция проверки ответа на `ok`
const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  // выкидываем ошибку, чтобы она попала в `catch`
//   return Promise.reject(`Ошибка ${res.status}`);
  return res.json().then(err => Promise.reject(`Ошибка: ${err.status}`))
};

// универсальная фукнция запроса с проверкой ответа на `ok` и `success`
// В вызов приходят `endpoint`(часть урла, которая идет после базового) и options
export const request = <T>(endpoint: string, options: RequestInit): Promise<T> => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then((res) => checkResponse<TServerResponse<T>>(res))
        // .then((res) => checkSuccess(res));
        .then((data) => {
            console.log("data", data)
            if (data?.success) return data;
            return Promise.reject(data)
        });
};

export const getUserApi = () => {
    return request("auth/user", {
        method: "GET",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('accessToken') || ""
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
};

export const registerUserApi = (data: {
    name: string;
    email: string;
    password: string;
}) => {
    return request("auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    });
};

export const updateUserApi = (data: {
    name: string;
    email: string;
    password: string;
}) => {
    return request("auth/user", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: getCookie('accessToken') || ""
        },
        body: JSON.stringify(data)
    });
};

export const loginUserApi = (data: {
    email: string;
    password: string;
}) => {
    return request("auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    });
};

export const forgotPasswordApi = (data: {
    password: string;
}) => {
    return request("password-reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    });
};

export const logoutApi = () => {
    return request("auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
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
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            "token":  getCookie("refreshToken") || ""
        }),
    });
};

// здесь временно не типизировал
export const fetchWithRefresh = async <T>(url: string, options: any): Promise<T> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData: any = await refreshToken();
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            setCookie("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken);
            options.headers.Authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};
