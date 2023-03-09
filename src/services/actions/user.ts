import { getCookie, setCookie, deleteCookie } from "../../utils/cookies";
import { TUser } from "../types/data";
import { TCreateUserResponse } from "../../utils/api";
import {
    registerUserApi,
    forgotPasswordApi,
    logoutApi,
    getUserApi,
    loginUserApi,
    updateUserApi } from "../../utils/api";

import {
    AUTH_CHECK,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    LOGOUT_USER
} from "../constants/constants";

export interface IAuthCheckAction {
    readonly type: typeof AUTH_CHECK
}

export interface IRegisterUserRequestAction {
    readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS;
}

export interface IRegisterUserFailedAction {
    readonly type: typeof REGISTER_USER_FAILED;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS,
    user: TCreateUserResponse
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface ILoginUserRequestAction {
    readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccessAction {
    readonly type: typeof LOGIN_USER_SUCCESS;
}

export interface ILoginUserFailedAction {
    readonly type: typeof LOGIN_USER_FAILED;
}

export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

export interface ILogoutUserAction {
    readonly type: typeof LOGOUT_USER;
}

export type IRegisterUserActions =
    | IRegisterUserRequestAction
    | IRegisterUserSuccessAction
    | IRegisterUserFailedAction
;

export type IGetUserActions =
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
;

export type ILoginUserActions =
    | ILoginUserRequestAction
    | ILoginUserSuccessAction
    | ILoginUserFailedAction
;

export type IForgotPasswordActions =
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
;

export type IUpdateUserActions =
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction
;

export const authCheckAction = (): IAuthCheckAction => {
    return {
        type: AUTH_CHECK
    }
};

export const registerUserRequestAction = (): IRegisterUserRequestAction => {
    return {
        type: REGISTER_USER_REQUEST
    }
};

export const registerUserSuccessAction = (): IRegisterUserSuccessAction => {
    return {
        type: REGISTER_USER_SUCCESS
    }
};

export const registerUserFailedAction = (): IRegisterUserFailedAction => {
    return {
        type: REGISTER_USER_FAILED
    }
};

export const getUserRequestAction = (): IGetUserRequestAction => {
    return {
        type: GET_USER_REQUEST
    }
};

export const getUserSuccessAction = (user: TCreateUserResponse): IGetUserSuccessAction => {
    return {
        type: GET_USER_SUCCESS,
        user
    }
};

export const getUserFailedAction = (): IGetUserFailedAction => {
    return {
        type: GET_USER_FAILED
    }
};

export const loginUserRequestAction = (): ILoginUserRequestAction => {
    return {
        type: LOGIN_USER_REQUEST
    }
};

export const loginUserSuccessAction = (): ILoginUserSuccessAction => {
    return {
        type: LOGIN_USER_SUCCESS
    }
};

export const loginUserFailedAction = (): ILoginUserFailedAction => {
    return {
        type: LOGIN_USER_FAILED
    }
};

export const forgotPasswordRequestAction = (): IForgotPasswordRequestAction => {
    return {
        type: FORGOT_PASSWORD_REQUEST
    }
};

export const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => {
    return {
        type: FORGOT_PASSWORD_SUCCESS
    }
};

export const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => {
    return {
        type: FORGOT_PASSWORD_FAILED
    }
};

export const updateUserRequestAction = (): IUpdateUserRequestAction => {
    return {
        type: UPDATE_USER_REQUEST
    }
};

export const updateUserSuccessAction = (): IUpdateUserSuccessAction => {
    return {
        type: UPDATE_USER_SUCCESS
    }
};

export const updateUserFailedAction = (): IUpdateUserFailedAction => {
    return {
        type: UPDATE_USER_FAILED
    }
};

export const logoutUserAction = (): ILogoutUserAction => {
    return {
        type: LOGOUT_USER
    }
};

export const checkUserAuth = () => (dispatch: any) => {
    if (getCookie("accessToken")) {
        // если есть токен, то запрашиваем данные пользователя
        dispatch(
            getUser(() => {
                dispatch(authCheckAction());
            })
        );
    } else {
        dispatch(authCheckAction());
    }
};

export const getUser = (afterCallback: any) => (dispatch: any) => {
    dispatch(getUserRequestAction());
    return getUserApi()
        .then((res: any) => {
            dispatch(getUserSuccessAction(res.user))
            // dispatch({
            //     type: GET_USER_SUCCESS,
            //     payload: res.user
            // });
        })
        .catch(err => {
            dispatch(getUserFailedAction);
        })
        .finally(() => {
            afterCallback();
        });
};

export const logoutUser = () => (dispatch) => {
    return logoutApi()
        .then(() => {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            dispatch({ type: LOGOUT_USER });
        })
        .catch(() => {
            alert("Ошибка выхода пользователя");
        })
};

export const registerUser = ({email, name, password}) => (dispatch) => {
    dispatch(
        {type: REGISTER_USER_REQUEST }
    );
    return registerUserApi({ email, name, password })
        .then((res) => {
                setCookie("accessToken", res.accessToken);
                setCookie("refreshToken", res.refreshToken);
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: res
            });
        })
        .catch(() => {
            alert("Ошибка регистрации пользователя");
            dispatch({ type: REGISTER_USER_FAILED });
        })
};

export const loginUser = ({ email, password }) => (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    return loginUserApi({ email, password })
        .then((res) => {
            setCookie("accessToken", res.accessToken);
            setCookie("refreshToken", res.refreshToken);
            console.log("RES FROM LOGIN USER", res)
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: res.user
            });
        });
};

export const updateUser = ({email, name, password}) => (dispatch) => {
    dispatch(
        {type: UPDATE_USER_REQUEST }
    );
    return updateUserApi({ email, name, password })
        .then((res) => {
                console.log("RES FROM UPDATE", res)
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: res.user
            });
        })
        .catch(() => {
            alert("Ошибка изменения пользователя");
            dispatch({ type: UPDATE_USER_FAILED });
        })
};

export const forgotUserPassword = ({ email }) => (dispatch) => {
    dispatch(
        { type: FORGOT_PASSWORD_REQUEST }
    );
    return forgotPasswordApi({ email })
        .then(res => {
            dispatch(
                { type: FORGOT_PASSWORD_SUCCESS }
            )
            console.log("data from forgotPass", res)
        })
        .catch(() => {
            alert("Ошибка восстановления пароля");
            dispatch({ type: FORGOT_PASSWORD_FAILED });
        })
};
