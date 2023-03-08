import { setCookie, getCookie } from "./cookies";
import { TData } from "../services/types/data";

export const BASE_URL: string = "https://norma.nomoreparties.space/api/";

type TServerResponse<T> = {
    success: boolean;
} & T;
  
type TUser = {
    // id?: number;
    password?: string;
    email?: string;
    name?: string;
};

type TCreateUserResponse = TServerResponse<TUser>;

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
export const request = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then((res) => checkResponse<TServerResponse<T>>(res))
        // .then((res) => checkSuccess(res));
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data)
        });
};

export const getIngredientsApi = () => {
    return request("ingredients");
};

export const getOrderNumberApi = (selectedIngredients: TData[]) => {
    return fetchWithRefresh(`${BASE_URL}orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({"ingredients": selectedIngredients})
    })
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

export const registerUserApi = (data: TUser) => {
    return request<TCreateUserResponse>("auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    });
};

export const loginUserApi = (data: TUser) => {
    return request<TCreateUserResponse>("auth/login", {
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

export const updateUserApi = (data: TUser) => {
    return request<TCreateUserResponse>("auth/user", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: getCookie('accessToken') || ""
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

type TRefreshResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
}>;

export const refreshToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            "token":  getCookie("refreshToken") || ""
        }),
        // body: JSON.stringify({
        //     token: localStorage.getItem("refreshToken"),
        // }),
    })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
        if (!refreshData.success) {
            return Promise.reject(refreshData);
        }
        setCookie("refreshToken", refreshData.refreshToken);
        // localStorage.setItem("refreshToken", refreshData.refreshToken);
        setCookie("accessToken", refreshData.accessToken);
        return refreshData;
    });
};

export const fetchWithRefresh = async <T>(
    url: RequestInfo,
    options: RequestInit
) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } catch (err) {
      if ((err as { message: string }).message === "jwt expired") {
        const refreshData = await refreshToken();
        if (options.headers) {
          (options.headers as { [key: string]: string }).Authorization =
            refreshData.accessToken;
        }
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
      } else {
        return Promise.reject(err);
      }
    }
};
