import { setCookie, getCookie } from "./cookies";

export const BASE_URL: string = "https://norma.nomoreparties.space/api/";

type TRequestHeaders = {
    'Content-Type': string;
    Accept?: string;
    Authorization?: string;
};

type TRequestOption = {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    headers: TRequestHeaders;
    body?: string;
    mode?: string;
    cache?: string;
    credentials?: string;
    redirect?: string;
    referrerPolicy?: string;
};

// временно оставлю закомментированный код
// type TUser = {
//     // readonly id: number;
//     readonly password: string;
//     readonly email: string;
//     readonly name: string;
// };

// временно оставлю закомментированный код
// type TResponseBody = {
//     success: boolean;
//     user?: any;
//     message?: string;
//     headers?: Headers;
// };

// временно оставлю закомментированный код
// interface CustomResponse<T> extends Body {
//     readonly headers: Headers;
//     readonly ok: boolean;
//     readonly redirected: boolean;
//     readonly status: number;
//     readonly statusText: string;
//     readonly trailer: Promise<Headers>;
//     readonly type: ResponseType;
//     readonly url: string;
//     clone(): Response;
//     json(): Promise<T>;
// }

// функция проверки ответа на `ok`
const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  // выкидываем ошибку, чтобы она попала в `catch`
//   return Promise.reject(`Ошибка ${res.status}`);
  return res.json().then(err => Promise.reject(`Ошибка: ${err.status}`))
};

// функция проверки ответа на `success`
const checkSuccess = <T>(res: Response): Promise<T> => {
  if (res && res.success) {
    return res;
  }
  // выкидываем ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// универсальная фукнция запроса с проверкой ответа на `ok` и `success`
// В вызов приходят `endpoint`(часть урла, которая идет после базового) и options
export const request = <T>(endpoint: string, options: TRequestOption): Promise<T> => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then((res: Response) => checkResponse<T>(res))
        .then((res: Response) => checkSuccess<T>(res));
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
            Authorization: getCookie('accessToken')
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
            "token":  getCookie("refreshToken")
        }),
    });
};

export const fetchWithRefresh = async <T>(url: string, options: TRequestOption): Promise<T> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
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
