import { getCookie, setCookie, deleteCookie } from "../../utils/cookies";
import { TUser } from "../types/data";
import { TCreateUserResponse, TRegisterUserResponce } from "../../utils/api";
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
import { AppThunk, AppDispatch } from "../types";

export interface IAuthCheckAction {
    readonly type: typeof AUTH_CHECK;
}

export interface IRegisterUserRequestAction {
    readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS,
    user: TRegisterUserResponce
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
    readonly type: typeof LOGIN_USER_SUCCESS,
    user: TRegisterUserResponce
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
    readonly type: typeof UPDATE_USER_SUCCESS,
    user: TCreateUserResponse
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

export interface ILogoutUserAction {
    readonly type: typeof LOGOUT_USER;
}

// TUserActions
export type TUserActions =
    | IAuthCheckAction
    | ILogoutUserAction
    | IRegisterUserRequestAction
    | IRegisterUserSuccessAction
    | IRegisterUserFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | ILoginUserRequestAction
    | ILoginUserSuccessAction
    | ILoginUserFailedAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
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

export const registerUserSuccessAction = (user: TRegisterUserResponce): IRegisterUserSuccessAction => {
    return {
        type: REGISTER_USER_SUCCESS,
        user
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

export const loginUserSuccessAction = (user: TRegisterUserResponce): ILoginUserSuccessAction => {
    return {
        type: LOGIN_USER_SUCCESS,
        user
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

export const updateUserSuccessAction = (user: TCreateUserResponse): IUpdateUserSuccessAction => {
    return {
        type: UPDATE_USER_SUCCESS,
        user
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

// нужно типизировать dispatch (позже)
export const checkUserAuth: AppThunk = () => (dispatch) => {
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

export const getUser: AppThunk = (afterCallback) => (dispatch: AppDispatch) => {
    dispatch(getUserRequestAction());
    return getUserApi()
        .then((res: any) => {
            dispatch(getUserSuccessAction(res.user))
        })
        .catch(err => {
            dispatch(getUserFailedAction());
        })
        .finally(() => {
            afterCallback();
        });
};

export const logoutUser: AppThunk = () => (dispatch: AppDispatch) => {
    return logoutApi()
        .then(() => {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            dispatch(logoutUserAction());
        })
        .catch(() => {
            alert("Ошибка выхода пользователя");
        })
};

export const registerUser: AppThunk = (user: TUser) => (dispatch: AppDispatch) => {
    dispatch(registerUserRequestAction());
    return registerUserApi(user)
        .then((res: any) => {
                setCookie("accessToken", res.accessToken);
                setCookie("refreshToken", res.refreshToken);
                dispatch(registerUserSuccessAction(res.user))
        })
        .catch(() => {
            alert("Ошибка регистрации пользователя");
            dispatch(registerUserFailedAction());
        })
};

export const loginUser: AppThunk = (user: TUser) => (dispatch: AppDispatch) => {
    dispatch(loginUserRequestAction());
    return loginUserApi(user)
        .then((res: any) => {
            setCookie("accessToken", res.accessToken);
            setCookie("refreshToken", res.refreshToken);
            dispatch(loginUserSuccessAction(res.user))
        });
};

export const updateUser: AppThunk = (user: TUser) => (dispatch: AppDispatch) => {
    dispatch(updateUserRequestAction());
    return updateUserApi(user)
        .then((res: any) => {
                dispatch(updateUserSuccessAction(res.user))
        })
        .catch(() => {
            alert("Ошибка изменения пользователя");
            dispatch({ type: UPDATE_USER_FAILED });
        })
};

export const forgotUserPassword: AppThunk = (user: TUser) => (dispatch: AppDispatch) => {
    dispatch(forgotPasswordRequestAction());
    return forgotPasswordApi(user)
        .then(() => {
            dispatch(forgotPasswordSuccessAction())
        })
        .catch(() => {
            alert("Ошибка восстановления пароля");
            dispatch(forgotPasswordFailedAction());
        })
};
